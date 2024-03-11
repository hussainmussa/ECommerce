import React from "react";

export const FavoritesContext = React.createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});
