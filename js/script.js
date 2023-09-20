function addTodo() {
    const text = document.getElementById('new-todo').value;
    const todo = {
        text,
        completed: false,
        highlighted: false
    };

    const list = getTodoList();
    list.push(todo);
    saveTodoList(list);

    renderTodoList();

    document.getElementById('new-todo').value = '';
}

function completeSelected() {
    const list = getTodoList();

    list.forEach(todo => {
        if (todo.highlighted) {
            todo.completed = true;
        }
    });

    saveTodoList(list);
    renderTodoList();
}

function deleteSelected() {
    let list = getTodoList();
    list = list.filter(todo => !todo.highlighted);

    saveTodoList(list);
    renderTodoList();
}

function highlightEven() {
    const list = getTodoList();

    list.forEach((todo, index) => {
        if (index % 2 == 0) {
            todo.highlighted = true;
        } else {
            todo.highlighted = false;
        }
    });

    saveTodoList(list);
    renderTodoList();
}

function highlightOdd() {
    const list = getTodoList();

    list.forEach((todo, index) => {
        if (index % 2 != 0) {
            todo.highlighted = true;
        } else {
            todo.highlighted = false;
        }
    });

    saveTodoList(list);
    renderTodoList();
}

function getTodoList() {
    const listJSON = localStorage.getItem('todoList');
    return listJSON ? JSON.parse(listJSON) : [];
}

function saveTodoList(list) {
    localStorage.setItem('todoList', JSON.stringify(list));
}

function renderTodoList() {
    const list = getTodoList();

    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    list.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo');
        li.innerText = todo.text;

        if (todo.completed) {
            li.classList.add('completed');
        }

        if (todo.highlighted) {
            li.classList.add('highlighted');
        }

        li.onclick = () => {
            todo.highlighted = !todo.highlighted;
            saveTodoList(list);
            renderTodoList();
        }

        todoList.appendChild(li);
    });
}