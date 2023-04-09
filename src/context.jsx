import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const lsKey = 'meals-app-favorites';

const getFavoritesFromLocalStorage = () => {
  const lsEntry = localStorage.getItem(lsKey) || '[]';
  return JSON.parse(lsEntry);
};

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  /*
  Why useCallback? Well, since the function is declared outside of useEffect, you
  will have to put it in the dependency array of the hook. But if the
  function isn't wrapped in useCallback, it will update on every
  re-render, and thus trigger the useEffect on every re-render. Which is
  rarely what you want!
  */
  const fetchMeals = useCallback(async (url) => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }

    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    localStorage.setItem(lsKey, JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (idMeal) => {
    console.log('rem', idMeal);
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem(lsKey, JSON.stringify(updatedFavorites));
  };

  // only on first load fetch some data
  useEffect(() => {
    // call the function
    fetchMeals(allMealsUrl);
  }, [fetchMeals]);

  // handle search logic (prevent multiple requests from search component)
  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [fetchMeals, searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook make consuming AppContext easier
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
