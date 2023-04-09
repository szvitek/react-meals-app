import { useAppContext } from '../context';
import { BsHandThumbsUp } from 'react-icons/bs';

const Meals = () => {
  const { loading, meals, selectMeal } = useAppContext();
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
      {meals.map(({ idMeal: id, strMeal: title, strMealThumb: image }) => (
        <article key={id} className="single-meal">
          <img
            src={image}
            alt={title}
            className="img"
            onClick={() => selectMeal(id)}
          />
          <footer>
            <h5>{title}</h5>
            <button className="like-btn">
              <BsHandThumbsUp />
            </button>
          </footer>
        </article>
      ))}
    </section>
  );
};

export default Meals;
