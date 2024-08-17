import { useEffect, useState } from "react";
import { TrackType } from "@/types/tracks";
import styles from "./Filter.module.css";
import AuthorFilter from "./AuthorFilter/AuthorFilter";
import ReleaseDateFilter from "./ReleaseDateFilter/ReleaseDateFilter";
import GenreFilter from "./GenreFilter/GenreFilter";
import { getUniqueValues, getUniqueYearsFromDates } from "@/utils/getUniqueValues";

type FilterProps = {
  tracks: TrackType[];
  selectedAuthors: string[];
  selectedDates: string[];
  selectedGenres: string[];
  onAuthorChange: (author: string) => void;
  onDateChange: (date: string) => void;
  onGenreChange: (genre: string) => void;
};

const Filter = ({
  tracks,
  selectedAuthors,
  selectedDates,
  selectedGenres,
  onAuthorChange,
  onDateChange,
  onGenreChange,
}: FilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const uniqueAuthors = getUniqueValues(tracks, "author");
  const uniqueReleaseDates = getUniqueYearsFromDates(tracks, "release_date");
  const uniqueGenres = getUniqueValues(tracks, "genre");

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
        list={uniqueReleaseDates}
        selectedDates={selectedDates}
        handleFilter={() => handleFilter("release_date")}
        onDateChange={onDateChange}
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
