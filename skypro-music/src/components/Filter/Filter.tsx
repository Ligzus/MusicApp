import styles from "./Filter.module.css";

const Filter = () => {
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
