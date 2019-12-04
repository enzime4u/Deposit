export function getOrders() {
  const getOrdersURL = "http://mvctest.staging.psw.ro/application/get-orders";

  return fetch(getOrdersURL).then(reply => reply.json());
}

export function getOrderProducts(id) {
  const orderUrl = "http://mvctest.staging.psw.ro/application/order-products";

  return fetch(orderUrl).then(response => response.json());
}
