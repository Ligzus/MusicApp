import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Playlist from "./Playlist";
import { TrackType } from "@/types/tracks";
import '@testing-library/jest-dom';

// мок-стор с начальными данными
const mockStore = configureStore([]);
const initialState = {
  playlist: {
    currentTrack: null, 
    likedTracks: [], 
    playlist: [], 
    shuffledPlayList: [], 
    isShuffled: false, 
    isPlaying: false, 
  },
  user: {
    email: "",
    username: "",
    access: null,
    refresh: null,
  }
};

const store = mockStore(initialState);

describe("Playlist", () => {
  it("рендерится корректно", () => {
    const tracks: TrackType[] = [
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
        release_date: "2024-01-02",
        genre: "Rock",
        duration_in_seconds: 200,
        album: "Album 2",
        logo: "logo2.png",
        track_file: "track2.mp3",
        stared_user: [],
      },
    ];
    
    const { container } = render(
      <Provider store={store}>
        <Playlist tracks={tracks} error="" />
      </Provider>
    );
    
    expect(container).toMatchSnapshot();
  });

  it("выводит сообщение об ошибке", () => {
    const error = "Что-то пошло не так!";
    
    const { getByText } = render(
      <Provider store={store}>
        <Playlist tracks={[]} error={error} />
      </Provider>
    );
    
    expect(getByText(error)).toBeInTheDocument();
  });
});
