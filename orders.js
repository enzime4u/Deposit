export default function orders() {
  const getOrdersURL = "http://mvctest.staging.psw.ro/application/get-orders";
  return fetch(getOrdersURL).then(reply => reply.json());
}
