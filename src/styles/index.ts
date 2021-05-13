import styled from "styled-components"

interface Props {
    justifyContent?: string
    alignItems?: string
    flexWrap?: boolean
    background?: boolean
}

export const Container = styled.div`
    display:flex;
    main{
        flex:1;
    }

`

export const Separator = styled.div`
    height: 1px;
    width: 100%;
    background-color: #d3e2e6;
    margin: 10px 0px;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(props: Props) => props.justifyContent || "flex-start"};
    align-items: ${({ alignItems }: Props) => alignItems || "center"};
    flex-wrap: ${({ flexWrap }: Props) => (flexWrap ? "wrap" : "nowrap")};
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${(props: Props) => props.justifyContent || "center"};
    align-items: ${({ alignItems }: Props) => alignItems || "stretch"};
`

export const Padding = styled.div`
    padding: 40px;
    margin: 20px 0px;
    background: ${({ background }: Props) => (background ? "#F8F8F8" : "#fff")};
`
