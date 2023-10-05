const getElement = (id) => document.querySelector(id);
function findIndex(id,list) {
    return list.findIndex((ele) => {
      return ele.id == id;
    });
  }
function totalMoneyOfCart(list){
  return list.reduce(
    (total, num)=>{
      return total + num.total;
    },0
  )
}
export { getElement,findIndex,totalMoneyOfCart };
