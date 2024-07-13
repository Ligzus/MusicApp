"use client";

import { TrackType } from "@/types/tracks";
import styles from "./Playlist.module.css";
import Track from "../Track/Track";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import { useEffect } from "react";

type PlaylistProps = {
  tracks: TrackType[];
  error: string;
};

const Playlist = ({ tracks, error }: PlaylistProps) => {
  const { setPlaylist } = useCurrentTrack();

  useEffect(() => {
    if (tracks) {
      setPlaylist(tracks); // Устанавливаем плейлист в контексте после рендера
    }
  }, [tracks, setPlaylist]);

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
        {error ? (
          <p>{error}</p>
        ) : (
          tracks.map((track) => <Track key={track.id} track={track} />)
        )}
      </div>
    </div>
  );
};

export default Playlist;
