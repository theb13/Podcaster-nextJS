import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "../styles/GlobalStyle"
import ligth from "../styles/themes/ligth"

import Header from "../components/Header"
import Player from "../components/Player"
import { Container } from "../styles"
import {  PlayerContextProvider } from "../context/PlayerContext"

function MyApp({ Component, pageProps }) {
    return (
        <Container>
            <ThemeProvider theme={ligth}>
                <GlobalStyle />
                <PlayerContextProvider>
                    <main>
                        <Header />
                        <Component {...pageProps} />
                    </main>
                    <Player />
                </PlayerContextProvider>
            </ThemeProvider>
        </Container>
    )
}

export default MyApp
