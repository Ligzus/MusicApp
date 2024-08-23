"use client";

import { useEffect, useState } from "react";
import { TrackType } from "@/types/tracks";
import Search from "@/components/Search/Search";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";
import style from "./TrackSearch.module.css";
import { useAppDispatch } from "@/hooks";
import { setPlaylist } from "@/store/features/playlistSlice";

type TrackSearchProps = {
  tracks: TrackType[];
  error: string;
};

const TrackSearch = ({ tracks, error }: TrackSearchProps) => {
  const [filteredTracks, setFilteredTracks] = useState<TrackType[]>(tracks);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("default");

  const dispatch = useAppDispatch();

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

      const trackGenres = Array.isArray(track.genre)
        ? track.genre.map((g: string) => g.trim().toLowerCase())
        : [track.genre.trim().toLowerCase()];

      const matchGenre =
        normalizedSelectedGenres.length === 0 ||
        normalizedSelectedGenres.some((genre) => trackGenres.includes(genre));

      return matchAuthor && matchGenre;
    });

    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      } else {
        return 0;
      }
    });

    setFilteredTracks(sorted);
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((item) => item !== author)
        : [...prev, author],
    );
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre],
    );
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedAuthors, selectedGenres, sortOrder]);

  useEffect(() => {
    // Отправка отфильтрованного плейлиста в глобальное состояние
    dispatch(setPlaylist(filteredTracks));
  }, [filteredTracks, dispatch]);

  return (
    <>
      <Search onSearch={handleSearch} />
      <Filter
        tracks={tracks}
        selectedAuthors={selectedAuthors}
        selectedGenres={selectedGenres}
        onAuthorChange={handleAuthorChange}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
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
