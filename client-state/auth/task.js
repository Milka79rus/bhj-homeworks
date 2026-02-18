// ==========================================
// 1. ИНФРАСТРУКТУРА (Сеть и Хранилище)
// ==========================================

/**
 * Отправляет POST-запрос на сервер
 */
const postData = async (url, formData) => {
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    return await response.json();
};

/**
 * Обертка для работы с локальным хранилищем
 */
const userSession = {
    save: (id) => localStorage.setItem('user_id', id),
    get: () => localStorage.getItem('user_id'),
    remove: () => localStorage.removeItem('user_id')
};

// ==========================================
// 2. UI (Отображение и переключение экранов)
// ==========================================

const ui = {
    signin: document.getElementById('signin'),
    welcome: document.getElementById('welcome'),
    userIdSpan: document.getElementById('user_id'),
    form: document.getElementById('signin__form'),

    // Метод для переключения состояния "Авторизован / Нет"
    render: (userId = null) => {
        if (userId) {
            ui.userIdSpan.textContent = userId;
            ui.signin.classList.remove('signin_active');
            ui.welcome.classList.add('welcome_active');
        } else {
            ui.signin.classList.add('signin_active');
            ui.welcome.classList.remove('welcome_active');
        }
    }
};

// ==========================================
// 3. АГРЕГАТОР (Логика и события)
// ==========================================

const initAuth = () => {
    // 3.1. Создаем кнопку "Выйти" программно (Повышенный уровень)
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Выйти';
    logoutBtn.className = 'btn';
    logoutBtn.style.display = 'block';
    logoutBtn.style.margin = '20px auto';
    ui.welcome.appendChild(logoutBtn);

    // 3.2. Проверка при загрузке страницы
    const savedId = userSession.get();
    if (savedId) {
        ui.render(savedId);
    }

    // 3.3. Слушатель отправки формы
    ui.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(ui.form);
        const url = ui.form.getAttribute('action');

        try {
            const data = await postData(url, formData);

            if (data.success) {
                userSession.save(data.user_id);
                ui.render(data.user_id);
                ui.form.reset(); // Очистка полей
            } else {
                alert('Неверный логин/пароль');
                ui.form.reset();
            }
        } catch (err) {
            alert('Ошибка при соединении с сервером');
        }
    });

    // 3.4. Слушатель кнопки выхода
    logoutBtn.addEventListener('click', () => {
        userSession.remove();
        ui.render(null);
    });
};

// ==========================================
// 4. СТАРТ
// ==========================================
document.addEventListener('DOMContentLoaded', initAuth);