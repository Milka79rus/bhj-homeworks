// 1. Используем Array.from для навигации по всем кнопкам 
const dropdownValues = Array.from(document.querySelectorAll('.dropdown__value'));

dropdownValues.forEach(value => {
    // Открытие/закрытие списка
    value.addEventListener('click', function () {
        // Находим список, который идет сразу за кнопкой
        const list = this.nextElementSibling;
        list.classList.toggle('dropdown__list_active');
    });
});

// 2. Используем один обработчик на документ или контейнеры для выбора значений
const dropdownLists = document.querySelectorAll('.dropdown__list');

dropdownLists.forEach(list => {
    list.addEventListener('click', function (event) {
        // Запрещаем переход по ссылке
        event.preventDefault();

        // Используем closest, чтобы найти ближайшего родителя-ссылку
        const link = event.target.closest('.dropdown__link');

        if (link) {
            //  Свойство textContent
            const newValue = link.textContent.trim();

            // Находим родительский контейнер .dropdown и в нем — .dropdown__value
            const dropdown = link.closest('.dropdown');
            dropdown.querySelector('.dropdown__value').textContent = newValue;

            // Закрываем список
            this.classList.remove('dropdown__list_active');
        }
    });
});