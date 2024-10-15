
function appendListItem(key, obj) {
  const list = this.getItemValue(key);
  list.push(obj);
  this.setItemValue(list);
}

function getItemValue(key) {
  return JSON.parse(window.localStorage.getItem(key)) || [];
}

function getItemById(key, id) {
  const list = this.getItemValue(key);
  return list.find((person) => person.id === id);
}

function setItemValue(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeListItem(key, item) {
  const listObj = this.getItemValue(key);
  const index = listObj.indexOf(item);
  listObj.splice(index, 1);
  this.setItemValue(key, listObj);
}

export default {
  appendListItem,
  getItemValue,
  getItemById,
  setItemValue,
  removeListItem
}