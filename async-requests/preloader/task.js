// ==========================================
// 1. ИНФРАСТРУКТУРА (Только получение данных)
// ==========================================
// Универсальная функция, принимающая объект опций. 
const fetchRequest = (options) => {
    // Деструктуризируем опции, задаем значения по умолчанию
    const { url, method = 'GET', responseType = 'json', body = null } = options;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = responseType;

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(`Ошибка сервера: ${xhr.status}`);
            }
        });

        xhr.addEventListener('error', () => {
            reject('Ошибка сети');
        });

        xhr.send(body);
    });
};

// ==========================================
// 2. UI (Только формирование разметки)
// ==========================================
// Функция не трогает DOM напрямую, она только возвращает готовую строку HTML
const renderCurrenciesMarkup = (currencies) => {
    let html = '';
    for (const key in currencies) {
        const valute = currencies[key];
        html += `
            <div class="item">
                <div class="item__code">${valute.CharCode}</div>
                <div class="item__value">${valute.Value}</div>
                <div class="item__currency">руб.</div>
            </div>
        `;
    }
    return html;
};

// ==========================================
// 3. АГРЕГАТОР (Управляет логикой)
// ==========================================
const loadAndRender = async ({ url, loaderEl, itemsEl }) => {
    // 3.1. Проверяем кэш и сразу рендерим, если он есть
    const cachedData = localStorage.getItem('currency_data');
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        itemsEl.innerHTML = renderCurrenciesMarkup(parsedData.response.Valute);
        loaderEl.classList.remove('loader_active');
    }

    // 3.2. Делаем сетевой запрос за свежими данными
    try {
        // Передаем опции в универсальную функцию
        const data = await fetchRequest({ url: url, method: 'GET' });

        // Обновляем кэш свежими данными
        localStorage.setItem('currency_data', JSON.stringify(data));

        // Обновляем DOM
        itemsEl.innerHTML = renderCurrenciesMarkup(data.response.Valute);
    } catch (error) {
        console.error('Не удалось обновить курсы валют:', error);
    } finally {
        // Гарантированно скрываем лоадер в любом случае
        loaderEl.classList.remove('loader_active');
    }
};

// ==========================================
// 4. ИНИЦИАЛИЗАЦИЯ
// ==========================================
const init = () => {
    const loaderEl = document.getElementById('loader');
    const itemsEl = document.getElementById('items');

    loadAndRender({
        url: 'https://students.netoservices.ru/nestjs-backend/slow-get-courses',
        loaderEl,
        itemsEl,
    });
};

// Запускаем скрипт только после того, как DOM полностью загрузился
document.addEventListener('DOMContentLoaded', init);