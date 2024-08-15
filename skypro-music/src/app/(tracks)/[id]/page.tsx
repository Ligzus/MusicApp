import { getCatalogTrackItem, getCatalogTracks } from "@/api/tracks";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";
import { TrackType } from "@/types/tracks";
import styles from "../page.module.css";

type CategoryType = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryType) {
  let tracks: TrackType[] = [];
  let error: string = "";
  let id: string = params.id;
  let pageName: string = "";

  try {
    // Получаем данные каталога треков
    const tracksData = await getCatalogTracks(id);
    const tracksId = tracksData.data.items; // Получаем массив индексов треков
    pageName = tracksData.data.name;

    // Проходим по каждому id трека и получаем данные по треку
    for (const trackId of tracksId) {
      const trackItemData = await getCatalogTrackItem(trackId.toString());
      if (trackItemData.success) {
        tracks.push(trackItemData.data);
      }
    }
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке треков: " + err.message
        : "Неизвестная ошибка";
  }

  return (
    <>
      <h2 className={styles.centerblockH2}>{pageName}</h2>
      <Filter tracks={tracks} />
      <Playlist tracks={tracks} error={error} />
    </>
  );
}
