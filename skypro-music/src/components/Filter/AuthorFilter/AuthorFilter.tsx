import styles from "../Filter.module.css";

type AuthorFilterProps = {
  title: string;
  isActive: boolean;
  list: string[];
  handleFilter: () => void;
};

const AuthorFilter = ({
  title,
  isActive,
  list,
  handleFilter,
}: AuthorFilterProps) => {
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
          <ul>
            {list.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthorFilter;
