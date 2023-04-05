import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    // call the function
    fetchMeals(allMealsUrl);
  }, [fetchMeals]);

  return (
    <AppContext.Provider value={{ loading, meals }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook make consuming AppContext easier
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
