// Получаем элементы для отображения статистики
const deadElement = document.getElementById('dead');
const lostElement = document.getElementById('lost');

let dead = 0; // убито кротов
let lost = 0; // промахи

// Функция для получения лунки по индексу
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Назначаем обработчики клика на все лунки
for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);

    hole.addEventListener('click', () => {
        if (hole.classList.contains('hole_has-mole')) {
            // Попадание
            dead++;
            deadElement.textContent = dead;
        } else {
            // Промах
            lost++;
            lostElement.textContent = lost;
        }

        // Проверка победы
        if (dead >= 10) {
            alert(`Вы победили! Убито кротов: ${dead}`);
            dead = 0;
            lost = 0;
            deadElement.textContent = dead;
            lostElement.textContent = lost;
        }

        // Проверка поражения
        if (lost >= 5) {
            alert(`Вы проиграли! Убито кротов: ${dead}`);
            dead = 0;
            lost = 0;
            deadElement.textContent = dead;
            lostElement.textContent = lost;
        }
    });
}
