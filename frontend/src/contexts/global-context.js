import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";

const initialState = {
  isSideNavAddingMemory: false,
};

const HANDLERS = {
  SIDE_NAV_ADDING_MEMORY: "SIDE_NAV_ADDING_MEMORY",
};

const handlers = {
  [HANDLERS.SIDE_NAV_ADDING_MEMORY]: (state, action) => {
    const isAdding = action.payload;
    return {
      ...state,
      isSideNavAddingMemory: isAdding,
    };
  },
};

const reducer = (state, action) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

const GlobalContext = createContext({ undefined });

export const GlobalProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSideNavAddingMemory = (isAdding) => {
    dispatch({
      type: HANDLERS.SIDE_NAV_ADDING_MEMORY,
      payload: isAdding,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setSideNavAddingMemory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export const useGlobalContext = () => useContext(GlobalContext);
