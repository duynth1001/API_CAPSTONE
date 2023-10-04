function renderProductsList(productsList) {
  let content = "";
  for (const product of productsList) {
    let contentTr = `
  <div class="card" style="width: 15rem;">
  <img class="card-img-top" src="${product.imageUrl}" >
  <div class="card-body">
  <span> <strong> ${product.name}</strong></span>
  <br>
  <span>${product.des}</span>
  <br>
  <span><i>Giá</i>: ${product.price}$</span>
  <br>
  <button class="btn btn-warning text-light bg-dark"  onclick="addProduct(${product.id})">Thêm vào giỏ hàng</button>
  </div>
</div>
        `;
    content += contentTr;
  }

  document.querySelector("#phoneList").innerHTML = content;
}

function filterList(brandName, list) {
  return list.filter((ele) => {
    return ele.brand === brandName;
  });
}

function renderSpecificProductsList(flag, productsList) {
  if (flag === "Samsung") {
    return filterList("Samsung", productsList);
  }
  if (flag === "Apple") {
    return filterList("Apple", productsList);
  }
  return productsList;
}

function renderSelectedCartList(cartList) {
  let content = "";
  for (const cart of cartList) {
    let contentTr = `
    <div class="container">
    <div class="media border p-3">
      <img src="${cart.imageUrl}"  class="mr-3 mt-3" style="width:30%;">
      <div class="media-body">
        <h4>Tên sản phẩm: ${cart.name} </h4>
        <p>Số lượng: ${cart.qty}</p>    
        <p>Tổng tiền: ${cart.total}$</p>    
        <button  class="trashQuantity" onclick='removeCartItem(${cart.id})'><i class="fas fa-trash"></i></button>	 
        <button class="increaseQuantity" onclick='addItemQty(${cart.id})'><i class="fa-solid fa-plus"></i></button>
        <button class="decreaseQuantity" onclick='minusItemQty(${cart.id})'><i class="fa-solid fa-minus"></i></button> 	  
      </div>
    </div>
  </div>
        `;
    content += contentTr;
  }

  document.querySelector("#cartList").innerHTML = content;
}

export { renderProductsList };
export { renderSpecificProductsList };
export { renderSelectedCartList };
