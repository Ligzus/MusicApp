import { Track_Type } from "@/types/tracks";
import styles from "./Playlist.module.css";
import Track from "../Track/Track";

type PlaylistProps = {
  tracks: Track_Type[];
};

const Playlist = ({ tracks }: PlaylistProps) => {
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
        {tracks.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
