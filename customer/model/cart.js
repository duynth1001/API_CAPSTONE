class cart {
  constructor(cartItemList) {
    this.cartItemList = cartItemList;
  }
  addCartItem(cartItem) {
    this.cartItemList.push(cartItem);
  }
  getSelectedCartList() {
    return this.cartItemList.map((ele) => {
      const { qty, name, imageUrl, price,id } = ele;
      const total = qty * price;
      return { qty, name, imageUrl, total,id };
    });
  }
 
}
export { cart };
