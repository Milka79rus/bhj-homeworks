// Находим все блоки вкладок на странице
const tabContainers = Array.from(document.querySelectorAll('.tabs'));

tabContainers.forEach((container) => {
    // Находим вкладки и их содержимое внутри текущего контейнера
    const tabs = Array.from(container.querySelectorAll('.tab'));
    const contents = Array.from(container.querySelectorAll('.tab__content'));

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            // 1. Убираем активный класс у текущей активной вкладки и контента
            // Ищем именно внутри текущего контейнера
            container.querySelector('.tab_active').classList.remove('tab_active');
            container.querySelector('.tab__content_active').classList.remove('tab__content_active');

            // 2. Добавляем активный класс нажатой вкладке
            tab.classList.add('tab_active');

            // 3. Находим индекс нажатой вкладки
            const index = tabs.indexOf(tab);

            // 4. Активируем контент с тем же индексом
            contents[index].classList.add('tab__content_active');
        });
    });
});