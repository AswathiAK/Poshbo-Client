import React, { createContext, useReducer } from 'react'

const INITIAL_STATE = {
  city: undefined,
  selectedDates: [],
  selectedOptions: {
    room: undefined,
    guests: undefined
  }
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, searchDispatch] = useReducer(SearchReducer, INITIAL_STATE); 
  return (
    <SearchContext.Provider
      value={{
        city: state.destination,
        selectedDates: state.dates,
        selectedOptions: state.options,
        searchDispatch
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
