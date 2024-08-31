import { fetchFavoriteTracks } from "@/api/tracks";
import { TrackType } from "@/types/tracks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Асинхронное действие для получения любимых треков
export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async ({
    access,
    refresh,
  }: {
    access: string | null;
    refresh: string | null;
  }) => {
    if (access && refresh) {
      const favoriteTracks = await fetchFavoriteTracks({ access, refresh });
      return favoriteTracks.data;
    }
  },
);

// Тип состояния плейлиста
type PlaylistStateType = {
  currentTrack: null | TrackType;
  likedTracks: TrackType[];
  playlist: TrackType[];
  shuffledPlayList: TrackType[];
  isShuffled: boolean;
  isPlaying: boolean;
};

// Начальное состояние
const initialState: PlaylistStateType = {
  currentTrack: null,
  likedTracks: [],
  playlist: [],
  shuffledPlayList: [],
  isShuffled: false,
  isPlaying: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlayList = state.isShuffled
        ? [...action.payload].sort(() => 0.5 - Math.random())
        : action.payload;
    },

    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },

    setNextTrack: (state) => {
      const currentPlaylist = state.isShuffled
        ? state.shuffledPlayList
        : state.playlist;
      const currentTrackIndex = currentPlaylist.findIndex(
        (track) => track._id === state.currentTrack?._id,
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
        (track) => track._id === state.currentTrack?._id,
      );

      const prevTrack = currentPlaylist[currentTrackIndex - 1];

      if (prevTrack) {
        state.currentTrack = prevTrack;
      }
    },

    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffled = action.payload;
      state.shuffledPlayList = action.payload
        ? [...state.playlist].sort(() => 0.5 - Math.random())
        : state.playlist;
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setDislikeTrack: (state, action: PayloadAction<TrackType>) => {
      const dislikedTrackId = action.payload._id;
      state.likedTracks = state.likedTracks.filter(
        (track) => track._id !== dislikedTrackId,
      );
    },

    setLikeTrack: (state, action: PayloadAction<TrackType>) => {
      const likedTrack = action.payload;
      state.likedTracks.push(likedTrack);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteTracks.fulfilled, (state, action) => {
      state.likedTracks = action.payload;
    });
  },
});

export const {
  setPlaylist,
  setCurrentTrack,
  setNextTrack,
  setPrevTrack,
  setIsShuffle,
  setIsPlaying,
  setDislikeTrack,
  setLikeTrack,
} = playlistSlice.actions;

export const playlistReducer = playlistSlice.reducer;
