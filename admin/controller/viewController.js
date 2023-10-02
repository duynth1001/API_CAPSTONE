import { products } from "../model/products.js";
import { getElement } from "../util/util.js";
import {
  showMessage,
  kiemTraRong,
  kiemTraSo,
  kiemTraLink,
} from "../util/validate.js";
function renderProductsList(productsList) {
  let content = "";
  for (const product of productsList) {
    let contentTr = `
      <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.brand}</td>
      <td>${product.price}</td>
      <td>${product.qty}</td>
      <td><img style="width:150px;heigh:50px" src="${product.imageUrl}" ></td>
      <td>
      <button class="btn btn-warning" onclick="editProductView(
        '${product.id}'
      )">Sửa</button>
      <button class="btn btn-danger" onclick="deleteProductView('${product.id}')">Xóa</button>
    </td>
        </tr>
          `;
    content += contentTr;
  }

  document.querySelector("#tablePhone").innerHTML = content;
}

function parseAPIList(list) {
  let resList = [];
  for (const iterator of list) {
    let { name, brand, price, imageUrl, qty, heading, des, id } = iterator;
    const tempObj = new products(
      name,
      brand,
      price,
      imageUrl,
      qty,
      heading,
      des,
      id
    );
    resList.push(tempObj);
  }
  return resList;
}

function retrieveFormData(id) {
  const name = getElement("#name").value;
  const brand = getElement("#type").value;
  const price = getElement("#price").value;
  const imageUrl = getElement("#imageUrl").value;
  const qty = getElement("#qty").value;
  const heading = getElement("#heading").value;
  const desc = getElement("#desc").value;
  return new products(name, brand, price, imageUrl, qty, heading, desc, id);
}

function validateFormData(name, brand, price, imageUrl, qty, heading, des) {
  let flag = true;
  //validate name
  flag &= kiemTraRong(name, "#tbname", "Vui lòng không để trống");
  //validate brand
  if (brand === "Hãng sản xuất") {
    flag &= false;
    showMessage("#tbtype", "Vui lòng chọn hãng sản xuất");
  }
  //validate price
  flag &= kiemTraSo(
    price,
    "#tbprice",
    "Vui lòng nhập đơn giá lớn hơn hoặc bằng 0."
  );
  //validate imageUrl
  flag &= kiemTraLink(
    imageUrl,
    "#tbimageUrl",
    "Vui lòng nhập đúng định dạng link"
  );
  //validate qty
  flag &= kiemTraSo(
    qty,
    "#tbqty",
    "Vui lòng nhập số lượng lớn hơn hoặc bằng 0."
  );
  //validate heading
  flag &= kiemTraRong(heading, "#tbheading", "Vui lòng không để trống");
  //validate des
  flag &= kiemTraRong(des, "#tbdesc", "Vui lòng không để trống");
  return flag;
}

function resetFormNoti()
{
    showMessage("#tbname", "");
    showMessage("#tbtype", "");
    showMessage("#tbprice", "");
    showMessage("#tbimageUrl", "");
    showMessage("#tbqty", "");
    showMessage("#tbheading", "");
    showMessage("#tbdesc", "");
}

export { renderProductsList, parseAPIList, retrieveFormData, validateFormData,resetFormNoti };
