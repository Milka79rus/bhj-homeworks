const taskForm = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');

// 1. Функция для сохранения состояния в localStorage
const updateStorage = () => {
    const tasks = Array.from(document.querySelectorAll('.task__title'))
        .map(el => el.innerText);
    localStorage.setItem('todo_list', JSON.stringify(tasks));
};

// 2. Функция создания задачи
const createTask = (text) => {
    // Создаем контейнер задачи
    const task = document.createElement('div');
    task.className = 'task';

    // Наполняем его
    task.innerHTML = `
        <div class="task__title">${text}</div>
        <a href="#" class="task__remove">&times;</a>
    `;

    // Реализуем удаление (согласно условию: один обработчик на новый элемент)
    const removeBtn = task.querySelector('.task__remove');
    removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        task.remove();
        updateStorage(); // Сохраняем изменения после удаления
    });

    // Добавляем в список
    tasksList.append(task);
};

// 3. Обработка добавления новой задачи
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы

    const title = taskInput.value.trim();
    if (title) {
        createTask(title);
        updateStorage(); // Сохраняем изменения после добавления
        taskInput.value = ''; // Очищаем поле ввода
    }
});

// 4. Загрузка задач при открытии страницы 
window.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('todo_list')) || [];
    savedTasks.forEach(text => createTask(text));
});