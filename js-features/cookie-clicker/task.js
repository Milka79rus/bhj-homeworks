// Получаем элементы страницы
const cookie = document.getElementById('cookie'); // печенька
const counterElement = document.getElementById('clicker__counter'); // количество кликов

// Создаём элемент для отображения скорости клика
const speedElement = document.createElement('div');
speedElement.style.marginTop = '10px';
speedElement.textContent = 'Скорость клика: 0';
document.querySelector('.clicker').appendChild(speedElement);

// Инициализация переменных
let counter = 0;
let shrink = false;
let lastClickTime = null;

// Обработчик клика по печеньке
cookie.addEventListener('click', () => {
    // 1️ Увеличиваем счётчик
    counter++;
    counterElement.textContent = counter;

    // 2️ Анимация: уменьшаем или увеличиваем печеньку
    if (shrink) {
        cookie.style.transform = 'scale(1)'; // обычный размер
    } else {
        cookie.style.transform = 'scale(0.9)'; // немного меньше
    }
    shrink = !shrink;

    // 3️ Рассчитываем скорость клика (клики в секунду)
    const now = new Date();
    if (lastClickTime) {
        const deltaSeconds = (now - lastClickTime) / 1000; // разница во времени в секундах
        const cps = (1 / deltaSeconds).toFixed(2); // клики в секунду, 2 знака после запятой
        speedElement.textContent = `Скорость клика: ${cps} кликов/сек`;
    }
    lastClickTime = now;
});
