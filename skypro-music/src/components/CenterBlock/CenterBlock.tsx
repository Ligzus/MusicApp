import Filter from "../Filter/Filter";
import Playlist from "../Playlist/Playlist";
import Search from "../Search/Search";
import styles from "../CenterBlock/CenterBlock.module.css";
import { getTracks } from "@/api/tracks";
import { TrackType } from "@/types/tracks";

const CenterBlock = async () => {
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
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks} />
      <Playlist tracks={tracks} error={error} />
    </div>
  );
};

export default CenterBlock;
