import styled from "styled-components"
import { Column } from "../../styles/index"

export const Container = styled(Column)`
    max-width: 45rem;
    padding: 3rem 2rem;
    margin: 0 auto;
    .thumbnailContainer {
        position: relative;

        .img {
            border-radius: 1rem;
        }

        button {
            width: 3rem;
            height: 3rem;
            border-radius: 0.75rem;
            border: 0;
            position: absolute;
            z-index: 5;
            font-size: 0;

            transition: filter 0.2s;

            &:first-child {
                left: 0;
                top: 50%;
                background: ${({ theme }) => theme.colors.purple500};
                transform: translate(-50%, -50%);
            }
            &:last-child {
                right: 0;
                top: 50%;
                background: ${({ theme }) => theme.colors.green500};
                transform: translate(50%, -50%);
            }
        }
    }

    header {
        padding-bottom: 1rem;
        border: 1.5px solid ${({ theme }) => theme.colors.gray100};

        h1 {
            margin-top: 2rem;
            margin-bottom: 1.5rem;
        }

        span {
            display: inline-block;
            font-size: 0.875rem;

             + span {
                margin-left: 0.5rem;
                padding-left: 0.5rem;
                position: relative;

                ::before {
                    content: "";
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 4px;
                    background-color: #ddd;
                    left: 0;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }


    }

    .description{
        margin-top:2rem;
        line-height:1.675rem;
        color: ${({ theme }) => theme.colors.gray800};
        p{
            margin: 1.5rem 0;
        }
    }
`
