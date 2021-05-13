import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { convertDurationToTimeString } from "../../helpers/convertDurationToTimeString"
import { Episode } from "../../helpers/types"
import { getSinglePodcast } from "../../services/api"
import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"
import { Container } from "./styles"
import Image from "next/image"
import Link from "next/link"

interface Props {
    episode: Episode
}

export default function Home({ episode }: Props) {
    return (
        <Container>
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
                <button type="button">
                    <img src="/play.svg" alt="Tocar episodio" />
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.duration}</span>
            </header>
            <div
                className="description"
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />
        </Container>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params
    const data = (await getSinglePodcast(slug)) as any

    console.log(data)
    const episode = {
        id: data.id,
        title: data.title,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), "d MMM yy", {
            locale: pt,
        }),
        duration: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
        thumbnail: data.thumbnail,
    }
    return {
        props: { episode },
        revalidate: 60 * 60 * 24, //24h
    }
}
