import React from 'react'
import { format } from '../../utils/format'
import styles from './styles.module.scss'

export const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMM')

  return (
    <header className={styles.container}>
      <img src="/icons/logo.svg" alt="Podcastr" />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  )
}
