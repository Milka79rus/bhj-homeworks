const book = document.getElementById('book');
const fontSizeButtons = Array.from(document.querySelectorAll('.font-size'));

fontSizeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // 1. Отменяем переход по ссылке 
        event.preventDefault();

        // 2. Убираем класс активной кнопки у всех кнопок размера
        fontSizeButtons.forEach(btn => btn.classList.remove('font-size_active'));

        // 3. Добавляем активный класс нажатой кнопке
        button.classList.add('font-size_active');

        // 4. Управляем размером шрифта книги
        // Сначала удаляем все возможные классы размера
        book.classList.remove('book_fs-small', 'book_fs-big');

        // Добавляем нужный класс, если есть data-size
        const size = button.dataset.size;
        if (size) {
            book.classList.add(`book_fs-${size}`);
        }
    });
});


const colorButtons = Array.from(document.querySelectorAll('.color'));

colorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        // Находим текущую группу (текст или фон), чтобы менять активность только в ней
        const parent = button.closest('.book__control');
        parent.querySelectorAll('.color').forEach(btn => btn.classList.remove('color_active'));
        button.classList.add('color_active');

        // Получаем значения из data-атрибутов
        const { textColor, bgColor } = button.dataset;

        // Если это настройка цвета текста
        if (textColor) {
            book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
            book.classList.add(`book_color-${textColor}`);
        }

        // Если это настройка фона
        if (bgColor) {
            book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
            book.classList.add(`book_bg-${bgColor}`);
        }
    });
});