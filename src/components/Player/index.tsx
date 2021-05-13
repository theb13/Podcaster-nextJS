import { Row } from "../../styles"
import { Container } from "./styles"

function Player() {
    return (
        <Container alignItems="center" justifyContent="space-between">
            <header>
                <img src="/playing.svg" alt="tocando" />
                <strong>Tocando agora</strong>
            </header>
            <Row className="emptyPlayer" justifyContent="center">
                <strong>Selecione um podcast para ouvir</strong>
            </Row>
            <footer className="empty">
                <Row className="progress" alignItems="center">
                    <span>00:00</span>
                    <div className="slider">
                        <div className="emptySlider" />
                    </div>
                    <span>00:00</span>
                </Row>
                <Row
                    className="buttons"
                    alignItems="center"
                    justifyContent="center"
                >
                    <button type="button">
                        <img src="/shuffle.svg" alt="" />
                    </button>
                    <button type="button">
                        <img src="/play-previous.svg" alt="" />
                    </button>
                    <button type="button" className="playButton">
                        <img src="/play.svg" alt="" />
                    </button>
                    <button type="button">
                        <img src="/play-next.svg" alt="" />
                    </button>
                    <button type="button">
                        <img src="/repeat.svg" alt="" />
                    </button>
                </Row>
            </footer>
        </Container>
    )
}

export default Player
