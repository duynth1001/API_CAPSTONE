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

function delProductByID(id) {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  });
}

function addNewProduct(sp) {
  return axios({
    url: BASE_URL,
    method: "POST",
    data: sp,
  });
}
function updateProductByID(id, sp) {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "PUT",
    data: sp,
  });
}
export {
  getProductList,
  getProductByID,
  delProductByID,
  addNewProduct,
  updateProductByID,
};
