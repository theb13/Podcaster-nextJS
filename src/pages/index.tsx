import { GetStaticProps } from "next"
import Image from "next/image"
import { getPodcast } from "../services/api"
import { Episode } from "../helpers/types"
import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"
import { convertDurationToTimeString } from "../helpers/convertDurationToTimeString"
import Link from "next/link"
import { Container } from "../styles/home"

interface Props {
    latestEpisodes: Episode[]
    allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: Props) {
    function renderLatestEpisodes() {
        return latestEpisodes.map((episode) => {
            return (
                <li key={episode.id}>
                    <Image
                        width={192}
                        height={192}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                    />
                    <div className="episodeDetails">
                        <Link href={`/episode/${episode.id}`}>
                            <a>{episode.title}</a>
                        </Link>
                        <p>{episode.members}</p>
                        <span>{episode.publishedAt}</span>
                        <span>{episode.duration}</span>
                    </div>
                    <button type="button">
                        <img src="/play-green.svg" alt="Tocar episodio" />
                    </button>
                </li>
            )
        })
    }

    function renderAllEpisodes() {
        return allEpisodes.map((episode) => {
            return (
                <tr key={episode.id}>
                    <td style={{ width: 72 }}>
                        <Image
                            width={192}
                            height={192}
                            src={episode.thumbnail}
                            alt={episode.title}
                            objectFit="cover"
                        />
                    </td>
                    <td>
                        <Link href={`/episode/${episode.id}`}>
                            <a>{episode.title}</a>
                        </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100 }}>{episode.publishedAt}</td>
                    <td>{episode.duration}</td>
                    <td>
                        <button type="button">
                            <img src="/play-green.svg" alt="Tocar episodio" />
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Container>
            <section className="latestEpisodes">
                <h2>Últimos lançamentos</h2>
                <ul>{renderLatestEpisodes()}</ul>
            </section>
            <section className="allEpisodes">
                <h2>Todos episódios</h2>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Podcast</th>
                            <th>Integrantes</th>
                            <th>Data</th>
                            <th>Duração</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{renderAllEpisodes()}</tbody>
                </table>
            </section>
        </Container>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = (await getPodcast()) as any

    const episodes = response.map((episode) => {
        return {
            id: episode.id,
            title: episode.title,
            members: episode.members,
            publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
                locale: pt,
            }),
            duration: convertDurationToTimeString(
                Number(episode.file.duration)
            ),
            description: episode.description,
            url: episode.file.url,
            thumbnail: episode.thumbnail,
        }
    })

    const latestEpisodes = episodes.slice(0, 2)
    const allEpisodes = episodes.slice(0, episodes.length)
    return {
        props: {
            latestEpisodes,
            allEpisodes,
        },
        revalidate: 60 * 60,
    }
}
