import { getTracks } from '@/api/tracks';
import Filter from '@/components/Filter/Filter';
import Playlist from '@/components/Playlist/Playlist';
import { TrackType } from '@/types/tracks';
import styles from './page.module.css';

const MainTrackPage = async () => {
  let tracks: TrackType[] = [];
  let error: string = "";

  try {
    const tracksData = await getTracks();
    tracks = tracksData.data;
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке траков: " + err.message
        : "Неизвестная ошибка";
  }

  return (
    <>
        <h2 className={styles.centerblockH2}>Треки</h2>
        <Filter tracks={tracks} />
        <Playlist tracks={tracks} error={error} />
    </>
  );
};

export default MainTrackPage;
