import { useAppContext } from '../context';
import { BsHandThumbsUp } from 'react-icons/bs';

const Meals = () => {
  const { loading, meals, selectMeal, addToFavorites } = useAppContext();
  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (!meals.length) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map(({ idMeal, strMeal: title, strMealThumb: image }) => (
        <article key={idMeal} className="single-meal">
          <img
            src={image}
            alt={title}
            className="img"
            onClick={() => selectMeal(idMeal)}
          />
          <footer>
            <h5>{title}</h5>
            <button className="like-btn" onClick={() => addToFavorites(idMeal)}>
              <BsHandThumbsUp />
            </button>
          </footer>
        </article>
      ))}
    </section>
  );
};

export default Meals;
