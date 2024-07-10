"use client";

import { TrackType } from "@/types/tracks";
import styles from "./Filter.module.css";
import AuthorFilter from "./AuthorFilter/AuthorFilter";
import { getUniqueValues } from "@/utils/getUniqueValues";
import { useEffect, useState } from "react";
import ReleaseDateFilter from "./ReleaseDateFilter/ReleaseDateFilter";
import GenreFilter from "./GenreFilter/GenreFilter";

const SORT_OPTIONS = ["По умолчанию", "Сначала новые", "Сначала старые"];

type FilterProps = {
  tracks: TrackType[];
};

const Filter = ({ tracks }: FilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  function handleFilter(filter: string) {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  }

  const uniqueAuthors = getUniqueValues(tracks, "author");
  const uniqueReleaseDate = getUniqueValues(tracks, "release_date");
  const uniqueGenre = getUniqueValues(tracks, "genre");

  // Чтобы фильтры скрывались при нажатии на экран (ChatGPT подсказал):
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.centerblockFilter}`)) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <AuthorFilter
        title="исполнителю"
        isActive={activeFilter === "author"}
        list={uniqueAuthors}
        handleFilter={() => handleFilter("author")}
      />
      <ReleaseDateFilter
        title="году"
        isActive={activeFilter === "release_date"}
        list={uniqueReleaseDate}
        handleFilter={() => handleFilter("release_date")}
      />
      <GenreFilter
        title="жанру"
        isActive={activeFilter === "genre"}
        list={uniqueGenre}
        handleFilter={() => handleFilter("genre")}
      />
    </div>
  );
};

export default Filter;
