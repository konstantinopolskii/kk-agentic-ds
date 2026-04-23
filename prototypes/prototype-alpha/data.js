// Mock data for the Wealthy pipeline prototype.
// Two surfaces (operator, client) share one document. This file holds only
// dynamic state — seed comment threads, the mentee deck, tier inventory.
// Static strategy body lives in index.html.

window.PROTO = {
  mentee: {
    name: 'Нелли Кам',
    role: 'Lead Innovation Product Designer',
    goalSummary: 'Переход к Founding Designer в AI-стартапах США. Цель — 10 000 USD в месяц и виза Passeport Talent во Францию.',
    call: {
      id: 'KK-Nelly-Kam-2d99cc63',
      date: '21 апреля 26',
      duration: '32 минуты',
      participants: ['Konstantin Konstantinopolskii', 'Nelly Kam']
    }
  },

  // Seed comment threads attached to section ids + anchor quotes.
  // `agentProposal` is the text the agent suggests to replace the anchor.
  // Status lifecycle: open -> resolved-accepted | resolved-rejected | abandoned.
  threads: [
    {
      id: 't1',
      section: 'positioning',
      anchorQuote: 'Прекратить транслировать неуверенность',
      author: 'Konstantin Konstantinopolskii',
      authorRole: 'operator',
      message: 'Слишком абстрактно. Нужен конкретный тригер: где именно эта фраза всплывает у неё в речи.',
      agentProposal: 'Убрать фразу «я не шарю UI» из первых трёх минут любого пичеса, CV и раздела About на сайте. Вместо этого — один пример сложного AI-интерфейса из Alan AI.',
      status: 'open',
      createdAt: '21 апр 14:02'
    },
    {
      id: 't2',
      section: 'market-findings',
      anchorQuote: 'Taplio, Dripify работают',
      author: 'Konstantin Konstantinopolskii',
      authorRole: 'operator',
      message: 'Про автоматизацию LinkedIn нужен trade-off: сколько живёт аккаунт до бана. Без этого гипотеза висит.',
      agentProposal: 'Средняя жизнь LinkedIn аккаунта с агрессивной автоматизацией (50+ действий в день) — 6-8 недель до soft ban. С умеренной автоматизацией (15-20 действий) — 6-12 месяцев. Источник: обзор 2024 в SmartLead, кейсы в GrowthHackers.',
      status: 'open',
      createdAt: '21 апр 14:08'
    },
    {
      id: 't3',
      section: 'next-steps',
      anchorQuote: 'Ассистентка + 25 инвайтов/день',
      author: 'Konstantin Konstantinopolskii',
      authorRole: 'operator',
      message: 'Добавь строку про тестовый контракт на $1-2k до большого офера. Без промежуточной цели большой прыжок рискует.',
      agentProposal: 'Тестовый контракт: взять один короткий проект на 2-4 недели за 1 500-2 500 USD до октября. Цель — проверить воронку без тяжёлой подписки. Результат: референс и живой кейс для следующих переговоров.',
      status: 'open',
      createdAt: '21 апр 14:15'
    },
    {
      id: 't4',
      section: 'point-a',
      anchorQuote: 'Ничего не заканчивается',
      author: 'Konstantin Konstantinopolskii',
      authorRole: 'operator',
      message: 'Резко. Её слова почти дословно. Хорошо. Оставить.',
      agentProposal: null,
      status: 'resolved-accepted',
      createdAt: '21 апр 13:55'
    }
  ],

  // Mentee deck for the operator brief state (stage 1).
  // First entry is the currently selected one.
  deck: [
    { name: 'Нелли Кам', role: 'Lead Innovation Product Designer', lastCall: '21 апр 26' },
    { name: 'Анастасия Арановская', role: 'Head of Project Office, Rivalty', lastCall: '12 апр 26' },
    { name: 'Влад Осипов', role: 'Pre-press, 20 years', lastCall: '05 апр 26' },
    { name: 'Борис Сергеев', role: 'Product Manager, FinTech', lastCall: '29 мар 26' },
    { name: 'Катерина Лыс', role: 'Founder, early B2B SaaS', lastCall: '18 мар 26' }
  ],

  // Tier inventory for the client view.
  // Prices render only when reviewShared = true.
  tiers: [
    {
      id: 'community',
      name: 'Сообщество',
      price: 'бесплатно',
      priceGated: false,
      lineItems: [
        'Доступ к групповому чату менти',
        'Базовая библиотека стратегий',
        'Один открытый ресерч в месяц'
      ],
      cta: 'Войти в чат',
      href: 'https://boosty.to/kk-consulting/community'
    },
    {
      id: 'expert',
      name: 'Эксперт',
      price: '200 USD / месяц',
      priceGated: true,
      lineItems: [
        'Один звонок 30 минут в неделю',
        'Асинхронная поддержка в течение суток',
        'Новая стратегия каждый квартал',
        'Доступ ко всей базе ресерчей'
      ],
      cta: 'Оформить',
      href: 'https://boosty.to/kk-consulting/expert'
    },
    {
      id: 'pro',
      name: 'Про',
      price: '500 USD / месяц',
      priceGated: true,
      lineItems: [
        'Два звонка 30 минут в неделю',
        'Приоритет ответа в течение часа',
        'Стратегия по запросу, без очереди',
        'Персональная библиотека ресерчей'
      ],
      cta: 'Оформить',
      href: 'https://boosty.to/kk-consulting/pro'
    },
    {
      id: 'free',
      name: 'Бесплатный путь',
      price: '0 USD',
      priceGated: false,
      lineItems: [
        'Эта стратегия навсегда в доступе',
        'Транскрипция звонка после отзыва',
        'Инструкция, как применять без нас'
      ],
      cta: 'Сейчас активно',
      href: '#sign-transcript'
    }
  ],

  // Initial UI state. Mutated by app.js.
  state: {
    role: 'operator',      // operator | client
    stage: 4,              // 1..7 — only meaningful for operator
    reviewShared: false,   // client — unlocks price + transcript + upgrade
    transcriptSigned: false,
    clientComments: 0
  }
};
