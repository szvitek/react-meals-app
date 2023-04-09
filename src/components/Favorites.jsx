import { useAppContext } from '../context';

const Favorites = () => {
  const { favorites, selectMeal, removeFromFavorites } = useAppContext();
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favorites.map((meal) => {
            const { idMeal, strMealThumb: image } = meal;
            return (
              <div key={idMeal} className="favorite-item">
                <img
                  src={image}
                  className="img favorites-img"
                  onClick={() => selectMeal(idMeal, true)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavorites(idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
