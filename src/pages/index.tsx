import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps, NextPage } from 'next'
import { api } from '../services/api'
import { Episode } from '../models/episodes'
import { format } from '../utils/format'
import { parseISO } from 'date-fns'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import styles from './home.module.scss'
interface FormattedEpisode
  extends Omit<Episode, 'published_at' | 'file' | 'description'> {
  durationAsString: string
  publishedAt: string
  duration: number
  url: string
}
interface HomeProps {
  allEpisodes: FormattedEpisode[]
  latestEpisodes: FormattedEpisode[]
}

const Home: NextPage<HomeProps> = ({ allEpisodes, latestEpisodes }) => {
  return (
    <>
      <Head>
        <title>Podcaster</title>
      </Head>
      <div className={styles.homepage}>
        <section className={styles.latestEpisodes}>
          <h2>Últimos lançamentos</h2>
          <ul>
            {latestEpisodes.map(episode => (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
                <div className={styles.episodeDetails}>
                  <a href={episode.url}>{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button type="button">
                  <img src="/icons/play-green.svg" alt="Tocar Episódio" />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.allEpisodes}>
          <h2>Todos os episódios</h2>
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
            <tbody>
              {allEpisodes.map(episode => (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/icons/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await api.get<Episode[]>('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes: FormattedEpisode[] = data.map(episode => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy'),
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTimeString(
      Number(episode.file.duration)
    ),
    url: episode.file.url
  }))
  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)
  return {
    props: {
      allEpisodes,
      latestEpisodes
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}

export default Home
