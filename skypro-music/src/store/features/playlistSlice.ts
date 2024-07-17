import { TrackType } from "@/types/tracks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | TrackType;
  playlist: TrackType[];
  shuffledPlayList: TrackType[];
  isShuffled: boolean;
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlayList: [],
  isShuffled: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: TrackType; trackData: TrackType[] }>,
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.trackData;
      state.shuffledPlayList = [...action.payload.trackData].sort(
        () => 0.5 - Math.random(),
      );
    },

    setNextTrack: (state) => {
      const currentPlaylist = state.isShuffled
        ? state.shuffledPlayList
        : state.playlist;
      const currentTrackIndex = currentPlaylist.findIndex(
        (track) => track.id === state.currentTrack?.id,
      );

      const nextTrack = currentPlaylist[currentTrackIndex + 1];

      if (nextTrack) {
        state.currentTrack = nextTrack;
      }
    },

    setPrevTrack: (state) => {
      const currentPlaylist = state.isShuffled
        ? state.shuffledPlayList
        : state.playlist;
      const currentTrackIndex = currentPlaylist.findIndex(
        (track) => track.id === state.currentTrack?.id,
      );

      const nextTrack = currentPlaylist[currentTrackIndex - 1];

      if (nextTrack) {
        state.currentTrack = nextTrack;
      }
    },

    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffled === action.payload;
    },
  },
});

export const { setCurrentTrack, setNextTrack, setPrevTrack, setIsShuffle } =
  playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
