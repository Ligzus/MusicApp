import styles from "../Filter.module.css";

type ReleaseDateFilterProps = {
  title: string;
  isActive: boolean;
  list: string[];
  handleFilter: () => void;
};

const ReleaseDateFilter = ({
  title,
  isActive,
  list,
  handleFilter,
}: ReleaseDateFilterProps) => {
  const getYearFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <div>
      <div
        className={`${styles.filterButton} ${styles.btnText}`}
        onClick={handleFilter}
      >
        {title}
      </div>
      {isActive && (
        <div className={styles.popup}>
          <ul>
            {list.map((release_date, index) => (
              <li key={index}>{getYearFromDate(release_date)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReleaseDateFilter;
