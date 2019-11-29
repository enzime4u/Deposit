export default function reducer(previous, { type, data }) {
  const state = { ...previous };

  switch (type) {
    case "orders.update":
      state.orders = data;
      break;

    default:
      throw Error("App: action type not found.");
  }
  return state;
}

// Actions
// => update.orders = get orders from the database

// stage 1- useState
// stage2 - useReducer
// stage3 - use Multiple Stores !!!
