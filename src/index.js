import _ from 'lodash'; // eslint-disable-line no-unused-vars
import './style.css';
import List from './list';

const mainList = new List();

function refreshList() {
  const listContainer = document.getElementById('todoList');
  listContainer.innerHTML = '';

  const ul = document.createElement('ul');
  const listToDraw = mainList.getTasks();
  for (let i = 0; i < listToDraw.length; i++) { // eslint-disable-line no-plusplus
    const box = document.createElement('input');
    box.setAttribute('type', 'checkbox');
    box.setAttribute('class', 'checkbox');
    box.setAttribute('id', `b${listToDraw[i].index}`);
    box.checked = listToDraw[i].completed;

    const options = document.createElement('div');
    options.setAttribute('class', 'options');

    const trash = document.createElement('i');
    trash.setAttribute('class', 'fas fa-trash');
    trash.setAttribute('id', `d${listToDraw[i].index}`);

    const textContainer = document.createElement('div');
    textContainer.setAttribute('class', 'inputs');
    textContainer.textContent = listToDraw[i].description;

    const element = document.createElement('li');

    const edit = document.createElement('i');
    edit.setAttribute('class', 'fas fa-edit');
    edit.setAttribute('id', `e${listToDraw[i].index}`);

    options.appendChild(edit);
    options.appendChild(trash);

    element.setAttribute('class', 'listElement');

    element.appendChild(box);
    element.appendChild(textContainer);
    element.appendChild(options);

    ul.append(element);
  }

  listContainer.appendChild(ul);
}

function addBoxListeners() {
  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((el) => el.addEventListener('click', () => {
    mainList.toggle(parseInt(el.id.substring(1), 10));
  }));
}

function addSaveListener() {
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', () => {
    const description = document.getElementById('taskDescription').value;
    mainList.addTask(description);
    refresh();// eslint-disable-line no-use-before-define
    document.getElementById('taskDescription').value = '';
  });
}

function addClearListener() {
  const clear = document.getElementById('clear');
  clear.addEventListener('click', () => {
    mainList.clearCompleted();
    refresh();// eslint-disable-line no-use-before-define
  });
}

function addDeleteListeners() {
  const deleteButton = document.querySelectorAll('.fa-trash');
  deleteButton.forEach((el) => el.addEventListener('click', () => {
    mainList.removeTask(parseInt(el.id.substring(1), 10));
    refresh(); // eslint-disable-line no-use-before-define
  }));
}

function addEditListeners() {
  const editButton = document.querySelectorAll('.fa-edit');
  editButton.forEach((el) => el.addEventListener('click', () => {
    const task = mainList.getTaskInfo(parseInt(el.id.substring(1), 10));

    const updateButton = document.getElementById('updateButton');
    updateButton.style.display = 'block';

    const form = document.getElementById('form');
    form.setAttribute('taskNumber', task.index);

    document.getElementById('saveButton').style.display = 'none';

    document.getElementById('taskDescription').value = task.description;

    refresh(); // eslint-disable-line no-use-before-define
    addUpdateListener();// eslint-disable-line no-use-before-define
  }));
}

function addUpdateListener() {
  const updateButton = document.getElementById('updateButton');
  updateButton.addEventListener('click', () => {
    const description = document.getElementById('taskDescription').value;
    const form = document.getElementById('form');
    const indexToUpdate = parseInt(form.getAttribute('tasknumber'), 10);
    mainList.updateTask(indexToUpdate, description);
    refresh();// eslint-disable-line no-use-before-define
    document.getElementById('taskDescription').value = '';
  });
}

function refresh() {
  refreshList();
  addBoxListeners();
  addDeleteListeners();
  addEditListeners();
}

window.onload = () => {
  refreshList();
  addSaveListener();
  addBoxListeners();
  addDeleteListeners();
  addEditListeners();
  addClearListener();
};
