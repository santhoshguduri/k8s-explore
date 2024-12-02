
function getItem(key) {
  return JSON.parse(window.localStorage.getItem(key)) || '';
}

function setItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function deleteItem(key) {
  window.localStorage.removeItem(key)
}

export default {
  getItem,
  setItem,
  deleteItem
}