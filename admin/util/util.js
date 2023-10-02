const getElement = (id) => document.querySelector(id);
function findObjByName(name, list) {
  return list.filter((ele) => {
    return ele.name.trim().toLowerCase() === name;
  });
}

function findObjById(id, list) {
  return list.find((ele) => {
    return ele.id === id;
  });
}

function sortAsc(list) {
  list.sort(function (a, b) {
    return a.price - b.price;
  });
}
function sortDsc(list) {
  list.sort(function (a, b) {
    return b.price - a.price;
  });
}

export { getElement, findObjByName, findObjById, sortAsc, sortDsc };
