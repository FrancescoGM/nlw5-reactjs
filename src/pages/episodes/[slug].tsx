import React from 'react'
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage
} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO } from 'date-fns'

import { api } from '../../services/api'
import { format } from '../../utils/format'
import { Episode as EpisodeInterface } from '../../models/episodes'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import styles from './episode.module.scss'
import Link from 'next/link'

interface FormattedEpisode
  extends Omit<EpisodeInterface, 'published_at' | 'file'> {
  durationAsString: string
  publishedAt: string
  duration: number
  url: string
}

interface EpisodeProps {
  episode: FormattedEpisode
}

const Episode: NextPage<EpisodeProps> = ({ episode }) => {
  return (
    <>
      <Head>
        <title>Podcaster | {episode.title ?? 'Nome do episódio'}</title>
      </Head>
      <div className={styles.episode}>
        <div>
          <div className={styles.thumbnailContainer}>
            <Link href="/">
              <button type="button">
                <img src="/icons/arrow-left.svg" alt="Voltar" />
              </button>
            </Link>
            <Image
              width={700}
              height={160}
              src={episode.thumbnail}
              alt={episode.title}
              objectFit="cover"
            />
            <button type="button">
              <img src="/icons/play.svg" alt="Tocar episódio" />
            </button>
          </div>
          <header>
            <h1>{episode.title}</h1>
            <span>{episode.members}</span>
            <span>{episode.publishedAt}</span>
            <span>{episode.durationAsString}</span>
          </header>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<EpisodeInterface[]>('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(episode => ({
    params: {
      slug: episode.id
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<EpisodeProps> = async ({
  params
}: GetStaticPropsContext) => {
  const { slug } = params as { slug: string }
  const { data } = await api.get(`episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy'),
    description: data.description,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}

export default Episode
