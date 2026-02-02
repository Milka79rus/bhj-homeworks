// Находим все ротаторы на странице
const rotators = document.querySelectorAll('.rotator');

rotators.forEach((rotator) => {
    // Функция для запуска смены кадров
    const tick = () => {
        // 1. Находим текущий активный элемент
        const activeCase = rotator.querySelector('.rotator__case_active');

        // 2. Получаем настройки из следующего элемента (или первого, если текущий последний)
        let nextCase = activeCase.nextElementSibling;
        if (!nextCase) {
            nextCase = rotator.firstElementChild;
        }

        // 3. Применяем настройки из data-атрибутов
        const { speed, color } = nextCase.dataset;
        nextCase.style.color = color;

        // 4. Переключаем классы
        activeCase.classList.remove('rotator__case_active');
        nextCase.classList.add('rotator__case_active');

        // 5. Планируем следующий запуск с новой скоростью
        setTimeout(tick, speed);
    };

    // Запускаем первый цикл. Берем скорость у текущего активного элемента
    const currentActive = rotator.querySelector('.rotator__case_active');
    currentActive.style.color = currentActive.dataset.color; // Устанавливаем цвет первой фразе
    setTimeout(tick, currentActive.dataset.speed);
});