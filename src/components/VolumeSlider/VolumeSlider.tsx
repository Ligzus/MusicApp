import { useEffect, useState } from "react";
import styles from "./VolumeSlider.module.css";

type VolumeSliderProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

const VolumeSlider: React.FC<VolumeSliderProps> = ({ audioRef }) => {
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

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
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeSlider;
