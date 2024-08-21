import { fetchFavoriteTracks } from "@/api/tracks";
import { TrackType } from "@/types/tracks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type PlaylistStateType = {
  currentTrack: null | TrackType;
  likedTracks: TrackType[];
  playlist: TrackType[];
  shuffledPlayList: TrackType[];
  isShuffled: boolean;
  isPlaying: boolean;
};

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

      const nextTrack = currentPlaylist[currentTrackIndex - 1];

      if (nextTrack) {
        state.currentTrack = nextTrack;
      }
    },

    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffled = action.payload;
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
  setCurrentTrack,
  setNextTrack,
  setPrevTrack,
  setIsShuffle,
  setIsPlaying,
  setDislikeTrack,
  setLikeTrack,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
