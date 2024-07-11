"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import VolumeSlider from "../VolumeSlider/VolumeSlider";
import styles from "./Player.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";

const Player = () => {
  const { currentTrack, playlist, setCurrentTrack } = useCurrentTrack();
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (playlist.length > 0 && currentTrack) {
      const index = playlist.findIndex((track) => track.id === currentTrack.id);
      setCurrentTrackIndex(index);
    }
  }, [currentTrack, playlist]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTrack) {
      audio.src = currentTrack.track_file;
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentTrack]);

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

  const handleEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  if (!currentTrack) {
    return null;
  }

  const { name, author, track_file } = currentTrack;
  const duration = audioRef.current?.duration || 0;

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          src={track_file}
          className={styles.audio}
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
              <div
                className={styles.playerBtnPrev}
                onClick={() => {
                  if (currentTrackIndex > 0) {
                    setCurrentTrack(playlist[currentTrackIndex - 1]);
                  } else {
                    setCurrentTrack(playlist[playlist.length - 1]);
                  }
                }}
              >
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
              <div
                className={styles.playerBtnNext}
                onClick={() => {
                  if (currentTrackIndex < playlist.length - 1) {
                    setCurrentTrack(playlist[currentTrackIndex + 1]);
                  } else {
                    setCurrentTrack(playlist[0]);
                  }
                }}
              >
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
                  <a className={styles.trackPlayAuthorLink} href="#">
                    {name}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="#">
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
