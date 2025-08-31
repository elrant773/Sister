/*
  ✅ Как выбрать правильный ответ:
  - Для каждого вопроса укажи массив вариантов `options` (их может быть сколько угодно).
  - Свойство `answer` — это НОМЕР правильного варианта, считая с нуля (0 — первый, 1 — второй и т.д.).
  Пример:
    options: ["красный", "синий", "чёрный"], answer: 2  // правильный: "чёрный"
*/

const config = {
    shuffleOptions: false,
    showRightWhenWrong: true,
    gift: { text: "🎁 Молодец! Подарок твой ❤", link: "" }
  };
  
  const questions = [
    {
      question: "Выбери мой любимый цвет",
      options: [
       "Чёрный","Белый","Серый", "Фиолетовый","Бирюзовый"
       
      ],
      answer: 1
    },
    // {
    //   question: "Где было наше первое свидание?",
    //   options: [
    //     "Парк","Кафе","Перед школой","Каток","Книжный магазин",
    //   ],
    //   answer: 2
    // },
    {
      question: "Что из этого я люблю больше всего?",
      options: [
        "Пиццу","Суши","Бургеры","Шашлык","Мясо(Любое)",
      ],
      answer: 4
    },
    {
        question: "Какую страну я хотел посетить?",
        options: ["Франция","Германия","Дубай","Япония","Швейцария(Аптека)",
            
        ],
        answer: 4
      },
      // {
      //   question: "Куда я  люблю тебя целовать(больше всего)?",
      //   options: ["Губы","Шея","Руки","Щёчки","Лобик",
      //   ],
      //   answer: 0
      // },
      {
        question: "Насколько я тактильный человек?",
        options: ["1/5","2/5","3/5","4/5","5/5",
        ],
        answer: 3
      },
      {
        question: "Что мне в тебе нравится?",
        options: ["ты","Ты","Всё","Ты","Ты ",
          
        ],
        answer: 2
      },
      {
        question: "Мой любимый напиток?",
        options: ["Кофе","Чай","Сок","Минералка","Молочный коктейль"],
        answer: 4
      },
      {
        question: "Какое время года мне нравится больше?",
        options: ["Зима","Весна","Лето","Осень","Все одинаково"],
        answer: 0
      },
      {
        question: "Мой любимый фильм?",
        options: ["Форсаж(С 1 по 9)","Титаник","Матрица","Мстители","Властелин колец"],
        answer: 3
      },
      {
        question: "Что я предпочитаю на отдыхе?",
        options: ["Море","Горы","Экскурсии","В горы с великом и близкими","Дача"],
        answer: 3
      },
      {
        question: "Какая музыка мне ближе?",
        options: ["Меломания","Рок","Классика","Джаз","Рэп"],
        answer: 0
      },
      {
        question: "Мой любимый спорт?",
        options: ["Футбол","Баскетбол","Теннис","Плавание","МТБ"],
        answer: 4
      },
      {
        question: "Что я больше люблю читать?",
        options: ["Фантастику","Романы","Детективы","Историю","Комиксы"],
        answer: 0       
      },
      {
        question: "Любимый праздник?",
        options: ["Новый год","День рождения","8 марта","14 февраля","1 мая"],
        answer: 0
      },
      {
        question: "Мой знак зодиака?",
        options: ["Овен","Телец","Близнецы","Рак","Лев"],
        answer: 4
      },
      {
        question: "Любимый домашний питомец(У меня его нет но все равно выбирай)?",
        options: ["Кот","Собака","Попугай","Рыбки","Хомяк"],
        answer: 2
      },
      {
        question: "Что я предпочитаю на завтрак?",
        options: ["Кашу","Бутерброд","Яичницу","Блины","Нечего"],
        answer: 4
      },
      {
        question: "Какой мой любимый цветок?",
        options: ["Розы","Тюльпаны","Лилии","Ромашки","Орхидеи"],
        answer: 4
      },
      // {
      //   question: "За что я тебя 1 раз потрогал зимой?",
      //   options: ["Ноги","Грудь","Талия","Шея","Голова"],
      //   answer: 1
      // }
  ];
  
  let current = 0, correct = 0;
  const startBtn = document.getElementById('start');
  const quiz = document.getElementById('quiz');
  const step = document.getElementById('step');
  const qEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('next');
  const result = document.getElementById('result');
  const summary = document.getElementById('summary');
  const gift = document.getElementById('gift');
  const restart = document.getElementById('restart');
  
  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', nextQuestion);
  restart && restart.addEventListener('click', () => { current=0; correct=0; result.classList.add('hidden'); startBtn.classList.remove('hidden'); });
  
  function startQuiz(){
    startBtn.classList.add('hidden');
    quiz.classList.remove('hidden');
    current = 0; correct = 0;
    renderQuestion();
  }
  
  function renderQuestion(){
    const total = questions.length;
    const q = questions[current];
    step.textContent = `Вопрос ${current+1} из ${total}`;
    qEl.textContent = q.question;
    feedback.textContent = '';
    feedback.className = 'feedback';
  
    const indexed = q.options.map((text,i)=>({text,i}));
    const list = config.shuffleOptions ? shuffle(indexed) : indexed;
  
    optionsEl.innerHTML = '';
    list.forEach(({text,i}) => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.type = 'button';
      btn.textContent = text;
      btn.addEventListener('click', () => choose(i, btn));
      optionsEl.appendChild(btn);
    });
  
    nextBtn.classList.add('hidden');
  }
  
  function choose(index, btn){
    const q = questions[current];
    const correctIdx = q.answer;
    const buttons = [...document.querySelectorAll('.opt')];
  
    buttons.forEach(b => b.disabled = true);
  
    const isRight = index === correctIdx;
    if(isRight){
      btn.classList.add('correct');
      feedback.textContent = 'Верно! 💚';
      feedback.classList.add('good');
      correct++;
    } else {
      btn.classList.add('wrong');
      feedback.textContent = `Неверно 😅`;
      feedback.classList.add('bad');
      if(config.showRightWhenWrong){
        const rightBtn = buttons.find((b, k) => getOriginalIndex(k) === correctIdx);
        if(rightBtn){ rightBtn.classList.add('correct'); }
        else {
          buttons.forEach(b=>{ if(b.textContent===q.options[correctIdx]) b.classList.add('correct'); });
        }
        feedback.textContent += ` Правильный ответ: "${q.options[correctIdx]}".`;
      }
    }
  
    nextBtn.classList.remove('hidden');
  
    function getOriginalIndex(k){
      const text = buttons[k].textContent;
      return q.options.findIndex(x => x === text);
    }
  }
  
  function nextQuestion(){
    current++;
    if(current < questions.length){
      renderQuestion();
    } else {
      finish();
    }
  }
  
  function finish(){
    quiz.classList.add('hidden');
    result.classList.remove('hidden');
    summary.textContent = `Правильных ответов: ${correct} из ${questions.length}`;
    gift.textContent = config.gift.text || '';
    if(config.gift.link){
      const a = document.createElement('a');
      a.href = config.gift.link; a.target = '_blank'; a.textContent = 'Открыть подарок';
      gift.appendChild(document.createTextNode(' '));
      gift.appendChild(a);
    }
  }
  
  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
  }
