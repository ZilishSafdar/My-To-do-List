let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? "checked" : ""}>
      <span class="task-text">${task.text}</span>
      <div class="actions">
        <button onclick="deleteTask(${index})" title="Delete Task">
          🗑️
        </button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    updateStorage();
    input.value = "";
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateStorage();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateStorage();
  renderTasks();
}

function deleteAllTasks() {
  tasks = [];
  updateStorage();
  renderTasks();
}

function updateStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial rendering
renderTasks();

