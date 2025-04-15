/**
 * @typedef Task
 * @type {object}
 * @property {string} id id task
 * @property {string} task input task
 */

/** @type {Task[]} */
let tasks = [];

/**
 * Agrega una tarea.
 * @param {Task} newTask New Task
 */
const addTask = (newTask) => {
  tasks = tasks.concat(newTask);
};

/** Guarda las tareas en el navegador */
const saveInBrowser = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

/** Obtiene los contactos del navegador */
const getTasksFromLocalStorage = () => {
  const tasksLocalStorage = localStorage.getItem("tasks");
  tasks = JSON.parse(tasksLocalStorage) ?? [];
};

/** Renderiza las tareas en el HTML
 * @param {Element} list La lista a la cual se van a agregar los contactos en el HTML
 */
const renderTasks = (list) => {
  // Borrar todo el html del ul para empezar desde 0
  list.innerHTML = "";
  tasks.forEach((task) => {
    // 1. Crear el elemento li
    const li = document.createElement("li");
    // 2. Agregarle la clase
    li.classList.add("task-item");
    // Agregarle la id al li
    li.id = task.id;
    // 3. Crear el elemento en si
    li.setAttribute("status", task.status);

    const isDone = task.status === "hecho";

    const deleteBtn = `
      <button class="task-delete-btn">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 7C5.72146 7 5.45554 7.11618 5.26628 7.32055C5.07702 7.52492 4.98158 7.79897 5.00295 8.0767L5.78988 18.3068C5.95019 20.3908 7.68795 22 9.7781 22H14.2219C16.3121 22 18.0498 20.3908 18.2101 18.3068L18.9971 8.0767C19.0184 7.79897 18.923 7.52492 18.7337 7.32055C18.5445 7.11618 18.2785 7 18 7H6Z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 2.99999L19 3C19.5523 3 20 3.44772 20 4C20 4.55228 19.5523 5 19 5H5C4.44772 5 4 4.55228 4 4C4 3.44772 4.44772 3 5 3H8V2.99999L9.84479 2.99999C10.2321 2.99999 10.5939 2.8064 10.8087 2.4841C11.3754 1.63404 12.6246 1.63405 13.1913 2.4841C13.4061 2.8064 13.7679 2.99999 14.1552 2.99999L16 2.99999Z"
            ></path>
          </g>
        </svg>
      </button>
    `;
    const taskDescription = `
      <p class="task-text ${isDone ? "task-text-check" : ""}">${task.task}</p>
    `;
    const checkBtn = `
      <button class="${isDone ? "task-check-btn" : "task-check-btn-none"}">
        <svg
          fill="#ffffff"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M351.605 663.268l481.761-481.761c28.677-28.677 75.171-28.677 103.847 0s28.677 75.171 0 103.847L455.452 767.115l.539.539-58.592 58.592c-24.994 24.994-65.516 24.994-90.51 0L85.507 604.864c-28.677-28.677-28.677-75.171 0-103.847s75.171-28.677 103.847 0l162.25 162.25z"
            ></path>
          </g>
        </svg>
      </button>
    `;
    li.innerHTML = `
    ${deleteBtn}
    ${taskDescription}
    ${checkBtn}
  `;
    // 4. Agregar a la lista
    list.append(li);
  });
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
};

/**
 * Actualiza el estado de una tarea por su id.
 * @param {string} id - El id de la tarea.
 * @param {"hecho" | "pendiente"} newStatus - El nuevo estado.
 */
const updateStatus = (id, newStatus) => {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, status: newStatus } : task
  );
};

/**
 * Cuenta y devuelve estadísticas de tareas.
 * @returns {{ total: number, completadas: number, pendientes: number }}
 */
const getTaskStats = () => {
  const total = tasks.length;
  const completadas = tasks.filter((task) => task.status === "hecho").length;
  const pendientes = total - completadas;
  return { total, completadas, pendientes };
};

export {
  addTask,
  saveInBrowser,
  renderTasks,
  getTasksFromLocalStorage,
  deleteTask,
  updateStatus,
  getTaskStats,
};
