"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import VolumeSlider from "../VolumeSlider/VolumeSlider";
import styles from "./Player.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";

const Player = () => {
  const { currentTrack, playlist, currentTrackIndex, setCurrentTrackIndex } =
    useCurrentTrack();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!currentTrack) {
    return null;
  }

  const { name, author, track_file } = currentTrack;
  const duration = audioRef.current?.duration || 0;

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  // const handleEnded = () => {
  //   // Проверяем, не является ли текущий трек последним в плейлисте
  //   if (currentTrackIndex < playlist.length - 1) {
  //     // Переход к следующему треку
  //     setCurrentTrackIndex(currentTrackIndex + 1);
  //   } else {
  //     // Или начинаем плейлист с начала
  //     setCurrentTrackIndex(0);
  //   }
  // };

  // // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (audio) {
  //     audio.src = playlist[currentTrackIndex].track_file; // Предполагается, что плейлист содержит объекты с полем track_file
  //     audio.addEventListener('ended', handleEnded);

  //     // Воспроизводим новый трек
  //     audio.play();

  //     return () => {
  //       audio.removeEventListener('ended', handleEnded);
  //     };
  //   }
  // }, [currentTrackIndex, playlist]);

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          src={track_file}
          className={styles.audio}
          controls
          ref={audioRef}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
        ></audio>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div onClick={handlePlay} className={styles.playerBtnPlay}>
                <svg className={styles.playerBtnPlaySvg}>
                  {isPlaying ? (
                    <use xlinkHref="img/icon/sprite.svg#icon-pause" />
                  ) : (
                    <use xlinkHref="img/icon/sprite.svg#icon-play" />
                  )}
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
          <VolumeSlider audioRef={audioRef} />
        </div>
      </div>
    </div>
  );
};

export default Player;
