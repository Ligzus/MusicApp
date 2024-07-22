import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { AppDispatch, AppStore } from "./store/store";
import { RootState } from "@/store/store";
import { dislikeTrack, likeTrack } from "./api/tracks";
import { setDislikeTrack, setLikeTrack } from "./store/features/playlistSlice";
import { TrackType } from "./types/tracks";

// Хуки useAppDispatch, useAppSelector и useAppStore позволяют использовать функции useDispatch, useSelector и useStore из библиотеки react-redux с типизацией.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

const useLikeTrack = (track: TrackType) => {
  const dispatch = useAppDispatch();

  const tokens = {
    access: useAppSelector(state => state.user.access),
    refresh: useAppSelector(state => state.user.refresh),
  };

  const likeTracks = useAppSelector((state) => state.playlist.likedTracks);
  const isLiked = !!likeTracks.find((t) => t.id === track.id);

  const handleLikeTrack = async () => {
    if (!tokens.access || !tokens.refresh) {
      return alert("Вы не авторизованы");
    }

    const action = isLiked ? dislikeTrack : likeTrack;

    try {
      await action({
        trackId: track.id,
        access: tokens.access,
        refresh: tokens.refresh,
      });

      if (isLiked) {
        dispatch(setDislikeTrack(track));
      } else {
        dispatch(setLikeTrack(track));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLikeTrack, isLiked };
};

export default useLikeTrack;
