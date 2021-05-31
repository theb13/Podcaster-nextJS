import styled from "styled-components"
import { Column } from "../../styles/index"
export const Container = styled(Column)`
    width: 26.5rem;
    height: 100vh;

    background: ${({ theme }) => theme.colors.purple500};
    color: ${({ theme }) => theme.colors.white};

    padding: 3rem 4rem;

    header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    strong {
        font-family: Lexend, sans-serif;
        font-weight: 600;
    }

    .emptyPlayer {
        width: 100%;
        height: 20rem;
        border: 1.5px dashed ${({ theme }) => theme.colors.purple300};
        border-radius: 1.5rem;
        background: linear-gradient(
            143.9deg,
            rgba(145, 100, 250, 0.8) 0%,
            rgba(0, 0, 0, 0) 100%
        );

        padding: 4rem;
        text-align: center;
    }

    .currentEpisode {
        text-align: center;
        img {
            border-radius: 1.5rem;
        }
        strong {
            display: block;
            margin-top: 2rem;
            font: 600 1.25rem Lexend, sans-serif;
            line-height: 1.75rem;
        }
        span {
            display: block;
            margin-top: 1rem;
            opacity: 0.6;
            line-height: 1.5rem;
        }
    }

    footer {
        align-self: stretch;
        &.empty {
            opacity: 0.5;
        }
    }

    .progress {
        gap: 0.5rem;
        font-size: 0.875rem;

        span {
            display: inline-block;
            width: 4rem;
            text-align: center;
        }

        .slider {
            flex: 1;
            .emptySlider {
                width: 100%;
                height: 4px;
                background: ${({ theme }) => theme.colors.purple300};
                border-radius: 2px;
            }
        }
    }

    .buttons {
        margin-top: 2.5rem;
        gap: 1.5rem;

        button {
            background: transparent;
            border: 0;
            font-size: 0;

            transition: filter 0.2s;
            &:disabled {
                cursor: default;
                opacity: 0.5;
            }
            :hover:not(:disabled) {
                filter: brightness(0.7);
            }
            &.playButton {
                width: 4rem;
                height: 4rem;

                border-radius: 1rem;
                background: ${({ theme }) => theme.colors.purple400};

                :hover:not(:disabled) {
                    filter: brightness(0.95);
                }
            }
            &.isActive {
                filter: invert(0.35) sepia(1) sepia(3) hue-rotate(100deg);
                &:hover{
                    filter:brightness(0.6) invert(0.35) sepia(1) sepia(3) hue-rotate(100deg);
                }
            }
        }
    }
`
