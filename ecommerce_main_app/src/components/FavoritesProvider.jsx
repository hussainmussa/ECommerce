import React, { useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (contractor) => {
    setFavorites((prevFavorites) => [...prevFavorites, contractor]);
  };

  const removeFavorite = (contractor) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.fullname !== contractor.fullname)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
