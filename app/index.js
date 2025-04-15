import * as Tasks from "./task.js";

const inputTask = document.querySelector("#form-input-task");
const btnForm = document.querySelector(".form-btn");
const taskList = document.querySelector("#task-list");

const updateTaskStatsInDOM = () => {
  const stats = Tasks.getTaskStats();

  document.getElementById("task-total").textContent = `Total: ${stats.total}`;
  document.getElementById(
    "task-completed"
  ).textContent = `Completadas: ${stats.completadas}`;
  document.getElementById(
    "task-incompleted"
  ).textContent = `Pendientes: ${stats.pendientes}`;
};
// Eventos

inputTask.addEventListener("input", (e) => {
  const helperText = inputTask.nextElementSibling;
  if (inputTask.value === "") {
    btnForm.classList.add("form-btn-disabled");
    helperText.classList.add("show-helper-text");
    btnForm.disabled = true;
  } else {
    helperText.classList.remove("show-helper-text");
    btnForm.classList.remove("form-btn-disabled");
    btnForm.disabled = false;
  }
});

btnForm.addEventListener("click", (e) => {
  e.preventDefault();
  // 1. Validación
  if (inputTask.value === "") return;
  // 2. Obtener la task ingresada
  const task = inputTask.value;
  // 3. Asignar un id a la task
  const id = crypto.randomUUID();
  const status = "pendiente";
  // 4. Estructurar el objeto task
  const newTask = { id, task, status };
  // 5. Agregar al array de tasks
  Tasks.addTask(newTask);
  // 6. Guardar en el browser
  Tasks.saveInBrowser();
  // 7. Renderizar en el navegador
  Tasks.renderTasks(taskList);
  Tasks.saveInBrowser();
  updateTaskStatsInDOM();
});

taskList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".task-delete-btn");
  const checkBtn = e.target.closest(".task-check-btn, .task-check-btn-none");

  if (deleteBtn) {
    const li = deleteBtn.closest("li");
    Tasks.deleteTask(li.id);
    Tasks.saveInBrowser();
    Tasks.renderTasks(taskList);
    updateTaskStatsInDOM();
  }

  if (checkBtn) {
    const li = checkBtn.closest("li");
    const status = li.getAttribute("status");

    const checkTask = li.querySelector(".task-text");
    const btnCheck = checkBtn;

    if (status === "hecho") {
      li.setAttribute("status", "pendiente");
      checkTask.classList.remove("task-text-check");
      btnCheck.classList.remove("task-check-btn");
      btnCheck.classList.add("task-check-btn-none");
    } else {
      li.setAttribute("status", "hecho");
      checkTask.classList.add("task-text-check");
      btnCheck.classList.remove("task-check-btn-none");
      btnCheck.classList.add("task-check-btn");
    }

    Tasks.updateStatus(li.id, li.getAttribute("status"));
    Tasks.saveInBrowser();
    updateTaskStatsInDOM();
  }
});

window.onload = () => {
  Tasks.getTasksFromLocalStorage();
  Tasks.renderTasks(taskList);
  updateTaskStatsInDOM();
};
