import ListElement from './task';

class List { // eslint-disable-line no-unused-vars
  constructor() {
    this.todoList = [];
    if (localStorage.getItem('todoList') === null) {
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    } else {
      this.todoList = JSON.parse(localStorage.getItem('todoList'));
    }
  }

  addTask(description) {
    let newId;

    if (this.todoList.length === 0) {
      newId = 1;
    } else {
      newId = this.todoList[this.todoList.length - 1].index + 1;
    }

    this.todoList.push(new ListElement(description, false, newId));
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  getTasks() {
    return this.todoList;
  }

  getTaskInfo(index) {
    return this.todoList[index - 1];
  }

  updateTask(id, description) {
    this.todoList[id - 1].description = description;
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  removeTask(id) {
    const indexToRemove = this.todoList.findIndex((element) => element.index === id);

    this.todoList.splice(indexToRemove, 1);
    this.updateIds();
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  toggle(id) {
    this.todoList[id - 1].completed = !this.todoList[id - 1].completed;
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  clearCompleted() {
    const pendingTasks = this.todoList.filter((task) => !task.completed);
    this.todoList = pendingTasks;
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  updateIds() {
    for (let i = 0; i < this.todoList.length; i++) { // eslint-disable-line no-plusplus
      this.todoList[i].index = i + 1;
    }
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}

export default List;
