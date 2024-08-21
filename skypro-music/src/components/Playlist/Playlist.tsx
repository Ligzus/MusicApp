import { TrackType } from "@/types/tracks";
import styles from "./Playlist.module.css";
import Track from "../Track/Track";
import { memo, useMemo } from "react";

type PlaylistProps = {
  tracks: TrackType[];
  error: string;
};

const Playlist = ({ tracks, error }: PlaylistProps) => {
  // Мемоизация списка треков
  const renderedTracks = useMemo(() => {
    return tracks.map((track) => (
      <Track key={track._id} track={track} trackData={tracks} />
    ));
  }, [tracks]);

  return (
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={styles.playlistTitleCol01}>Трек</div>
        <div className={styles.playlistTitleCol02}>Исполнитель</div>
        <div className={styles.playlistTitleCol03}>Альбом</div>
        <div className={styles.playlistTitleCol04}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {error ? <p>{error}</p> : renderedTracks}
      </div>
    </div>
  );
};

export default memo(Playlist);
