// ==========================================
// 1. ИНФРАСТРУКТУРА (Универсальный сетевой запрос)
// ==========================================
const fetchRequest = (options) => {
    // Деструктуризируем параметры с дефолтными значениями
    const { url, method = 'GET', responseType = 'json', headers = {}, body = null } = options;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = responseType;

        // Устанавливаем переданные заголовки 
        for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value);
        }

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(`Ошибка сервера: ${xhr.status}`);
            }
        });

        xhr.addEventListener('error', () => reject('Ошибка сети'));
        xhr.send(body);
    });
};

// ==========================================
// 2. UI (Только формирование разметки)
// ==========================================
// Возвращает HTML-строку кнопок. Добавляем data-index для привязки ответа.
const getPollButtonsMarkup = (answers) => {
    return answers.map((answer, index) => `
        <button class="poll__answer" data-index="${index}" style="margin-right: 5px;">
            ${answer}
        </button>
    `).join('');
};

// Возвращает HTML-строку со статистикой.
const getStatsMarkup = (stats) => {
    const totalVotes = stats.reduce((acc, item) => acc + item.votes, 0);

    return stats.map(item => {
        const percent = totalVotes === 0 ? 0 : ((item.votes / totalVotes) * 100).toFixed(2);
        return `
            <div style="margin-bottom: 10px;">
                ${item.answer}: <b>${percent}%</b> (${item.votes} шт.)
            </div>
        `;
    }).join('');
};

// ==========================================
// 3. АГРЕГАТОР (Связывает сеть, UI и действия пользователя)
// ==========================================
const initPollApp = async ({ url, titleEl, answersEl }) => {
    try {
        // 3.1. Загружаем вопрос 
        const pollResponse = await fetchRequest({ url });
        const { id, data } = pollResponse;

        // 3.2. Отрисовываем заголовок и кнопки
        titleEl.innerText = data.title;
        answersEl.innerHTML = getPollButtonsMarkup(data.answers);

        // 3.3. Обработка кликов (Делегирование событий)
        answersEl.addEventListener('click', async (event) => {
            // Ищем клик именно по кнопке
            const btn = event.target.closest('.poll__answer');
            if (!btn) return;

            alert('Спасибо, ваш голос засчитан!');
            const answerIndex = btn.dataset.index;

            try {
                // 3.4. Отправляем голос (используем ту же функцию fetchRequest, но с POST)
                const voteResponse = await fetchRequest({
                    url,
                    method: 'POST',
                    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
                    body: `vote=${id}&answer=${answerIndex}`
                });

                // 3.5. Отрисовываем обновленную статистику
                answersEl.innerHTML = getStatsMarkup(voteResponse.stat);

            } catch (err) {
                console.error('Ошибка при отправке голоса:', err);
            }
        });

    } catch (err) {
        console.error('Ошибка при загрузке опроса:', err);
    }
};

// ==========================================
// 4. ИНИЦИАЛИЗАЦИЯ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const titleEl = document.getElementById('poll__title');
    const answersEl = document.getElementById('poll__answers');

    initPollApp({
        url: 'https://students.netoservices.ru/nestjs-backend/poll',
        titleEl,
        answersEl
    });
});