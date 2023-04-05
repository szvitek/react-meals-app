import { createContext, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

// custom hook make consuming AppContext easier
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
