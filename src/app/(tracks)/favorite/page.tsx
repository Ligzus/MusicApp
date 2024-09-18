"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getFavoriteTracks } from "@/store/features/playlistSlice";
import Playlist from "@/components/Playlist/Playlist";

const FavoriteTracks = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const accessToken = useAppSelector((state) => state.user.access);
  const refreshToken = useAppSelector((state) => state.user.refresh);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
      return;
    }

    const fetchFavoriteTracks = async () => {
      try {
        await dispatch(
          getFavoriteTracks({ access: accessToken, refresh: refreshToken }),
        ).unwrap();
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? "Ошибка при загрузке треков: " + err.message
            : "Неизвестная ошибка",
        );
      }
    };

    fetchFavoriteTracks();
  }, [accessToken, refreshToken, dispatch, router]);

  return (
    <>
      <h2 className={styles.centerblockH2}>Мой плейлист</h2>
      <Playlist tracks={likedTracks} error={error} />
    </>
  );
};

export default FavoriteTracks;
