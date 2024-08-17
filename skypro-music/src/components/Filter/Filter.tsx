import { useEffect, useState } from "react";
import { TrackType } from "@/types/tracks";
import styles from "./Filter.module.css";
import AuthorFilter from "./AuthorFilter/AuthorFilter";
import ReleaseDateFilter from "./ReleaseDateFilter/ReleaseDateFilter";
import GenreFilter from "./GenreFilter/GenreFilter";
import { getUniqueValues } from "@/utils/getUniqueValues";

type FilterProps = {
  tracks: TrackType[];
  selectedAuthors: string[];
  selectedGenres: string[];
  onAuthorChange: (author: string) => void;
  onGenreChange: (genre: string) => void;
  onSortChange: (order: string) => void;
};

const Filter = ({
  tracks,
  selectedAuthors,
  selectedGenres,
  onAuthorChange,
  onGenreChange,
  onSortChange,
}: FilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const uniqueAuthors = getUniqueValues(tracks, "author");
  const uniqueGenre = getUniqueValues(tracks, "genre");

  const handleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.centerblockFilter}`) && activeFilter) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeFilter]);

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <AuthorFilter
        title="исполнителю"
        isActive={activeFilter === "author"}
        list={uniqueAuthors}
        selectedAuthors={selectedAuthors}
        handleFilter={() => handleFilter("author")}
        onAuthorChange={onAuthorChange}
      />
      <ReleaseDateFilter
        title="году"
        isActive={activeFilter === "release_date"}
        handleFilter={() => handleFilter("release_date")}
        onSortChange={onSortChange} // Добавляем обработчик изменения сортировки
      />
      <GenreFilter
        title="жанру"
        isActive={activeFilter === "genre"}
        list={uniqueGenre}
        selectedGenres={selectedGenres}
        handleFilter={() => handleFilter("genre")}
        onGenreChange={onGenreChange}
      />
    </div>
  );
};

export default Filter;
