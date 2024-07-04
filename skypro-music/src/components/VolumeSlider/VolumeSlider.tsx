import styles from "./VolumeSlider.module.css";

const VolumeSlider = () => {
  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={styles.volumeProgress}>
          <input
            className={styles.volumeProgressLine}
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
