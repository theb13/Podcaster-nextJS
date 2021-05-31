import { GetStaticPaths, GetStaticProps } from "next"
import { convertDurationToTimeString } from "../../helpers/convertDurationToTimeString"
import { Episode } from "../../helpers/types"
import { getPodcast, getSinglePodcast } from "../../services/api"
import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"
import Container from "./styles"
import Image from "next/image"
import Link from "next/link"
import { usePlayer } from "../../context/PlayerContext"
import Head from "next/Head"

interface Props {
    episode: Episode
}

export default function Home({ episode }: Props) {
    const { play } = usePlayer()

    return (
        <Container>
            <Head>
                <title>{episode.title} | podcaster</title>
            </Head>
            <div className="thumbnailContainer">
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button" onClick={() => play(episode)}>
                    <img src="/play.svg" alt="Tocar episodio" />
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{convertDurationToTimeString(episode.duration)}</span>
            </header>
            <div
                className="description"
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />
        </Container>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = (await getPodcast(2)) as any
    const paths = response.map((episode) => {
        return {
            params: {
                slug: episode.id,
            },
        }
    })

    return {
        paths,
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params
    const data = (await getSinglePodcast(slug)) as any

    const episode = {
        id: data.id,
        title: data.title,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), "d MMM yy", {
            locale: pt,
        }),
        duration: Number(data.file.duration),
        description: data.description,
        url: data.file.url,
        thumbnail: data.thumbnail,
    }
    return {
        props: { episode },
        revalidate: 60 * 60 * 24, //24h
    }
}
