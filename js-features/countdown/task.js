const timerElement = document.getElementById('timer');
// Получаем элемент страницы, в котором отображается значение таймера

let counter = parseInt(timerElement.textContent, 10);
// Считываем начальное значение таймера в секундах и преобразуем его в число

function formatTime(seconds) {
    // Функция форматирования времени в формат hh:mm:ss

    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    // Вычисляем количество часов и приводим к двузначному виду

    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    // Вычисляем количество минут и приводим к двузначному виду

    const secs = String(seconds % 60).padStart(2, '0');
    // Вычисляем количество секунд и приводим к двузначному виду

    return `${hours}:${minutes}:${secs}`;
    // Возвращаем строку времени в формате hh:mm:ss
}

timerElement.textContent = formatTime(counter);
// Отображаем начальное время в формате hh:mm:ss

const intervalId = setInterval(() => {
    // Запускаем таймер с интервалом 1 секунда

    counter--;
    // Уменьшаем значение таймера на 1 секунду

    timerElement.textContent = formatTime(counter);
    // Обновляем отображаемое значение таймера в формате hh:mm:ss

    if (counter <= 0) {
        // Проверяем, закончилось ли время обратного отсчёта

        clearInterval(intervalId);
        // Останавливаем таймер

        alert('Вы победили в конкурсе!');
        // Показываем сообщение о завершении отсчёта
    }
}, 1000);
// Интервал выполнения функции — 1000 мс (1 секунда)
