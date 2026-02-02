// Находим все скрытые блоки
const revealElements = document.querySelectorAll('.reveal');

const handleScroll = () => {
    revealElements.forEach((el) => {
        // Получаем координаты элемента относительно вьюпорта
        const { top, bottom } = el.getBoundingClientRect();

        // Проверяем, виден ли элемент (хотя бы частично)
        const isVisible = top < window.innerHeight && bottom > 0;

        if (isVisible) {
            el.classList.add('reveal_active');
        } else {
            // Если нужно, чтобы блок снова исчезал при уходе с экрана:
            el.classList.remove('reveal_active');
        }
    });
};

// Запускаем при прокрутке
window.addEventListener('scroll', handleScroll);

// Запускаем один раз при старте (вдруг элемент виден сразу без скролла)
handleScroll();