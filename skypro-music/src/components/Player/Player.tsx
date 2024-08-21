"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import VolumeSlider from "../VolumeSlider/VolumeSlider";
import styles from "./Player.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import useLikeTrack from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setIsPlaying,
  setIsShuffle,
  setNextTrack,
  setPrevTrack,
} from "@/store/features/playlistSlice";

const Player = () => {
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const duration = audioRef.current?.duration || 0;

  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const shuffled = useAppSelector((state) => state.playlist.isShuffled);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);

  const { handleLikeTrack, isLiked } = useLikeTrack(currentTrack);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && currentTrack) {
      audio.src = currentTrack.track_file;

      audio.loop = isLoop;

      audio.play();
      dispatch(setIsPlaying(true));
    }
  }, [currentTrack, isLoop, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = isLoop;
    }
  }, [isLoop]);

  // Мемоизация функций управления плеером
  const handlePlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    if (isPlaying) {
      dispatch(setIsPlaying(false));
    } else {
      dispatch(setIsPlaying(true));
    }
  }, [isPlaying, dispatch]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  }, []);

  const handleNextTrack = useCallback(() => {
    dispatch(setNextTrack());
  }, [dispatch]);

  const handlePrevTrack = useCallback(() => {
    dispatch(setPrevTrack());
  }, [dispatch]);

  const handleLoop = useCallback(() => {
    setIsLoop((prev) => !prev);
  }, []);

  const handleShuffle = useCallback(() => {
    dispatch(setIsShuffle(!shuffled));
  }, [shuffled, dispatch]);

  if (!currentTrack) {
    return null;
  }

  const { name, author, track_file } = currentTrack;

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
          onEnded={handleNextTrack}
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
              <div className={styles.playerBtnPrev} onClick={handlePrevTrack}>
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
              <div className={styles.playerBtnNext} onClick={handleNextTrack}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div
                onClick={handleLoop}
                className={`${styles.playerBtnRepeat} ${styles.btnIcon}`}
              >
                <svg
                  className={
                    isLoop
                      ? styles.playerBtnRepeatSvgActive
                      : styles.playerBtnRepeatSvg
                  }
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div onClick={handleShuffle} className={`${styles.playerBtnShuffle} ${styles.btnIcon}`}>
                <svg
                  className={
                    shuffled
                      ? styles.playerBtnRepeatSvgActive
                      : styles.playerBtnShuffleSvg
                  }
                >
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
                  <svg onClick={handleLikeTrack} className={styles.trackPlayLikeSvg}>
                    <use
                      xlinkHref={
                        isLiked
                          ? "img/icon/sprite.svg#icon-liked"
                          : "img/icon/sprite.svg#icon-like"
                      }
                    />
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

export default memo(Player);
