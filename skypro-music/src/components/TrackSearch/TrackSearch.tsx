"use client";

import { useEffect, useState } from "react";
import { TrackType } from "@/types/tracks";
import Search from "@/components/Search/Search";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";
import style from "./TrackSearch.module.css";

type TrackSearchProps = {
  tracks: TrackType[];
  error: string;
};

const TrackSearch = ({ tracks, error }: TrackSearchProps) => {
  const [filteredTracks, setFilteredTracks] = useState<TrackType[]>(tracks);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    const filtered = tracks.filter((track) =>
      track.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredTracks(filtered);
  };

  const handleFilterChange = () => {
    const normalizedSelectedGenres = selectedGenres.map((genre) =>
      genre.trim().toLowerCase(),
    );

    const filtered = tracks.filter((track) => {
      const matchAuthor =
        selectedAuthors.length === 0 || selectedAuthors.includes(track.author);

      const matchDate =
        selectedDates.length === 0 ||
        selectedDates.includes(
          new Date(track.release_date).getFullYear().toString(),
        );

      // Преобразуем жанры трека в массив, если это строка
      const trackGenres = Array.isArray(track.genre)
        ? track.genre.map((g: string) => g.trim().toLowerCase())
        : [track.genre.trim().toLowerCase()];

      const matchGenre =
        normalizedSelectedGenres.length === 0 ||
        normalizedSelectedGenres.some((genre) => trackGenres.includes(genre));

      return matchAuthor && matchDate && matchGenre;
    });

    console.log("Filtered Tracks:", filtered); // Вывод отфильтрованных треков
    setFilteredTracks(filtered);
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((item) => item !== author)
        : [...prev, author],
    );
  };

  const handleDateChange = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date)
        ? prev.filter((item) => item !== date)
        : [...prev, date],
    );
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre],
    );
  };

  // Вызываем фильтрацию при изменении фильтров
  useEffect(() => {
    handleFilterChange();
  }, [selectedAuthors, selectedDates, selectedGenres]);

  return (
    <>
      <Search onSearch={handleSearch} />
      <Filter
        tracks={tracks}
        selectedAuthors={selectedAuthors}
        selectedDates={selectedDates}
        selectedGenres={selectedGenres}
        onAuthorChange={handleAuthorChange}
        onDateChange={handleDateChange}
        onGenreChange={handleGenreChange}
      />
      {filteredTracks.length !== 0 ? (
        <Playlist tracks={filteredTracks} error={error} />
      ) : (
        <div className={style.errorText}>Ничего не найдено</div>
      )}
    </>
  );
};

export default TrackSearch;
