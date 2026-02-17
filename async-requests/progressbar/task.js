// ==========================================
// 1. ИНФРАСТРУКТУРА (Универсальный запрос с поддержкой Progress)
// ==========================================
const fetchRequest = (options) => {
    const {
        url,
        method = 'GET',
        body = null,
        onProgress = null
    } = options;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        // Если передана функция для отслеживания прогресса, вешаем её на xhr.upload
        if (onProgress && xhr.upload) {
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    onProgress(event.loaded / event.total);
                }
            });
        }

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(`Ошибка: ${xhr.status}`);
            }
        });

        xhr.addEventListener('error', () => reject('Ошибка сети'));

        xhr.send(body);
    });
};

// ==========================================
// 2. UI (Логика отображения)
// ==========================================
const updateFileName = (inputElement, descElement) => {
    let fileName = inputElement.value.split("\\").pop();
    descElement.textContent = fileName || "Имя файла...";
};

const setProgress = (progressElement, value) => {
    progressElement.value = value;
};

// ==========================================
// 3. АГРЕГАТОР (Управление процессом загрузки)
// ==========================================
const initUploadApp = () => {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');
    const fileInput = document.getElementById('file');
    const fileDesc = document.querySelector(".input__wrapper-desc");

    // Следим за выбором файла
    fileInput.addEventListener('change', () => updateFileName(fileInput, fileDesc));

    // Следим за отправкой формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            // Используем нашу универсальную функцию
            await fetchRequest({
                url: 'https://students.netoservices.ru/nestjs-backend/upload',
                method: 'POST',
                body: formData,
                onProgress: (ratio) => setProgress(progress, ratio) // Передаем прогресс в UI
            });

            alert('Файл успешно загружен!');
        } catch (error) {
            alert('Произошла ошибка при загрузке: ' + error);
        } finally {
            setProgress(progress, 0); // Обнуляем полоску
            form.reset();
            fileDesc.textContent = "Имя файла...";
        }
    });
};

// ==========================================
// 4. ИНИЦИАЛИЗАЦИЯ
// ==========================================
document.addEventListener('DOMContentLoaded', initUploadApp);