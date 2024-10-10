class LocalStorageService {
  
    constructor(key) {
      this.storage = window.localStorage;
      this.key = key;
    }
  
    appendListItem(obj) {
      const list = this.getItemValue();
      list.push(obj);
      this.setItemValue(list);
    }
  
    getItemValue() {
      return JSON.parse(this.storage.getItem(this.key)) || [];
    }
  
    getItemById(id) {
      const persons = this.getItemValue();
      return persons.find((person) => person.id === id);
    }
  
    setItemValue(value) {
      this.storage.setItem(this.key, JSON.stringify(value));
    }
  
    removeListItem(item) {
      const listObj = this.getItemValue();
      const index = listObj.indexOf(item);
      persons.splice(index, 1);
      this.setItemValue(persons);
    }
}