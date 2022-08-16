const form = document.getElementById("new-task-form");
const input = document.getElementById("new-task-input");
const list = document.getElementById("tasks");
const ls = new LocalStorage("myTask");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTasks();
  disabledAddTask()
});

function deleteNode(node) {
  const toDelete = document.getElementById(node);
  while (toDelete.firstChild) {
    toDelete.removeChild(toDelete.firstChild);
  }
  toDelete.parentElement.removeChild(toDelete);
  taskCount = taskCount - 1;
  //taskCount--;
}

let taskCount = 0;
let deleteAllButton_visible = false;

function displayTasks() {
  let tareas = ls.getFromLocalStorage(); 
  if (tareas !== null) {
    for (let tarea of tareas) {
      createDivTasks(tarea);
    }
  }
}

//Delete All Button
function createDeleteAll() {
  const task_section = document.getElementById("task_list_id");

  const delete_all_el = document.createElement("div");
  delete_all_el.setAttribute("id", "delete_All_Container");
  delete_all_el.classList.add("contain_deleteAll");

  const delete_all_contain = document.createElement("div");
  delete_all_contain.classList.add("deleteAll");

  const delete_all_button = document.createElement("button");
  delete_all_button.setAttribute("id", "delete_All");
  delete_all_button.classList.add("deleteAllButton");
  delete_all_button.innerText = "Delete all tasks";

  task_section.appendChild(delete_all_el);
  delete_all_el.appendChild(delete_all_contain);
  delete_all_contain.appendChild(delete_all_button);

  deleteAllButton_visible = true;

  delete_all_button.addEventListener("click", () => {
    deleteAllTasks();

    taskCount = 0;
    deleteAllButton_visible = false;
  });
}

function deleteAllTasks() {
  const delete_all_el = document.getElementById("delete_All_Container");
  const taskToDelete = document.getElementsByClassName("task");

  if (confirm("Are you sure you want to delete all tasks?")) {
    Array.from(taskToDelete).forEach((task) => {
      task.remove();
    });

    delete_all_el.remove();
    ls.deleteAllTasksFromLs("myTask");
  }
}

function disabledAddTask() {
  const addTask = document.getElementById("new-task-submit");

  if (taskCount >= 7) {
    addTask.disabled = true;
  } else if (taskCount < 3){
    const delete_all_el = document.getElementById("delete_All_Container");
    addTask.disabled = false;
    deleteAllButton_visible = false
    if(delete_all_el){
      delete_all_el.remove();
    } 
  }else{
    addTask.disabled = false;
  }
  console.log(taskCount);
}

function createDivTasks(task) {
  const task_el = document.createElement("div");
  task_el.classList.add("task");
  task_el.setAttribute("id", task.id);
  taskCount = taskCount + 1;

  const task_content_el = document.createElement("input");
  task_content_el.classList.add("content");
  task_content_el.value = task.texto;
  task_content_el.setAttribute("readonly", "readonly");

  task_el.appendChild(task_content_el);
  list.appendChild(task_el);

  // Acctions
  const task_actions_el = document.createElement("div");
  task_actions_el.classList.add("actions");

  // Edit button
  const task_edit_el = document.createElement("button");
  task_edit_el.setAttribute("id", "edit");
  task_edit_el.classList.add("button");
  task_edit_el.innerText = "Edit";

  // Tik button
  const task_tik_el = document.createElement("button");
  task_tik_el.setAttribute("id", "done");
  task_tik_el.classList.add("button");
  task_tik_el.innerText = "✔";
  task_tik_el.addEventListener("click", () => {
    task_tik_el.parentElement.parentElement.style.backgroundColor = "#4fba22d6";
    var local = new Date();
    if (!task_content_el.value.includes("➜ FINISHED:")) {
      const taskdone =
        (task_tik_el.parentElement.parentElement.firstChild.value += ` ➜ FINISHED: ${local.getDay()}/${local.getMonth()}/${local.getFullYear()}`);
    }

    const task_finalizada = {
      id: task_content_el.parentElement.getAttribute("id"),
      texto: task_content_el.value,
      estado: "finalizado",
    }

    ls.editTasktoLs(task_finalizada , "finished");
  });

  // Delete button
  const task_delete_el = document.createElement("button");
  task_delete_el.setAttribute("id", "delete");
  task_delete_el.classList.add("button");
  task_delete_el.innerText = "X";
  task_delete_el.addEventListener("click", () => {
    
    let result = confirm("are you sure you want to delete this task?");
    if (result === true) {
      deleteNode(task.id);
      ls.deleteItemFromLs(task.id);
      disabledAddTask() 
    } else {
      return;
    }
    
  });

  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_tik_el);
  task_actions_el.appendChild(task_delete_el);
  task_el.appendChild(task_actions_el);

  //Edit Button actions
  task_edit_el.addEventListener("click", () => {
    if (task_edit_el.innerText.toLocaleLowerCase() == "edit") {
      task_content_el.removeAttribute("readonly");
      task_content_el.focus();
      task_edit_el.innerText = "Save";
      task_tik_el.parentElement.parentElement.style.backgroundColor = "#503394";
    } else {
      task_tik_el.parentElement.parentElement.style.backgroundColor =
        " #19233b";
      task_content_el.setAttribute("readonly", "readonly");
      task_edit_el.innerText = "Edit";

      const task_editada = {
        id : task_content_el.parentElement.getAttribute("id"),
        texto : task_content_el.value,
        estado : "disponible"
      }
      ls.addeditTasktoLs(task_editada, "edit");
    }
  });

  if (deleteAllButton_visible == false && taskCount > 2) {
    console.log("creATE")
    createDeleteAll();
  }
}

function addTasks() {
  const text = input.value;
  if (!text.trim()) {
    alert("Please fill out the task");
    return;
  }

  input.value = "";
  const key = `${input.value}${Math.random() * 10}}`;

  const taskToLocalStorage = {
    id: key,
    texto: text,
    estado: "disponible",
  };

  ls.saveToLocalStorage(taskToLocalStorage);
  createDivTasks(taskToLocalStorage);
}

window.addEventListener("load", () => {
  displayTasks();
});
