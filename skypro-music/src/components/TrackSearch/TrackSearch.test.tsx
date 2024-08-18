import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrackSearch from "./TrackSearch";
import { TrackType } from "@/types/tracks";

// Мокируем компоненты Search, Filter и Playlist
jest.mock("../Search/Search", () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <input
      type="text"
      placeholder="Search"
      onChange={(e) => onSearch(e.target.value)}
    />
  ),
}));

jest.mock("../Filter/Filter", () => ({
  __esModule: true,
  default: ({
    tracks,
    selectedAuthors,
    selectedGenres,
    onAuthorChange,
    onGenreChange,
    onSortChange,
  }: {
    tracks: TrackType[];
    selectedAuthors: string[];
    selectedGenres: string[];
    onAuthorChange: (author: string) => void;
    onGenreChange: (genre: string) => void;
    onSortChange: (order: string) => void;
  }) => (
    <div>
      <button onClick={() => onAuthorChange("Artist 1")}>
        Toggle Artist 1
      </button>
      <button onClick={() => onGenreChange("Pop")}>Toggle Pop</button>
      <button onClick={() => onSortChange("newest")}>Sort Newest</button>
    </div>
  ),
}));

jest.mock("../Playlist/Playlist", () => ({
  __esModule: true,
  default: ({ tracks, error }: { tracks: TrackType[]; error: string }) => (
    <div>
      {tracks.length ? (
        tracks.map((track) => <div key={track._id}>{track.name}</div>)
      ) : (
        <div>No Tracks Available</div>
      )}
      {error && <div>{error}</div>}
    </div>
  ),
}));

describe("TrackSearch", () => {
  const mockTracks: TrackType[] = [
    {
      _id: 1,
      name: "Track 1",
      author: "Artist 1",
      release_date: "2024-01-01",
      genre: "Pop",
      duration_in_seconds: 180,
      album: "Album 1",
      logo: null,
      track_file: "track1.mp3",
      stared_user: [],
    },
    {
      _id: 2,
      name: "Track 2",
      author: "Artist 2",
      release_date: "2024-02-01",
      genre: "Rock",
      duration_in_seconds: 200,
      album: "Album 2",
      logo: "logo2.png",
      track_file: "track2.mp3",
      stared_user: [],
    },
  ];

  it("рендерится и корректно ищет треки по поиску", async () => {
    render(<TrackSearch tracks={mockTracks} error="" />);

    // Проверяем начальное состояние
    expect(screen.getByText("Track 1")).toBeInTheDocument();
    expect(screen.getByText("Track 2")).toBeInTheDocument();

    // Имитация поиска
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "Track 1" },
    });

    // Ожидаем обновление состояния
    await waitFor(() => {
      expect(screen.getByText("Track 1")).toBeInTheDocument();
      expect(screen.queryByText("Track 2")).toBeNull();
    });
  });

  it("показывает ошибку, если треки не найдены", () => {
    render(<TrackSearch tracks={[]} error="Ничего не найдено" />);

    // Проверяем наличие сообщения об ошибке
    expect(screen.getByText("Ничего не найдено")).toBeInTheDocument();
  });
});
