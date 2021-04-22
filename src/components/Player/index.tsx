import React from 'react'
import styles from './styles.module.scss'

export const Player = () => {
  return (
    <div className={styles.container}>
      <header>
        <img src="/icons/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>
      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>
        <div className={styles.buttons}>
          <button type="button">
            <img src="/icons/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="/icons/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/icons/play.svg" alt="Tocar" />
          </button>
          <button type="button">
            <img src="/icons/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button">
            <img src="/icons/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
