class Quest {
  constructor() {
    const save = localStorage.getItem('new-year-2022-quest');
    this.tasks = save ? JSON.parse(save) : [
      {
        ordinal: 0,
        text: 'я - твоё первое заданье<br>над моей сложностью не ржи<br>все цифры в наших днях рожденья<br>сложи',
        hint: '2904199119021990',
        answer: ['66'],
        secret: '1',
        solved: false,
        startTime: '2022-12-31T11:00:00.000Z',
        endTime: '2022-12-31T13:00:00.000Z',
      },
      {
        ordinal: 1,
        text: 'я в твоём царстве в месте тайном<br>успешно разместил пароль<br>найти его пока не поздно<br>изволь',
        hint: 'иди на запах металлических кастрюль',
        answer: ['пароль'],
        secret: '0',
        solved: false,
        startTime: '2022-12-31T13:00:00.000Z',
        endTime: '2022-12-31T15:00:00.000Z',
      },
      {
        ordinal: 2,
        text: 'внизу загадочное слово<br>динь-динь звенит гудит трубой<br>и унесёт тебя дорогой<br>какой<br><br>"нвтыяйчос"',
        hint: 'св*****ый',
        answer: ['святочный'],
        secret: '0',
        solved: false,
        startTime: '2022-12-31T15:00:00.000Z',
        endTime: '2022-12-31T17:00:00.000Z',
      },
      {
        ordinal: 3,
        text: 'настало время приключений<br>сходить послушать помечтать<br>когда красиво снег нападал<br>узнать',
        hint: 'машина споёт тебе',
        answer: ['рождество', 'на рождество'],
        secret: '9',
        solved: false,
        startTime: '2022-12-31T17:00:00.000Z',
        endTime: '2022-12-31T19:00:00.000Z',
      },
      {
        ordinal: 4,
        text: 'а помнишь ты тот день и месяц<br>среди поешь и не реви<br>когда последний раз признались<br>в любви',
        hint: 'проверь в истории сообщений',
        answer: [
          '15 декабря',
          '15 декабря 2022',
          '15 декабря 2022 года',
          '15.12',
          '15 12',
          '1512',
          '15.12.2022',
          '15 12 2022',
          '15122022',
          '15 декабря 2022г.',
          '15 декабря 2022 г.',
          '15 декабря 2022г',
          '15 декабря 2022 г',
        ],
        secret: '1',
        solved: false,
        startTime: '2022-12-31T19:00:00.000Z',
        endTime: '2022-12-31T21:00:00.000Z',
      },
      {
        ordinal: 5,
        text: 'там может зло быть или чудо<br>быть может кот живой иль нет<br>открой его чтобы найти свой<br>ответ',
        hint: 'проверь почтовый ящик',
        answer: ['кровать'],
        secret: '1',
        solved: false,
        startTime: '2022-12-31T21:00:00.000Z',
        endTime: '2022-12-31T22:50:00.000Z',
      },
    ];
  }

  clock = () => {
    const currentTime = Date.now();
    // const currentTime = new Date(
    //   new Date('December 31, 2022 12:00:00').valueOf()
    //   + (new Date(Date.now()) - new Date('December 29, 2022 23:00:00')).valueOf()
    // );
    const task = this.getCurrentTask(currentTime);
    const status = this.getStatus(currentTime, task);
    // const task = this.tasks[0];
    // const status = 'after';
    const time = this.getTime(status, currentTime, task);
    const description = this.getDescription(status, task);
    this.render(status, time, description);
    button.onclick = () => {
      if (task.answer.includes(input.value.toLowerCase())) {
        input.value = 'правильно!';
        task.solved = true;
        localStorage.setItem('new-year-2022-quest', JSON.stringify(this.tasks));
      } else {
        input.value = 'неправильно';
      }
      setTimeout(() => input.value = '', 1000);
    }
    setTimeout(this.clock, 1000);
  }

  getCurrentTask = (currentTime) => {
    return this.tasks.find((task) => new Date(task.startTime) <= currentTime && new Date(task.endTime) > currentTime);
  }

  getStatus = (currentTime, task) => {
    if (currentTime < new Date(this.tasks[0].startTime)) return 'before';
    else if (!task) return 'after';
    else if (task.ordinal === 5 && task.solved) return 'victory';
    else if (task.solved) return 'solved';
    else if (new Date(task.endTime) - currentTime < 900_000) return 'in progress close to end';
    else return 'in progress';
  }

  getTime = (status, currentTime, task) => {
    let time;
    switch (status) {
      case 'before':
        time = new Date(new Date(this.tasks[0].startTime) - currentTime);
        break;
      case 'solved':
      case 'in progress':
      case 'in progress close to end':
        time = new Date(new Date(task.endTime) - currentTime);
        break;
      case 'victory':
      case 'after':
      default:
    }
    if (!time) return '';
    const days = time.getDate() - 1;
    const hour = time.getHours() - 1 + (days * 24);
    const min = time.getMinutes();
    const sec = time.getSeconds();
    return `${hour}:${decimalize(min)}:${decimalize(sec)}`;
  }

  getDescription = (status, task) => {
    let description = '';
    switch (status) {
      case 'before':
        description = '<h4>Задания начнутся через</h4>';
        break;
      case 'solved':
        description = `<p class="secret">${task.secret}</p>` + '<br>' + '<h4>Следующее задание начнётся через</h4>';
        break;
      case 'in progress':
        description = '<h4>Задание:</h4>' + '<br>' + task.text + '<br><br>' + '<h4>Время задания истечёт через</h4>';
        break;
      case 'in progress close to end':
        description = '<h4>Задание:</h4>' + '<br>' + task.text + '<br><br>' + '<h4>Подсказка:</h4>'
          + '<br>' + task.hint + '<br><br>' + '<h4>Время задания истечёт через</h4>';
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
    if (status === 'in progress' || status === 'in progress close to end') {
      input.classList.remove('hidden');
      button.classList.remove('hidden');
    } else {
      input.classList.add('hidden');
      button.classList.add('hidden');
    }
  }
}
	
function decimalize(n) {
  return n < 10 ? '0' + n : n;
};

new Quest().clock();