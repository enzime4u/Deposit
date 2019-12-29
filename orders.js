export function getOrders() {
  const getOrdersURL = "http://mvctest.staging.psw.ro/application/get-orders";

  return fetch(getOrdersURL).then(reply => reply.json());
}

// what we do with id ?
export function getOrderProducts(id) {
  const orderUrl = "http://mvctest.staging.psw.ro/application/order-products";

  return fetch(orderUrl, {
    method: "POST",
    body: JSON.stringify({ id: id })
  }).then(response => response.json());
}

export function sendProduct(data) {
  const sendProductURL =
    "https://mvctest.staging.psw.ro/application/save-product";

  return fetch(sendProductURL, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(response => {
    response.blob();
    console.log(response);
  });
}
