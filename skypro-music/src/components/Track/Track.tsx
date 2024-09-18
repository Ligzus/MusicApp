"use client";

import { TrackType } from "@/types/tracks";
import styles from "./Track.module.css";
import { formatDuration } from "@/utils/timeFormat";
import useLikeTrack, { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { memo } from "react";

type TrackProps = {
  track: TrackType;
};

const Track = ({ track }: TrackProps) => {
  const dispatch = useAppDispatch();

  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);

  const isPlayingTrack = currentTrack ? currentTrack._id === track._id : false;

  const handleTrackClick = () => {
    dispatch(setCurrentTrack(track));
  };

  const { handleLikeTrack, isLiked } = useLikeTrack(track);

  const { name, author, album, duration_in_seconds } = track;

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {isPlayingTrack ? (
              <svg
                className={
                  isPlaying
                    ? styles.trackisPlayingAnimation
                    : styles.trackIsPlayingSvg
                }
              >
                <use xlinkHref="img/icon/sprite.svg#icon-isplaying" />
              </svg>
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>
          <div className={styles.trackTitleText}>
            <div>
              <span className={styles.trackTitleLink}>
                {name} <span className={styles.trackTitleSpan} />
              </span>
            </div>
          </div>          
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg} onClick={handleLikeTrack}>
            <use
              xlinkHref={
                isLiked
                  ? "img/icon/sprite.svg#icon-liked"
                  : "img/icon/sprite.svg#icon-like"
              }
            />
          </svg>
          <span className={styles.trackTimeText}>
            {formatDuration(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Track);
