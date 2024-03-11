import { FavoritesContext } from "../components/FavoritesContext";

function Favorite() {
  const { favorites } = React.useContext(FavoritesContext);

  return (
    <div>
      {favorites.map((contractor) => (
        <div key={contractor.fullname}>{/* display contractor details */}</div>
      ))}
    </div>
  );
}

export default Favorite;
