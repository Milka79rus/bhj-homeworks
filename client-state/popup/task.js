// ==========================================
// 1. ИНФРАСТРУКТУРА (Работа с Cookie)
// ==========================================
/**
 * Получает значение cookie по имени
 */
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

/**
 * Устанавливает cookie
 */
const setCookie = (name, value) => {
    // Устанавливаем cookie без срока действия (до закрытия сессии браузера)
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
};


// ==========================================
// 2. UI (Управление модальным окном)
// ==========================================
const toggleModal = (modalElement, isActive) => {
    if (isActive) {
        modalElement.classList.add('modal_active');
    } else {
        modalElement.classList.remove('modal_active');
    }
};


// ==========================================
// 3. АГРЕГАТОР (Логика приложения)
// ==========================================
const initModalApp = () => {
    const modal = document.getElementById('subscribe-modal');
    const closeBtn = modal.querySelector('.modal__close');
    const COOKIE_NAME = 'is_modal_closed';

    // 3.1. Проверяем наличие cookie о закрытии
    const isClosed = getCookie(COOKIE_NAME);

    // 3.2. Если cookie нет — показываем окно
    if (!isClosed) {
        toggleModal(modal, true);
    }

    // 3.3. Обработка закрытия
    closeBtn.onclick = () => {
        toggleModal(modal, false);

        // Устанавливаем cookie, чтобы больше не показывать
        setCookie(COOKIE_NAME, 'true');
    };
};

// ==========================================
// 4. СТАРТ
// ==========================================
document.addEventListener('DOMContentLoaded', initModalApp);