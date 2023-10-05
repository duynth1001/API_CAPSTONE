import {
  getProductList,
  getProductByID,
  delProductByID,
  addNewProduct,
  updateProductByID,
} from "../services/services.js";
import {
  renderProductsList,
  parseAPIList,
  retrieveFormData,
  validateFormData,
  resetFormNoti,
} from "./viewController.js";
import {
  getElement,
  findObjByName,
  findObjById,
  sortAsc,
  sortDsc,
} from "../util/util.js";
import { products } from "../model/products.js";

let productListGlobal = [];
//render product list
function fetchProductsList() {
  getProductList()
    .then(function (res) {
      productListGlobal = parseAPIList(res.data);
      renderProductsList(res.data);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}
fetchProductsList();

//find product by name
getElement("#btnTimSP").onclick = () => {
  const searchQry = getElement("#searchName").value.trim().toLowerCase();
  const foundObj = findObjByName(searchQry, productListGlobal);
  if (foundObj.length == 0) {
    alert("Không tìm thấy sản phẩm theo yêu cầu!");
    return;
  }
  renderProductsList(foundObj);
};

//sort product descend
getElement("#sortProductDes").onclick = () => {
  sortDsc(productListGlobal);
  renderProductsList(productListGlobal);
};

//sort product ascend
getElement("#sortProductAsc").onclick = () => {
  sortAsc(productListGlobal);
  renderProductsList(productListGlobal);
};

//delete product
window.deleteProductView = (id) => {
  const foundObj = findObjById(id, productListGlobal);
  if (!foundObj) {
    return;
  }
  delProductByID(id)
    .then(function () {
      fetchProductsList();
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

//add new product
getElement("#addPhoneForm").onclick = () => {
  getElement("#btnUpdate").setAttribute("style", "display:none;");
  getElement("#btnAddPhone").setAttribute("style", "display:block;");
};

getElement("#btnAddPhone").onclick = () => {
  const lastID = productListGlobal.length++;
  const formData = retrieveFormData(lastID);
  const { name, brand, price, imageUrl, qty, heading, des } = formData;
  const sendObj = new products(
    name,
    brand,
    price,
    imageUrl,
    qty,
    heading,
    des,
    lastID
  );
  if (validateFormData(name, brand, price, imageUrl, qty, heading, des)) {
    resetFormNoti();
    addNewProduct(sendObj)
      .then(function () {
        //lấy danh sách sp mới nhất từ server
        fetchProductsList();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};

//update product
window.editProductView = (id) => {
  getElement("#btnAddPhone").setAttribute("style", "display:none;");
  getElement("#btnUpdate").setAttribute("style", "display:block;");
  getProductByID(id)
    .then(function (res) {
      const sp = res.data;
      getElement("#name").value = sp.name;
      getElement("#type").value = sp.brand;
      getElement("#price").value = sp.price;
      getElement("#imageUrl").value = sp.imageUrl;
      getElement("#qty").value = sp.qty;
      getElement("#heading").value = sp.heading;
      getElement("#desc").value = sp.des;
      getElement("#tbdesc").setAttribute("value", `${id}`);
      $("#exampleModal").modal("show");
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

getElement('#btnUpdate').onclick = ()=>{
  const productID = getElement('#tbdesc').getAttribute("value");
  const formData = retrieveFormData(productID);
  const { name, brand, price, imageUrl, qty, heading, des } = formData;
  const sendObj = new products(
    name,
    brand,
    price,
    imageUrl,
    qty,
    heading,
    des,
    productID
  );
  updateProductByID(productID, sendObj)
  .then(function () {
    $("#exampleModal").modal("hide");
    fetchProductsList();
  })
  .catch(function (err) {
    console.log("err", err);
  });
}