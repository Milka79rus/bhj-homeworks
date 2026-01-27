class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    // Находим новый элемент таймера
    this.timerElement = container.querySelector('.status__timer');

    this.timerId = null; // Здесь будем хранить ID интервала

    this.reset();

    this.registerEvents();
  }

  // Метод для управления таймером
  startTimer() {
    // 1. Очищаем старый таймер, если он был
    clearInterval(this.timerId);

    // 2. Устанавливаем время равным количеству букв в слове
    let timeLeft = this.wordElement.querySelectorAll('.symbol').length;
    this.timerElement.textContent = timeLeft;

    // 3. Запускаем обратный отсчет
    this.timerId = setInterval(() => {
      timeLeft--;
      this.timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        // Если время вышло — засчитываем проигрыш
        this.fail();
      }
    }, 1000);
  }

  reset() {
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.setNewWord();
  }

  registerEvents() {
    document.addEventListener('keyup', (event) => {
      if (!this.currentSymbol) return;
      // 1. Получаем ожидаемый символ из DOM-элемента (приводим к нижнему регистру)
      const expectedSymbol = this.currentSymbol.textContent.toLowerCase();

      // 2. Получаем введённый пользователем символ (тоже в нижнем регистре)
      const enteredSymbol = event.key.toLowerCase();

      // 3. Сравниваем
      if (enteredSymbol === expectedSymbol) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
    this.startTimer(); // Запускаем таймер при каждом новом слове
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript'
    ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

