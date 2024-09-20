import { getTracks } from "@/api/tracks";
import TrackSearch from "@/components/TrackSearch/TrackSearch";
import styles from "./page.module.css";
import { TrackType } from "@/types/tracks";

const MainTrackPage = async () => {
  let tracks: TrackType[] = [];
  let error: string = "";

  try {
    const tracksData = await getTracks();
    tracks = tracksData.data;
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке треков: " + err.message
        : "Неизвестная ошибка";
  }

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblocLine} />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <TrackSearch tracks={tracks} error={error} />
    </div>
  );
};

export default MainTrackPage;
