const form = document.getElementById('form');
const progress = document.getElementById('progress');
const fileInput = document.getElementById('file');
const fileDesc = document.querySelector(".input__wrapper-desc");

// Логика отображения имени выбранного файла
fileInput.onchange = function () {
    let fileName = this.value.split("\\");
    fileName = fileName[fileName.length - 1];
    fileDesc.textContent = fileName || "Имя файла...";
};

// Логика отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    // Настройка отслеживания прогресса ЗАГРУЗКИ (upload)

    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            // Устанавливаем значение от 0 до 1
            progress.value = event.loaded / event.total;
        }
    };

    // Обработка завершения запроса
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert('Файл успешно загружен!');
        } else {
            alert('Ошибка при загрузке: ' + xhr.status);
        }
        // Сбрасываем прогресс после завершения
        progress.value = 0;
    };

    xhr.onerror = function () {
        alert('Ошибка сети или невозможно отправить запрос на указанный адрес.');
    };

    // Отправка данных на сервер
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
});