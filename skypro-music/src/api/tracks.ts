import { fetchWithAuth } from "@/utils/fetchWithAuth";

const API_URL = "https://skypro-music-api.skyeng.tech";

export async function getTracks() {
  const res = await fetch(API_URL + "/catalog/track/all/");

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function likeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    API_URL + `/track/${trackId}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh,
  );

  return res.json();
}

export async function dislikeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    API_URL + `/track/${trackId}/favorite/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh,
  );

  return res.json();
}

export async function fetchFavoriteTracks({
  access,
  refresh,
}: {
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    API_URL + `/track/favorite/all/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh,
  );

  return res.json();
}
