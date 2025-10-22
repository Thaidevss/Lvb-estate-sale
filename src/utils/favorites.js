// src/utils/favorites.js
import Cookies from "js-cookie";

const FAVORITES_KEY = "favorite_ids";

export function getFavorites() {
  const cookie = Cookies.get(FAVORITES_KEY);
  return cookie ? JSON.parse(cookie) : [];
}

export function addFavorite(id) {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    Cookies.set(FAVORITES_KEY, JSON.stringify(favorites), { expires: 7 });
  }
}

export function removeFavorite(id) {
  let favorites = getFavorites();
  favorites = favorites.filter(favId => favId !== id);
  Cookies.set(FAVORITES_KEY, JSON.stringify(favorites), { expires: 7 });
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}
