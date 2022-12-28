class Quest {
  constructor() {
    this.tasks = tasks;
  }

  clock = () => {
    const currentTime = Date.now();
    const task = this.getCurrentTask(currentTime);
    const status = this.getStatus(currentTime, task);
    // const task = this.tasks[0];
    // const status = 'after';
    const time = this.getTime(status, currentTime, task);
    const description = this.getDescription(status, task);
    this.render(status, time, description);
    setTimeout(this.clock, 1000);
  }

  getCurrentTask = (currentTime) => {
    return this.tasks.find((task) => task.startTime <= currentTime && task.endTime > currentTime);
  }

  getStatus = (currentTime, task) => {
    if (currentTime < this.tasks[0].startTime) return 'before';
    else if (!task) return 'after';
    else if (task.ordinal === 5 && task.solved) return 'victory';
    else if (task.solved) return 'solved';
    else return 'in progress';
  }

  getTime = (status, currentTime, task) => {
    let time;
    switch (status) {
      case 'before':
        time = new Date(this.tasks[0].startTime - currentTime);
        break;
      case 'solved':
      case 'in progress':
        time = new Date(task.endTime - currentTime);
        break;
      case 'victory':
      case 'after':
      default:
    }
    if (!time) return '';
    const days = time.getDate();
    const hour = time.getHours() + (days * 24);
    const min = time.getMinutes();
    const sec = time.getSeconds();
    return `${hour}:${decimalize(min)}:${decimalize(sec)}`;
  }

  getDescription = (status, task) => {
    let description = '';
    switch (status) {
      case 'before':
        description = 'Задания начнутся через';
        break;
      case 'solved':
        description = `<p class="secret">${task.secret}</p>` + '<br>' + 'Следующее задание начнётся через'
        break;
      case 'in progress':
        description = 'Задание:' + '<br><br>' + task.text + '<br><br>' + 'Время задания истечёт через'
        break;
      case 'victory':
        description = '<p class="secret">Победа!</p>' + '<br><br>';
      case 'after':
        description += `<p class="secret">${this.tasks.map(task => task.solved ? task.secret : '*').join(' ')}</p>`;
        break;
      default:
        description = 'Вы кто такие? Я вас не звал!';
    }
    return description;
  }

  render = (status, time, description) => {
    text.innerHTML = description;
    timer.value = time;
    if (status !== 'in progress') {
      input.classList.add('hidden');
      button.classList.add('hidden');
    } else {
      input.classList.remove('hidden');
      button.classList.remove('hidden');
    }
  }
}
	
function decimalize(n) {
  return n < 10 ? '0' + n : n;
};

const msDay = 86400000;

const tasks = [
  {
    ordinal: 0,
    text: 'Я женщинам не доверяю<br>Они коварны и хитры<br>Они на ногти клеют ногти<br>Рисуют брови на бровях',
    answer: '',
    secret: '1',
    solved: false,
    startTime: new Date('December 31, 2022 12:00:00'),
    endTime: new Date('December 31, 2022 14:00:00'),
  },
  {
    ordinal: 1,
    text: 'Я - второе задание',
    answer: '',
    secret: '0',
    solved: false,
    startTime: new Date('December 31, 2022 14:00:00'),
    endTime: new Date('December 31, 2022 16:00:00'),
  },
  {
    ordinal: 2,
    text: 'Я - третье задание',
    answer: '',
    secret: '0',
    solved: false,
    startTime: new Date('December 31, 2022 16:00:00'),
    endTime: new Date('December 31, 2022 18:00:00'),
  },
  {
    ordinal: 3,
    text: 'Я - четвёртое задание',
    answer: '',
    secret: '9',
    solved: false,
    startTime: new Date('December 31, 2022 18:00:00'),
    endTime: new Date('December 31, 2022 20:00:00'),
  },
  {
    ordinal: 4,
    text: 'Я - пятое задание',
    answer: '',
    secret: '1',
    solved: false,
    startTime: new Date('December 31, 2022 20:00:00'),
    endTime: new Date('December 31, 2022 22:00:00'),
  },
  {
    ordinal: 5,
    text: 'Я - последнее задание',
    answer: '',
    secret: '1',
    solved: false,
    startTime: new Date('December 31, 2022 22:00:00'),
    endTime: new Date('December 31, 2022 23:50:00'),
  },
];

new Quest().clock();

// TODO
// действие при нажатии кнопки
// сохранение в локал сторадж