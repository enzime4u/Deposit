// [service].[section].[command]

export default function reducer(previous, { type, data }) {
  const state = { ...previous };

  switch (type) {
    // get orders from the database
    case "orders.update":
      state.orders = data;
      break;

    case "order.select":
      state.selected = data;
      state.modalShow = true;
      break;

    case "order.deselect":
      state.selected = data;
      state.modalShow = false;
      break;

    case "order.select.products":
      state.selected.products = data;
      break;

    case "product.add.show":
      state.showAddProduct = true;
      break;

    case "product.add.hide":
      state.showAddProduct = false;
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
