import { getProductList, getProductByID } from "../services/productServices.js";
import {
  renderProductsList,
  renderSpecificProductsList,
  renderSelectedCartList,
} from "../controller/viewController.js";
import { getElement, findIndex, totalMoneyOfCart } from "../utils/utils.js";
import { cartItem } from "../model/cartItem.js";
import { cart } from "../model/cart.js";
import { wirteLocal,readLocal } from "../controller/readWriteToLocal.js";
const Cart_Local = "Cart_Local";
let cartListGlobal = new cart([]);
// read from local
var jsonData = localStorage.getItem(Cart_Local);
if (jsonData != null) {
  cartListGlobal =new cart(readLocal(jsonData));
}
//render product list
function fetchProductsList() {
  getProductList()
    .then(function (res) {
      renderProductsList(res.data);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}
fetchProductsList();

//render selected list
getElement("#selectList").onchange = () => {
  let selectValue = getElement("#selectList").value;
  getProductList()
    .then(function (res) {
      let renderList = renderSpecificProductsList(selectValue, res.data);
      renderProductsList(renderList);
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

//add product to cart
window.addProduct = (id) => {
  getProductByID(id)
    .then(function (res) {
      const { name, imageUrl, price, id } = res.data;
      const item = new cartItem(price, imageUrl, name, id);
      if (cartListGlobal.cartItemList.length == 0) {
        item.qty++;
        cartListGlobal.addCartItem(item);
        //write to local 
        wirteLocal(cartListGlobal,Cart_Local)
      } else {
        let foundIndex = findIndex(id, cartListGlobal.cartItemList);
        if (foundIndex != -1) {
          cartListGlobal.cartItemList[foundIndex].qty++;
           //write to local 
        wirteLocal(cartListGlobal,Cart_Local)
        } else {
          item.qty++;
          cartListGlobal.addCartItem(item);
           //write to local 
        wirteLocal(cartListGlobal,Cart_Local)
        }
      }
      alert(
        "Thêm vào giỏ hàng thành công! Vui lòng kiểm tra giỏ hàng của bạn."
      );
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

//render cart list

getElement("#navbarColor01").onclick = () => {
  let cartListLocal = cartListGlobal.getSelectedCartList();
  //Total money
  getElement("#priceTotal").innerHTML = `${totalMoneyOfCart(cartListLocal)}$`;
  //write to local 
  wirteLocal(cartListGlobal,Cart_Local)
  renderSelectedCartList(cartListLocal);
};

//remove item from cart
window.removeCartItem = (id) => {
  let cartListLocal = cartListGlobal.getSelectedCartList();
  const index = findIndex(id, cartListLocal);
  if (index != -1) {
    cartListGlobal.cartItemList.splice(index, 1);
    cartListLocal.splice(index, 1);
      //Total money
  getElement("#priceTotal").innerHTML = `${totalMoneyOfCart(cartListLocal)}$`;
  //write to local 
  wirteLocal(cartListGlobal,Cart_Local)
 renderSelectedCartList(cartListLocal);
  }

};

//add item quantity
window.addItemQty = (id) => {
  let cartListLocal= cartListGlobal.getSelectedCartList();
  const index = findIndex(id, cartListLocal);
  if (index != -1) {
    cartListGlobal.cartItemList[index].qty++;
    cartListLocal = cartListGlobal.getSelectedCartList();
      //Total money
  getElement("#priceTotal").innerHTML = `${totalMoneyOfCart(cartListLocal)}$`;
  //write to local 
  wirteLocal(cartListGlobal,Cart_Local)
 renderSelectedCartList(cartListLocal);
  }

};

//minus item quantity
window.minusItemQty = (id) => {
  let cartListLocal = cartListGlobal.getSelectedCartList();
  const index = findIndex(id, cartListLocal);
  if (index != -1) {
    if (cartListGlobal.cartItemList[index].qty == 0) {
      return;
    }
    cartListGlobal.cartItemList[index].qty--;
    cartListLocal = cartListGlobal.getSelectedCartList();
      //Total money
  getElement("#priceTotal").innerHTML = `${totalMoneyOfCart(cartListLocal)}$`;
    //write to local 
    wirteLocal(cartListGlobal,Cart_Local)
  renderSelectedCartList(cartListLocal);
  }

};

//empty cart
window.emptyCart = () => {
  cartListGlobal.cartItemList = [];
  //Total money
  getElement("#priceTotal").innerHTML = `0$`;
    //write to local 
    wirteLocal(cartListGlobal,Cart_Local)
  renderSelectedCartList([]);
};

//pay 
window.payNow = ()=>{
  alert('Xin cảm ơn quý khách đã tin tưởng Cyber Phone! Đơn hàng của quý khách đang được xử lý, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.')
  cartListGlobal.cartItemList = [];
  //Total money
  getElement("#priceTotal").innerHTML = `0$`;
    //write to local 
    wirteLocal(cartListGlobal,Cart_Local)
  renderSelectedCartList([]);
}

