const BASE_URL = "https://6500588818c34dee0cd4bf4c.mockapi.io/API_CAPSTONE";
function getProductList() {
  return axios({
    url: BASE_URL,
    method: "GET",
  });
}
function getProductByID(id) {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  });
}

export { getProductList,getProductByID };
