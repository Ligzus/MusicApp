"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TrackType } from "@/types/tracks";

type CurrentTrackContextValue = {
  currentTrack: TrackType | null;
  setCurrentTrack: Dispatch<SetStateAction<TrackType | null>>;
  playlist: TrackType[];
  setPlaylist: Dispatch<SetStateAction<TrackType[]>>;
};

const CurrentTrackContext = createContext<CurrentTrackContextValue | undefined>(
  undefined,
);

type CurrentTrackProviderProps = {
  children: ReactNode;
};

export function CurrentTrackProvider({ children }: CurrentTrackProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  return (
    <CurrentTrackContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </CurrentTrackContext.Provider>
  );
}

// Кастомный хук для контекста:
export function useCurrentTrack() {
  const context = useContext(CurrentTrackContext);
  if (context === undefined) {
    throw new Error("useCurrentTrack должен использоваться внутри провайдера");
  }

  return context;
}
