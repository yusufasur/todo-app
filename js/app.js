const newTaskBtn = document.querySelector("#liveToastBtn");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#list");

taskList.addEventListener("click", changeTodoStatus);
newTaskBtn.addEventListener("click", createTodo);
document.addEventListener("DOMContentLoaded", readTodos);

function createTodo() {
  if (taskInput.value.trim()) {
    let li = document.createElement("li");
    li.textContent = taskInput.value;
    taskList.appendChild(li);

    let todos;
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem("todos"));
    } else {
      todos = [];
    }

    todos.push(taskInput.value);
    taskInput.value = "";

    localStorage.setItem("todos", JSON.stringify(todos));

    $(".toast.success").toast("show");
  } else {
    $(".toast.error").toast("show");
  }
}

function readTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = item;
    taskList.appendChild(li);
  });
}

function changeTodoStatus(e) {
  e.target.classList.toggle("checked");

  setTimeout(() => {
    let todos;

    todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter((item) => item !== e.target.textContent);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.remove();
  }, 2000);
}
