"use client";

import { TrackType } from "@/types/tracks";
import styles from "./Track.module.css";
// import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import { formatDuration } from "@/utils/timeFormat";
import { useAppDispatch } from "@/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";

type TrackProps = {
  track: TrackType;
  playlist: TrackType[];
};

const Track = ({ track, playlist }: TrackProps) => {
  // const { setCurrentTrack } = useCurrentTrack();

  const dispatch = useAppDispatch();

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, playlist }));
    console.log(track);
  };

  const { name, author, album, duration_in_seconds } = track;

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>
            {formatDuration(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;
