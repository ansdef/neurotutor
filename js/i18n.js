const LANG = {
  current: localStorage.getItem('lang') || 'ru',

  strings: {
    ru: {
      'back': '← Назад',
      'lang.toggle': 'EN',

      // Landing
      'hero.tag': 'ПЛАТФОРМА ВЫЖИВАНИЯ НА АНГЛИЙСКОМ',
      'hero.accent': 'ВЫЖИВИ',
      'hero.line2': 'В ПЕРВЫЕ',
      'hero.line3': 'ДНИ ЗА РУБЕЖОМ.',
      'hero.sub': 'Не языковой курс. Набор для выживания.<br>Реальные ситуации. Реальные разговоры. Реальная страна.',
      'hero.cta': 'ПОСТРОИТЬ МОЙ ПЛАН',
      'hero.footnote': '7 дней · Реальные ситуации · Без воды',
      'feat1.label': 'ОТ АЭРОПОРТА ДО КВАРТИРЫ',
      'feat1.desc': 'Каждая ситуация, с которой ты столкнёшься на первой неделе',
      'feat2.label': 'ПРАКТИКА РАЗГОВОРА',
      'feat2.desc': 'Реальные сценарии с мгновенной обратной связью от ИИ',
      'feat3.label': 'РЕЖИМ ВЫЖИВАНИЯ',
      'feat3.desc': '3 дня до вылета? У нас есть план для этого',

      // Onboarding 1
      'ob1.step': 'ШАГ 1 ИЗ 4',
      'ob1.headline': 'ЗАЧЕМ<br>ТЫ ЕДЕШЬ?',
      'ob1.sub': 'Мы подберём ситуации под твои цели.',
      'ob1.moving.title': 'Переезд за границу',
      'ob1.moving.desc': 'Долгосрочная жизненная перемена',
      'ob1.study.title': 'Учёба',
      'ob1.study.desc': 'Университет или языковая школа',
      'ob1.work.title': 'Работа',
      'ob1.work.desc': 'Деловой или карьерный переезд',
      'ob1.travel.title': 'Путешествие',
      'ob1.travel.desc': 'Поездка или исследование',
      'continue': 'Далее →',

      // Onboarding 2
      'ob2.step': 'ШАГ 2 ИЗ 4',
      'ob2.headline': 'КУДА<br>ЕДЕШЬ?',
      'ob2.sub': 'Разные страны, разные акценты, разные нормы.',

      // Onboarding 3
      'ob3.step': 'ШАГ 3 ИЗ 4',
      'ob3.headline': 'КАК ТЫ СЕБЯ<br>ЧУВСТВУЕШЬ?',
      'ob3.sub': 'Будь честен — это влияет на темп твоего плана.',
      'ob3.low': '😰 Слишком страшно',
      'ob3.mid': '😐 Постепенно',
      'ob3.high': '😎 Готов',

      // Onboarding 4
      'ob4.step': 'ШАГ 4 ИЗ 4',
      'ob4.headline': 'КАКИЕ СИТУАЦИИ<br>ВАЖНЕЕ ВСЕГО?',
      'ob4.sub': 'Выбери всё, что относится. Потом можно добавить.',
      'ob4.housing.title': 'Жильё',
      'ob4.housing.desc': 'Аренда, хостел, проживание',
      'ob4.food.title': 'Еда и кафе',
      'ob4.food.desc': 'Заказать, оплатить, попросить',
      'ob4.study.title': 'Учёба',
      'ob4.study.desc': 'Кампус, преподаватели, однокурсники',
      'ob4.social.title': 'Светская беседа',
      'ob4.social.desc': 'Быть дружелюбным, не неловким',
      'ob4.docs.title': 'Документы',
      'ob4.docs.desc': 'Банк, SIM-карта, официальные дела',
      'ob4.airport.title': 'Аэропорт',
      'ob4.airport.desc': 'Регистрация, таможня, транзит',
      'ob4.cta': 'Построить мой план →',

      // Plan ready
      'plan.headline': 'ТВОЙ ПЛАН<br>НА 7 ДНЕЙ ГОТОВ.',
      'plan.days': 'Дней',
      'plan.situations': 'Ситуаций',
      'plan.minday': 'Мин / день',
      'plan.cta': 'Начать День 1 →',

      // Dashboard
      'dash.day': 'ДЕНЬ 1',
      'dash.priority': 'ПРИОРИТЕТ',
      'dash.mission.title': 'Выживание в аэропорту',
      'dash.mission.desc': 'Ты только что приземлился. Вот что произойдёт дальше — и что говорить.',
      'dash.start': 'Начать практику →',
      'dash.confidence': 'Уровень уверенности',
      'dash.progress.done': 'ситуаций выполнено',
      'dash.progress.total': 'всего',
      'dash.quick.title': 'Быстрые ситуации',
      'dash.sit1': 'Спросить дорогу',
      'dash.sit2': 'Заказать еду в кафе',
      'dash.sit3': 'Представиться',
      'dash.sit4': 'Снять квартиру',
      'dash.min': 'мин',
      'dash.beginner': 'Начинающий',
      'dash.intermediate': 'Средний',
      'dash.emergency.title': 'Фразы экстренной помощи',
      'dash.emergency.tag': 'ВСЕГДА ПОЛЕЗНО',
      'dash.weak.title': 'Области для улучшения',
      'dash.listening': 'Слушание',
      'dash.speaking': 'Говорение',
      'dash.reading': 'Чтение',

      // Practice
      'prac.cat.moving': '🏠 ПЕРВАЯ НЕДЕЛЯ ЗА РУБЕЖОМ',
      'prac.cat.study':  '🏫 ВЫЖИВАНИЕ В УНИВЕРСИТЕТЕ',
      'prac.cat.work':   '🏢 ВЫЖИВАНИЕ В ОФИСЕ',
      'prac.cat.travel': '🗺️ ВЫЖИВАНИЕ В ПУТЕШЕСТВИИ',
      'prac.exit': '✕ Выйти',
      'prac.sit.tag': 'СИТУАЦИЯ',
      'prac.label': 'Твой ответ:',
      'prac.placeholder': 'Напиши, что бы ты сказал в этой ситуации…',
      'prac.submit': 'Получить обратную связь →',
      'prac.q': 'Вопрос',
      'prac.of': 'из',

      // Feedback
      'fb.score.good': 'Хорошая попытка',
      'fb.score.great': 'Отлично',
      'fb.score.needswork': 'Нужна работа',
      'fb.headline': 'ВОТ КАК<br>СКАЗАТЬ ЛУЧШЕ.',
      'fb.yousaid': 'ВАШ ОТВЕТ',
      'fb.better': 'ЛУЧШИЙ ВАРИАНТ',
      'fb.copy': 'Скопировать',
      'fb.grammar.label': 'ГРАММАТИКА',
      'fb.tone.label': 'ТОН',
      'fb.tryagain': 'Попробовать снова',
      'fb.next': 'Следующий вопрос →',
    },

    en: {
      'back': '← Back',
      'lang.toggle': 'RU',

      // Landing
      'hero.tag': 'SURVIVAL ENGLISH PLATFORM',
      'hero.accent': 'SURVIVE',
      'hero.line2': 'YOUR FIRST',
      'hero.line3': 'DAYS ABROAD.',
      'hero.sub': 'Not a language course. A survival kit.<br>Real situations. Real conversations. Real country.',
      'hero.cta': 'BUILD MY SURVIVAL PLAN',
      'hero.footnote': '7 days · Real situations · No fluff',
      'feat1.label': 'AIRPORT TO APARTMENT',
      'feat1.desc': 'Every situation you\'ll face in your first week, in order',
      'feat2.label': 'PRACTICE SPEAKING',
      'feat2.desc': 'Real-world scenarios with instant AI feedback',
      'feat3.label': 'SURVIVAL MODE',
      'feat3.desc': '3 days before your flight? We\'ve got a plan for that',

      // Onboarding 1
      'ob1.step': 'STEP 1 OF 4',
      'ob1.headline': 'WHAT BRINGS<br>YOU THERE?',
      'ob1.sub': 'We\'ll tailor your situations to your actual goals.',
      'ob1.moving.title': 'Moving abroad',
      'ob1.moving.desc': 'Long-term life change',
      'ob1.study.title': 'Studying',
      'ob1.study.desc': 'University or language school',
      'ob1.work.title': 'Work',
      'ob1.work.desc': 'Business or career move',
      'ob1.travel.title': 'Travel',
      'ob1.travel.desc': 'Visiting or exploring',
      'continue': 'Continue →',

      // Onboarding 2
      'ob2.step': 'STEP 2 OF 4',
      'ob2.headline': 'WHERE ARE<br>YOU HEADED?',
      'ob2.sub': 'Different countries, different accents, different norms.',

      // Onboarding 3
      'ob3.step': 'STEP 3 OF 4',
      'ob3.headline': 'HOW DO YOU FEEL<br>ABOUT SPEAKING?',
      'ob3.sub': 'Be honest — this shapes how we pace your plan.',
      'ob3.low': '😰 Too scared',
      'ob3.mid': '😐 Getting there',
      'ob3.high': '😎 Ready',

      // Onboarding 4
      'ob4.step': 'STEP 4 OF 4',
      'ob4.headline': 'WHAT SITUATIONS<br>MATTER MOST?',
      'ob4.sub': 'Select everything that applies. You can add more later.',
      'ob4.housing.title': 'Housing',
      'ob4.housing.desc': 'Rent, host, accommodation',
      'ob4.food.title': 'Food & Cafes',
      'ob4.food.desc': 'Order, pay, ask for things',
      'ob4.study.title': 'Study',
      'ob4.study.desc': 'Campus, professors, classmates',
      'ob4.social.title': 'Small talk',
      'ob4.social.desc': 'Be friendly, not awkward',
      'ob4.docs.title': 'Documents',
      'ob4.docs.desc': 'Bank, SIM card, official stuff',
      'ob4.airport.title': 'Airport',
      'ob4.airport.desc': 'Check-in, customs, transit',
      'ob4.cta': 'Build my plan →',

      // Plan ready
      'plan.headline': 'YOUR 7-DAY<br>SURVIVAL PLAN IS READY.',
      'plan.days': 'Days',
      'plan.situations': 'Situations',
      'plan.minday': 'Min / day',
      'plan.cta': 'Start Day 1 →',

      // Dashboard
      'dash.day': 'DAY 1',
      'dash.priority': 'PRIORITY',
      'dash.mission.title': 'Airport Survival',
      'dash.mission.desc': 'You\'ve just landed. Here\'s what\'s going to happen next — and what to say.',
      'dash.start': 'Start practice →',
      'dash.confidence': 'Confidence Level',
      'dash.progress.done': 'situations completed',
      'dash.progress.total': 'total',
      'dash.quick.title': 'Quick situations',
      'dash.sit1': 'Ask for directions',
      'dash.sit2': 'Order food at a cafe',
      'dash.sit3': 'Introduce yourself',
      'dash.sit4': 'Rent an apartment',
      'dash.min': 'min',
      'dash.beginner': 'Beginner',
      'dash.intermediate': 'Intermediate',
      'dash.emergency.title': 'Emergency phrases',
      'dash.emergency.tag': 'ALWAYS USEFUL',
      'dash.weak.title': 'Areas to strengthen',
      'dash.listening': 'Listening',
      'dash.speaking': 'Speaking',
      'dash.reading': 'Reading',

      // Practice
      'prac.cat.moving': '🏠 FIRST WEEK ABROAD',
      'prac.cat.study':  '🏫 CAMPUS SURVIVAL',
      'prac.cat.work':   '🏢 OFFICE SURVIVAL',
      'prac.cat.travel': '🗺️ TRAVEL SURVIVAL',
      'prac.exit': '✕ Exit',
      'prac.sit.tag': 'SITUATION',
      'prac.label': 'Your response:',
      'prac.placeholder': 'Type what you would say in this situation…',
      'prac.submit': 'Get AI Feedback →',
      'prac.q': 'Question',
      'prac.of': 'of',

      // Feedback
      'fb.score.good': 'Good try',
      'fb.score.great': 'Well done',
      'fb.score.needswork': 'Needs work',
      'fb.headline': 'HERE\'S HOW TO<br>SAY IT BETTER.',
      'fb.yousaid': 'YOU SAID',
      'fb.better': 'BETTER VERSION',
      'fb.copy': 'Copy phrase',
      'fb.grammar.label': 'GRAMMAR FIX',
      'fb.tone.label': 'TONE',
      'fb.tryagain': 'Try again',
      'fb.next': 'Next question →',
    },
  },

  t(key) {
    return (this.strings[this.current] && this.strings[this.current][key])
      || (this.strings.en[key])
      || key;
  },

  set(lang) {
    this.current = lang;
    localStorage.setItem('lang', lang);
  },
};

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = LANG.t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = LANG.t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = LANG.t(el.dataset.i18nPlaceholder);
  });
}
