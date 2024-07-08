import styles from "../Filter.module.css";

type GenreFilterProps = {
  title: string;
  isActive: boolean;
  list: string[];
  handleFilter: () => void;
};

const GenreFilter = ({
  title,
  isActive,
  list,
  handleFilter,
}: GenreFilterProps) => {
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
            {list.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
