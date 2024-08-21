import { memo } from "react";
import styles from "./ProgressBar.module.css";
import { formatDuration } from "@/utils/timeFormat";

type ProgressBarProps = {
  max: number;
  value: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ProgressBar({
  max,
  value,
  step,
  onChange,
}: ProgressBarProps) {
  return (
    <>
      <div className={styles.trakTimeBlock}>
        <div>{formatDuration(value)}</div>
        <span> / </span>
        <div>{formatDuration(max)}</div>
      </div>
      <input
        className={styles.styledProgressInput}
        type="range"
        min={0}
        max={max}
        value={value}
        step={step}
        onChange={onChange}
      />
    </>
  );
}

export default memo(ProgressBar);