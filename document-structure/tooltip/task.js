// Находим все ссылки с подсказками
const tooltipsTriggers = Array.from(document.querySelectorAll('.has-tooltip'));

// Создаем один элемент подсказки
const tooltipElement = document.createElement('div');
tooltipElement.className = 'tooltip';
document.body.appendChild(tooltipElement);

tooltipsTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();

        const title = trigger.getAttribute('title');

        // Если кликнули по той же ссылке, а подсказка уже видна — скрываем её
        if (tooltipElement.classList.contains('tooltip_active') && tooltipElement.innerText === title) {
            tooltipElement.classList.remove('tooltip_active');
            return;
        }

        // Устанавливаем текст и активируем
        tooltipElement.innerText = title;
        tooltipElement.classList.add('tooltip_active');

        // Получаем координаты ссылки
        const { top, bottom, left, right } = trigger.getBoundingClientRect();

        // Определяем позицию (из data-атрибута или по умолчанию bottom)
        const position = trigger.dataset.position || 'bottom';

        // Расчет позиции 
        let tooltipTop, tooltipLeft;

        if (position === 'top') {
            tooltipTop = top - tooltipElement.offsetHeight;
            tooltipLeft = left;
        } else if (position === 'bottom') {
            tooltipTop = bottom;
            tooltipLeft = left;
        } else if (position === 'left') {
            tooltipTop = top;
            tooltipLeft = left - tooltipElement.offsetWidth;
        } else if (position === 'right') {
            tooltipTop = top;
            tooltipLeft = right;
        }

        // Применяем координаты
        tooltipElement.style.top = `${tooltipTop}px`;
        tooltipElement.style.left = `${tooltipLeft}px`;
    });
});

// Дополнительно: скрываем подсказку при скролле, так как она fixed
window.addEventListener('scroll', () => {
    tooltipElement.classList.remove('tooltip_active');
});