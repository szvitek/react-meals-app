import { createContext, useContext, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const fetchData = async () => {
    try {
      const data = await fetch('https://randomuser.me/api');
      const json = await data.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // call the function
    fetchData();
  }, [fetchData]);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

// custom hook make consuming AppContext easier
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
