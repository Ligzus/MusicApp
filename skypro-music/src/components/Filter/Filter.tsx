import { Track_Type } from "@/types/tracks";
import styles from "./Filter.module.css";

type FilterProps = {
  tracks: Track_Type[];
};

const Filter = ({ tracks }: FilterProps) => {
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={`${styles.filterButton} ${styles.btnText}`}>
        исполнителю
      </div>
      <div className={`${styles.filterButton} ${styles.btnText}`}>
        году выпуска
      </div>
      <div className={`${styles.filterButton} ${styles.btnText}`}>жанру</div>
    </div>
  );
};

export default Filter;
