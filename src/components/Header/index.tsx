import React from 'react'
import styles from './styles.module.scss'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', { locale: ptBR })

  return (
    <header className={styles.container}>
      <img src="/icons/logo.svg" alt="Podcaster" />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  )
}
