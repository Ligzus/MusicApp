"use client";

import { useState } from "react";
import { TrackType } from "@/types/tracks";
import Search from "@/components/Search/Search";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";

type TrackSearchProps = {
  tracks: TrackType[];
  error: string;
};

const TrackSearch = ({ tracks, error }: TrackSearchProps) => {
  const [filteredTracks, setFilteredTracks] = useState<TrackType[]>(tracks);

  const handleSearch = (query: string) => {
    const filtered = tracks.filter((track) =>
      track.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredTracks(filtered);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <Filter tracks={filteredTracks} />
      <Playlist tracks={filteredTracks} error={error} />
    </>
  );
};

export default TrackSearch;
