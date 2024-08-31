import styles from "../Filter.module.css";

type AuthorFilterProps = {
  title: string;
  isActive: boolean;
  list: string[];
  selectedAuthors: string[];
  handleFilter: () => void;
  onAuthorChange: (author: string) => void;
};

const AuthorFilter = ({
  title,
  isActive,
  list = [],
  selectedAuthors = [],
  handleFilter,
  onAuthorChange,
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
        {selectedAuthors.length !== 0 && (
          <div
            className={
              isActive
                ? `${styles.counterAuthorActive}`
                : `${styles.counterAuthor}`
            }
          >
            <span>{selectedAuthors.length}</span>
          </div>
        )}
      </div>
      {isActive && (
        <div className={styles.popup}>
          <ul className={styles.authorList}>
            {list.map((author, index) => (
              <li
                key={index}
                className={styles.authorItem}
                onClick={() => onAuthorChange(author)}
              >
                {author}
                {selectedAuthors.includes(author) && (
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

export default AuthorFilter;
