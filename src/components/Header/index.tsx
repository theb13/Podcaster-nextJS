import { Container } from "./styles"
import format from "date-fns/format"
import pt from "date-fns/locale/pt"

function Header() {
    const currentDate = format(new Date(), "EEEEEE, d MMMM", { locale: pt })
    return (
        <Container>
            <img src="/logo.svg" alt="podcastr" />
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
        </Container>
    )
}

export default Header
