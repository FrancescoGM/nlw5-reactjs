import React from 'react'
import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import { api } from '../services/api'
import { Episode } from '../models/episodes'

interface HomeProps {
  episodes: Episode[]
}

const Home: NextPage<HomeProps> = ({ episodes }) => {
  console.log(episodes)
  return (
    <>
      <Head>
        <title>Podcaster</title>
      </Head>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await api.get<Episode[]>('episodes')
  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}

export default Home
