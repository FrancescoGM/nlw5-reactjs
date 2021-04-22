import React, { createContext, useContext, useState } from 'react'

type Episode = {
  url: string
  title: string
  members: string
  thumbnail: string
  duration: number
}

type PlayerContextData = {
  isPlaying: boolean
  episodeList: Episode[]
  currentEpisodeIndex: number
  play: (episode: Episode) => void
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
}

const PlayerContext = createContext({} as PlayerContextData)

export const PlayerProvider: React.FC = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [episodeList, setEpisodeList] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }
  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        episodeList,
        currentEpisodeIndex,
        play,
        togglePlay,
        setPlayingState
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
