import { getCatalogTrackItem, getCatalogTracks } from "@/api/tracks";
import TrackSearch from "@/components/TrackSearch/TrackSearch";
import styles from "../page.module.css";
import { TrackType } from "@/types/tracks";

type CategoryType = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryType) {
  let tracks: TrackType[] = [];
  let error: string = "";
  let id: string = params.id;
  let pageName: string = "";

  try {
    const tracksData = await getCatalogTracks(id);
    const tracksId = tracksData.data.items;
    pageName = tracksData.data.name;

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
    <div>
      <h2 className={styles.centerblockH2}>{pageName}</h2>
      <TrackSearch tracks={tracks} error={error} />
    </div>
  );
}
