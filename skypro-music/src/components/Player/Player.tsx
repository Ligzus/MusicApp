"use client";

import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import VolumeSlider from "../VolumeSlider/VolumeSlider";
import styles from "./Player.module.css";

const Player = () => {
  const { currentTrack } = useCurrentTrack();

  if (!currentTrack) {
    return null;
  }

  const { name, author } = currentTrack;

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress} />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div className={styles.playerBtnPlay}>
                <svg className={styles.playerBtnPlaySvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-play" />
                </svg>
              </div>
              <div className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div className={`${styles.playerBtnRepeat} ${styles.btnIcon}`}>
                <svg className={styles.playerBtnRepeatSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div className={`${styles.playerBtnShuffle} ${styles.btnIcon}`}>
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>
            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    {name}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    {author}
                  </a>
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <div className={`${styles.trackPlayLike} ${styles.btnIcon}`}>
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-like" />
                  </svg>
                </div>
                <div className={`${styles.trackPlayDislike} ${styles.btnIcon}`}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <VolumeSlider />
        </div>
      </div>
    </div>
  );
};

export default Player;
