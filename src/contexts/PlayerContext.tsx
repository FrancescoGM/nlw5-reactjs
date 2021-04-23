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
  isLooping: boolean
  isShuffling: boolean
  episodeList: Episode[]
  currentEpisodeIndex: number
  hasNext: boolean
  hasPrevious: boolean
  play: (episode: Episode) => void
  playList: (episodes: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleShuffle: () => void
  clearPlayerState: () => void
  setPlayingState: (state: boolean) => void
}

const PlayerContext = createContext({} as PlayerContextData)

export const PlayerProvider: React.FC = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [episodeList, setEpisodeList] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(episodes: Episode[], index: number) {
    setEpisodeList(episodes)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      )
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }
  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }
  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        isLooping,
        isShuffling,
        episodeList,
        currentEpisodeIndex,
        hasNext,
        hasPrevious,
        play,
        playList,
        playNext,
        playPrevious,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        clearPlayerState
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
