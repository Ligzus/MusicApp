import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./Filter";
import { TrackType } from "@/types/tracks";
import "@testing-library/jest-dom";

// Моковые данные для тестирования
const mockTracks: TrackType[] = [
  {
    _id: 1,
    name: "Track 1",
    author: "Исполнитель 1",
    release_date: "2023",
    genre: "Рок",
    duration_in_seconds: 240,
    album: "Album 1",
    logo: null,
    track_file: "track1.mp3",
    stared_user: [],
  },
  {
    _id: 2,
    name: "Track 2",
    author: "Исполнитель 2",
    release_date: "2022",
    genre: "Поп",
    duration_in_seconds: 200,
    album: "Album 2",
    logo: "logo2.png",
    track_file: "track2.mp3",
    stared_user: [],
  },
];

describe("Компонент Filter", () => {
  const defaultProps = {
    tracks: mockTracks,
    selectedAuthors: [],
    selectedGenres: [],
    onAuthorChange: jest.fn(),
    onGenreChange: jest.fn(),
    onSortChange: jest.fn(),
  };

  it("рендерится без ошибок и отображает заголовки фильтров", () => {
    render(<Filter {...defaultProps} />);

    // Проверяем, что заголовки фильтров отображаются
    expect(screen.getByText("исполнителю")).toBeInTheDocument();
    expect(screen.getByText("году")).toBeInTheDocument();
    expect(screen.getByText("жанру")).toBeInTheDocument();
  });

  it("открывает и закрывает фильтр исполнителя при нажатии", () => {
    render(<Filter {...defaultProps} />);

    const authorFilterButton = screen.getByText("исполнителю");

    // Открываем фильтр
    fireEvent.click(authorFilterButton);

    // Проверяем, что фильтр отображается
    expect(screen.getByText("Исполнитель 1")).toBeInTheDocument();

    // Закрываем фильтр и проверяем, что фильтр скрыт
    fireEvent.click(authorFilterButton);
    expect(screen.queryByText("Исполнитель 1")).not.toBeInTheDocument();
  });

  it("закрывает активный фильтр при клике вне его области", () => {
    render(<Filter {...defaultProps} />);

    const authorFilterButton = screen.getByText("исполнителю");

    // Открываем фильтр
    fireEvent.click(authorFilterButton);
    expect(screen.getByText("Исполнитель 1")).toBeInTheDocument();

    // Кликаем вне области фильтра
    fireEvent.click(document.body);

    // Проверяем, что фильтр скрыт
    expect(screen.queryByText("Исполнитель 1")).not.toBeInTheDocument();
  });
});
