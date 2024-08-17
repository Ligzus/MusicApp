import styles from "../Filter.module.css";

type ReleaseDateFilterProps = {
  title: string;
  isActive: boolean;
  list: string[];
  selectedDates: string[];
  handleFilter: () => void;
  onDateChange: (date: string) => void;
};

const ReleaseDateFilter = ({
  title,
  isActive,
  list,
  selectedDates,
  handleFilter,
  onDateChange,
}: ReleaseDateFilterProps) => {
  return (
    <div>
      <div
        className={
          isActive
            ? `${styles.filterButtonOpen} ${styles.btnText}`
            : `${styles.filterButton} ${styles.btnText}`
        }
        onClick={handleFilter}
      >
        {title}
      </div>
      {isActive && (
        <div className={styles.popup}>
          <ul className={styles.authorList}>
            {list.map((releaseDate, index) => (
              <li
                key={index}
                className={styles.authorItem}
                onClick={() => onDateChange(releaseDate)}
              >
                {releaseDate}
                {selectedDates.includes(releaseDate) && (
                  <span className={styles.checkmark}>✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReleaseDateFilter;
