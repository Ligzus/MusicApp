import { useEffect, useState, useMemo } from "react";
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

  // Мемоизация уникальных авторов и жанров
  const uniqueAuthors = useMemo(
    () => getUniqueValues(tracks, "author"),
    [tracks],
  );
  const uniqueGenres = useMemo(
    () => getUniqueValues(tracks, "genre"),
    [tracks],
  );

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
        onSortChange={onSortChange}
      />
      <GenreFilter
        title="жанру"
        isActive={activeFilter === "genre"}
        list={uniqueGenres}
        selectedGenres={selectedGenres}
        handleFilter={() => handleFilter("genre")}
        onGenreChange={onGenreChange}
      />
    </div>
  );
};

export default Filter;
