import styles from "../Filter.module.css";

type GenreFilterProps = {
  title: string;
  isActive: boolean;
  list: string[];
  selectedGenres: string[];
  handleFilter: () => void;
  onGenreChange: (genre: string) => void;
};

const GenreFilter = ({
  title,
  isActive,
  list,
  selectedGenres,
  handleFilter,
  onGenreChange,
}: GenreFilterProps) => {
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
            {list.map((genre, index) => (
              <li
                key={index}
                className={styles.authorItem}
                onClick={() => onGenreChange(genre)}
              >
                {genre}
                {selectedGenres.includes(genre) && (
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

export default GenreFilter;
