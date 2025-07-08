let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const { name, dueDate } = todoList[i];
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-button" onclick="
        deleteTodo(${i});
      ">❌ Delete</button>
    `;

    todoListHTML += `<div class="todo-grid">${html}</div>`;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

// Delete logic extracted out for reusability
function deleteTodo(index) {
  todoList.splice(index, 1);
  saveToLocalStorage();
  renderTodoList();
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim();

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name === '' || dueDate === '') {
    alert("Please fill both fields before adding!");
    return;
  }

  todoList.push({ name, dueDate });

  inputElement.value = '';
  dateInputElement.value = '';

  saveToLocalStorage();
  renderTodoList();
}

function saveToLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Initial render on page load
renderTodoList();

const calendarInput = document.querySelector('.js-calendar-picker');
const dateTasksContainer = document.querySelector('.js-date-tasks');

// Listen for date selection
calendarInput.addEventListener('change', () => {
  const selectedDate = calendarInput.value;
  const filteredTasks = todoList.filter(task => task.dueDate === selectedDate);

  if (filteredTasks.length === 0) {
    dateTasksContainer.innerHTML = `<p>No tasks on this date.</p>`;
    return;
  }

  let html = `<ul>`;
  filteredTasks.forEach(task => {
    html += `<li>${task.name}</li>`;
  });
  html += `</ul>`;

  dateTasksContainer.innerHTML = html;
});
