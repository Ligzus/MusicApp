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

// Хуки useAppDispatch, useAppSelector и useAppStore позволяют использовать функции useDispatch, useSelector и useStore из библиотеки react-redux с типизацией.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

const useLikeTrack = (track: any) => {
  const dispatch = useAppDispatch();
  const tokens = {
    access: useAppSelector((state) => state.user.access),
    refresh: useAppSelector((state) => state.user.refresh),
  };

  const likeTracks = useAppSelector((state) => state.playlist.likedTracks);
  const isLiked =
    Array.isArray(likeTracks) && !!likeTracks.find((t) => t._id === track._id);

  const handleLikeTrack = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tokens.access || !tokens.refresh) {
      return alert("Вы не авторизованы");
    }

    const action = isLiked ? dislikeTrack : likeTrack;

    try {
      await action({
        trackId: track._id,
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
