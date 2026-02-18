// ==========================================
// 1. ИНФРАСТРУКТУРА (Работа с хранилищем)
// ==========================================
/**
 * Получает данные из localStorage по ключу
 */
const getStoredData = (key) => localStorage.getItem(key) || '';

/**
 * Сохраняет данные в localStorage
 */
const setStoredData = (key, value) => localStorage.setItem(key, value);

/**
 * Удаляет данные из localStorage
 */
const clearStoredData = (key) => localStorage.removeItem(key);


// ==========================================
// 2. UI (Управление состоянием элементов)
// ==========================================
/**
 * Устанавливает текст в редакторе
 */
const setEditorValue = (editor, text) => {
    editor.value = text;
};


// ==========================================
// 3. АГРЕГАТОР (Логика приложения)
// ==========================================
const initEditorApp = () => {
    const editorEl = document.getElementById('editor');
    const clearBtn = document.getElementById('clear-content');
    const STORAGE_KEY = 'editor_content_v1';

    // 3.1. Восстанавливаем сохраненный текст при загрузке
    const savedText = getStoredData(STORAGE_KEY);
    setEditorValue(editorEl, savedText);

    // 3.2. Подписываемся на ввод (сохраняем мгновенно)
    editorEl.addEventListener('input', (event) => {
        setStoredData(STORAGE_KEY, event.target.value);
    });

    // 3.3. Логика очистки (Повышенный уровень сложности)
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            // Очищаем UI и хранилище
            setEditorValue(editorEl, '');
            clearStoredData(STORAGE_KEY);
        });
    }
};

// ==========================================
// 4. СТАРТ ПРИЛОЖЕНИЯ
// ==========================================
document.addEventListener('DOMContentLoaded', initEditorApp);