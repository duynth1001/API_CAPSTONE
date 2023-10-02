import { getElement } from "./util.js";
function showMessage(idTag, message) {
  getElement(idTag).innerHTML = message;
  getElement(idTag).style.display = "block";
}

function kiemTraRong(value, idTag, message) {
  if (value.trim() == "") {
    showMessage(idTag, message);
    return false;
  } else {
    showMessage(idTag, "");
    return true;
  }
}
function kiemTraSo(value, idTag, message) {
  const re = /^[0-9]+$/;

  var isString = re.test(value);
  if (isString) {
    showMessage(idTag, "");
    return true;
  } else {
    showMessage(idTag, message);
    return false;
  }
}

function kiemTraLink(value, idTag, message) {
  const re =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  var isString = re.test(value);
  if (isString) {
    showMessage(idTag, "");
    return true;
  } else {
    showMessage(idTag, message);
    return false;
  }
}

export {showMessage,kiemTraRong,kiemTraSo,kiemTraLink}