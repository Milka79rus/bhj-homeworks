const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

// 1. Загрузка вопроса (GET-запрос)
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const { id, data } = response;

        // Устанавливаем заголовок опроса
        pollTitle.innerText = data.title;

        // Создаем кнопки ответов
        data.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'poll__answer';
            button.innerText = answer;
            button.style.marginRight = '5px';

            // Обработка клика
            button.addEventListener('click', () => {
                alert('Спасибо, ваш голос засчитан!');
                // Отправляем голос на сервер (Повышенный уровень)
                submitVote(id, index);
            });

            pollAnswers.appendChild(button);
        });
    }
});

// 2. Отправка голоса (POST-запрос)
function submitVote(pollId, answerIndex) {
    const xhrVote = new XMLHttpRequest();
    xhrVote.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhrVote.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Передаем параметры в формате x-www-form-urlencoded
    xhrVote.send(`vote=${pollId}&answer=${answerIndex}`);

    xhrVote.addEventListener('load', () => {
        if (xhrVote.status >= 200 && xhrVote.status < 300) {
            const results = JSON.parse(xhrVote.responseText).stat;
            showStatistics(results);
        }
    });
}

// 3. Отображение статистики
function showStatistics(stats) {
    pollAnswers.innerHTML = ''; // Очищаем кнопки

    // Вычисляем общую сумму голосов для расчета процентов
    const totalVotes = stats.reduce((acc, item) => acc + item.votes, 0);

    stats.forEach(item => {
        const percent = ((item.votes / totalVotes) * 100).toFixed(2);
        const statItem = document.createElement('div');
        statItem.style.marginBottom = '10px';
        statItem.innerHTML = `${item.answer}: <b>${percent}%</b> (${item.votes} шт.)`;
        pollAnswers.appendChild(statItem);
    });
}