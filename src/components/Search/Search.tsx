import { useState } from "react";
import styles from "./Search.module.css";

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
