const todoList = [{
  name:'make dinner',
  dueDate: '2025-07-07'
}, {
  name:'wash dishes',
dueDate:'2025-07-07'
}];

function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
    const { name, dueDate } = todoList[i];
      //const name=todoObject.name;
      //const dueDate: todoObject.dueDate;
      const html = `
        <div class="todo-grid">
          <div>${name}</div>
          <div>${dueDate}</div>
          <button onclick="
            todoList.splice(${i}, 1);
            renderTodoList();
          ">Delete</button>
        </div>
      `;

      todoListHTML += html;
    }


    document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
    }


    function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim(); // trimming spaces

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name === '' || dueDate === '') {
    alert("Please fill both fields before adding!");
    return; // 🛑 Stop here
  }

  todoList.push({ name, dueDate });

  inputElement.value = '';
  dateInputElement.value = ''; // optional: reset date input too

  renderTodoList();
}
