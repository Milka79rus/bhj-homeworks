const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');

// Функция для отрисовки валют
function renderCurrencies(data) {
    const valutes = data.response.Valute;
    itemsContainer.innerHTML = ''; // Очищаем старые данные

    for (const key in valutes) {
        const valute = valutes[key];

        // Создаем HTML-структуру согласно заданию
        const itemHtml = `
            <div class="item">
                <div class="item__code">${valute.CharCode}</div>
                <div class="item__value">${valute.Value}</div>
                <div class="item__currency">руб.</div>
            </div>
        `;

        itemsContainer.insertAdjacentHTML('beforeend', itemHtml);
    }
}

// 1. ПОВЫШЕННЫЙ УРОВЕНЬ: Загружаем данные из кэша (если они есть)
const cachedData = localStorage.getItem('currency_data');
if (cachedData) {
    renderCurrencies(JSON.parse(cachedData));
    loader.classList.remove('loader_active'); // Скрываем лоадер, так как данные уже на экране
}

// 2. ОСНОВНОЕ ЗАДАНИЕ: Запрос к серверу
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.responseType = 'json';
xhr.send();



xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
        // Скрываем анимацию загрузки
        loader.classList.remove('loader_active');

        const responseData = xhr.response;

        // Сохраняем свежие данные в кэш (Повышенный уровень)
        localStorage.setItem('currency_data', JSON.stringify(responseData));

        // Отрисовываем актуальные данные
        renderCurrencies(responseData);
    } else {
        console.error('Ошибка загрузки данных');
    }
});