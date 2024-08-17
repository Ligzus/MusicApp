import styles from "../Filter.module.css";

type ReleaseDateFilterProps = {
  title: string;
  isActive: boolean;
  handleFilter: () => void;
  onSortChange: (order: string) => void;
};

const ReleaseDateFilter = ({
  title,
  isActive,
  handleFilter,
  onSortChange,
}: ReleaseDateFilterProps) => {
  const sortOptions = [
    { label: "По умолчанию", value: "default" },
    { label: "Сначала новые", value: "newest" },
    { label: "Сначала старые", value: "oldest" },
  ];

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
          <ul className={styles.sortList}>
            {sortOptions.map((option, index) => (
              <li
                key={index}
                className={styles.sortItem}
                onClick={() => {
                  onSortChange(option.value);
                  handleFilter(); // Закрываем фильтр после выбора опции
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReleaseDateFilter;
