// Write to local
function wirteLocal(cartList, localDB) {
  localStorage.setItem(localDB, JSON.stringify(cartList));
}
//read from local
function readLocal(jsonData) {
  return JSON.parse(jsonData).cartItemList.map((item) => {
    const { id, imageUrl, name, price, qty } = item;
    return {
      id,
      imageUrl,
      name,
      price,
      qty,
    };
  });

}
export { wirteLocal, readLocal };
