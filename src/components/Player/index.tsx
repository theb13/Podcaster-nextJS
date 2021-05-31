import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"
import { PlayerContext } from "../../context/PlayerContext"
import { Row } from "../../styles"
import { Container } from "./styles"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { convertDurationToTimeString } from "../../helpers/convertDurationToTimeString"

function Player() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0)

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        clearPlayerState,
        togglePlayer,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,

    } = useContext(PlayerContext)
    const episode = episodeList[currentEpisodeIndex]

    function setUpProgressListener() {
        audioRef.current.currentTime = 0
        audioRef.current.addEventListener("timeupdate", () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount
        setProgress(amount)
    }

    function handleEpisodeEnded(){
        if(hasNext){
            playNext()
        }else{
            clearPlayerState()
        }
    }

    useEffect(() => {
        if (!audioRef.current) {
            return
        }
        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    return (
        <Container alignItems="center" justifyContent="space-between">
            <header>
                <img src="/playing.svg" alt="tocando" />
                <strong>Tocando agora</strong>
            </header>

            {episode ? (
                <div className="currentEpisode">
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <Row className="emptyPlayer" justifyContent="center">
                    <strong>Selecione um podcast para ouvir</strong>
                </Row>
            )}

            <footer className={!episode ? "empty" : ""}>
                <Row className="progress" alignItems="center">
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className="slider">
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: "#04d361" }}
                                railStyle={{ backgroundColor: "#9f75ff" }}
                                handleStyle={{
                                    borderColor: "#04d361",
                                    borderWidth: 4,
                                }}
                            />
                        ) : (
                            <div className="emptySlider" />
                        )}
                    </div>
                    <span>
                        {convertDurationToTimeString(episode?.duration ?? 0)}
                    </span>
                </Row>

                {episode && (
                    <audio
                        src={episode.url}
                        autoPlay
                        ref={audioRef}
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onEnded={handleEpisodeEnded}
                        onLoadedMetadata={setUpProgressListener}
                    />
                )}

                <Row
                    className="buttons"
                    alignItems="center"
                    justifyContent="center"
                >
                    <button
                        type="button"
                        disabled={!episode || episodeList.length === 1}
                        onClick={toggleShuffle}
                        className={isShuffling ? "isActive" : ""}
                    >
                        <img src="/shuffle.svg" alt="" />
                    </button>
                    <button
                        type="button"
                        disabled={!episode || !hasPrevious}
                        onClick={playPrevious}
                    >
                        <img src="/play-previous.svg" alt="" />
                    </button>
                    <button
                        type="button"
                        disabled={!episode}
                        className="playButton"
                        onClick={togglePlayer}
                    >
                        {isPlaying ? (
                            <img src="/pause.svg" alt="" />
                        ) : (
                            <img src="/play.svg" alt="" />
                        )}
                    </button>
                    <button
                        type="button"
                        disabled={!episode || !hasNext}
                        onClick={playNext}
                    >
                        <img src="/play-next.svg" alt="" />
                    </button>
                    <button
                        type="button"
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? "isActive" : ""}
                    >
                        <img src="/repeat.svg" alt="" />
                    </button>
                </Row>
            </footer>
        </Container>
    )
}

export default Player
