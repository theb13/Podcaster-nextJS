import { createContext, useContext, useState } from "react"

import { Episode } from "../helpers/types"

type PlayerContextData = {
    episodeList: Episode[]
    currentEpisodeIndex: number
    isPlaying: boolean
    isLooping: boolean
    isShuffling: boolean
    hasNext: boolean
    hasPrevious: boolean
    clearPlayerState: () => void
    play: (Episode) => void
    playList: (list: Episode[], index: number) => void
    playNext: () => void
    playPrevious: () => void
    togglePlayer: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerContextProvider = ({ children }) => {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

    function play(episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlayer() {
        setIsPlaying(!isPlaying)
    }
    function toggleLoop() {
        setIsLooping(!isLooping)
    }
    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length
    const hasPrevious = currentEpisodeIndex > 0

    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(
                Math.random() * episodeList.length
            )
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }
    function playPrevious() {
        if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                clearPlayerState,
                hasNext,
                hasPrevious,
                play,
                playList,
                playNext,
                playPrevious,
                isPlaying,
                isLooping,
                isShuffling,
                togglePlayer,
                toggleLoop,
                toggleShuffle,
                setPlayingState,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}
