const todoList = document.querySelector("#todoList");
const addTodo = document.querySelector("#addTodo");
const addTodoBtn = document.querySelector("#addTodoBtn");
const filterList = document.querySelector("#filterList");
const rmvDone = document.querySelector("#rmvDone");
const API = "http://localhost:4730/todos";
let todos = [];
addTodoBtn.addEventListener("click", addObj);
filterList.addEventListener("change", filterObj);
rmvDone.addEventListener("click", removeDone);
document.addEventListener("keypress", addObjByEnter);
getTodosAPI();
renderTodoList(todos);

function getTodosAPI() {
  fetch(API)
    .then((Response) => Response.json())
    .then((JSONData) => {
      todos = JSONData;
      renderTodoList(todos);
    });
}
function addTodoAPI(newTodo) {
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then((Response) => Response.json())
    .then((JSONData) => {
      todos.push(JSONData);
      renderTodoList(todos);
    });
}
function changeTodoAPI(id, updatedTodo) {
  fetch(API + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  })
    .then((Response) => Response.json())
    .then((JSONData) => {
      renderTodoList(todos);
    });
}
function deleteTodoAPI(id) {
  fetch(API + "/" + id, {
    method: "DELETE",
  })
    .then((Response) => Response.json())
    .then((JSONData) => {
      renderTodoList(todos);
    });
}
function renderTodoList(arr) {
  todoList.innerText = "";
  for (const currentTodo of arr) {
    const newLiEl = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = currentTodo.done;
    checkbox.todo = currentTodo;

    checkbox.addEventListener("click", changeState);

    const label = document.createElement("label");
    label.textContent = currentTodo.description;
    if (checkbox.checked) {
      newLiEl.style = "text-decoration: line-through;";
    }

    newLiEl.appendChild(checkbox);
    newLiEl.appendChild(label);
    todoList.appendChild(newLiEl);
  }
}
function addObj() {
  const newTodo = {};
  const actualTodo = trimValue(addTodo.value);
  if (duplicateCheck(actualTodo) || !actualTodo.length > 0) {
    addTodo.value = "";
    addTodo.focus();
    return;
  }
  newTodo.description = addTodo.value;
  newTodo.done = false;
  addTodoAPI(newTodo);
  addTodo.value = "";
  addTodo.focus();
}
function changeState(e) {
  const currentBox = e.target.todo;
  const currentID = currentBox.id;
  const updatedTodo = currentBox;
  currentBox.done = !currentBox.done;
  if (currentBox.done.checked) {
    e.target.parentElement.style = "text-decoration: none;";
  } else {
    e.target.parentElement.style = "text-decoration: line-through;";
  }
  changeTodoAPI(currentID, updatedTodo);
}
function duplicateCheck(actualDescription) {
  for (const currentTodo of todos) {
    if (currentTodo.description === actualDescription) {
      return true;
    }
  }
  return false;
}
function filterObj(e) {
  let filteredTodo = [];
  if (e.target.id === "open" && e.target.checked) {
    for (const currentTodo of todos) {
      if (!currentTodo.done) {
        filteredTodo.push(currentTodo);
      }
    }
  }
  if (e.target.id === "all" && e.target.checked) {
    for (const currentTodo of todos) {
      filteredTodo.push(currentTodo);
    }
  }
  if (e.target.id === "done" && e.target.checked) {
    for (const currentTodo of todos) {
      if (currentTodo.done) {
        filteredTodo.push(currentTodo);
      }
    }
  }
  renderTodoList(filteredTodo);
}
function removeDone() {
  let filteredTodo = [];
  for (const currentTodo of todos) {
    if (!currentTodo.done) {
      filteredTodo.push(currentTodo);
    } else {
      deleteTodoAPI(currentTodo.id);
    }
  }
  todos = filteredTodo;
}
function trimValue(input) {
  const trimmedInput = input.trim();
  return trimmedInput;
}
function addObjByEnter(e) {
  if (e.code === "Enter") {
    addObj();
  }
}
