import React, { useReducer, useContext } from "react";
import reducer from "./reducer.js";
import initialState from "./state.js";

export const State = React.createContext(null);
export const Dispatch = React.createContext(null);

export function useStore() {
  const state = useContext(State);
  const dispatch = useContext(Dispatch);

  return [state, dispatch];
}

export default function Provider(attrs) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Dispatch.Provider value={dispatch}>
      <State.Provider value={state}>{attrs.children}</State.Provider>
    </Dispatch.Provider>
  );
}
