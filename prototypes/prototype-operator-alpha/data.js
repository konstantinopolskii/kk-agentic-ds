// Operator review-state seed for the Signed-workshop prototype.
// Static fixture — one moment in time. No stage transitions, no brief
// iteration, no resort on sign. Seven open threads across two research
// sources and five strategy subsections. Signoff pending.

window.PROTO = {

  // Mentee carried across from prototype-alpha as the voice + content
  // anchor. Russian subsection names are approved content; names and
  // numeric seed values are also content anchors. Everything else
  // that renders as a user-facing string is a placeholder comment in
  // index.html for the copywriter (stage 9).
  mentee: {
    name: 'Нелли Кам',
    role: 'Lead Innovation Product Designer',
    call: {
      id: 'KK-Nelly-Kam-2d99cc63',
      date: '21 апреля 2026',
      duration: '32 минуты'
    }
  },

  // Seven open threads, flat insertion order. Each thread carries a
  // section id + anchor quote used to wrap a .highlight span in the
  // doc body. Each carries one seed message from the operator and
  // one agent-proposal reply (data-author-role="agent"). Approve
  // (via kit v0.13.0 kebab) emits kk:comment { action: 'approve' }
  // and app.js rewrites the anchored span with the agent's proposal
  // text.
  //
  // authorRole lifecycle:
  //   - seed message: data-author-role absent (operator-authored).
  //   - agent proposal: data-author-role="agent" → Approve shows.
  //   - operator reply to reject with answer: authorRole absent.
  //     Agent proposal no longer last → Approve hides. Thread stays
  //     open, still feeds context stream until archived or approved.
  threads: [
    {
      id: 't1',
      section: 'point-a',
      anchorQuote: 'Ничего не заканчивается',
      seed: {
        author: 'Konstantin Konstantinopolskii',
        body: 'Прямая цитата со звонка. В «Точке А» звучит как диагноз, а не как блок к снятию.'
      },
      agentProposal: {
        author: 'Wealthy',
        body: 'Блок — микроменеджмент и работа в стол. Дословно: «Ничего не заканчивается до успешного успеха». Снимается делегированием UI двум спецам и фиксированным релиз-коридором.'
      }
    },
    {
      id: 't2',
      section: 'positioning',
      anchorQuote: 'Прекратить транслировать неуверенность',
      seed: {
        author: 'Konstantin Konstantinopolskii',
        body: 'Какую именно фразу вычёркиваем? «Не шарю в UI» или всю цепочку самоописания?'
      },
      agentProposal: {
        author: 'Wealthy',
        body: 'Убрать из CV и первого письма строку «не шарю в UI». На её месте — «AI-интерфейсы и Conversational UX, основная ниша, семь лет, Alan AI в портфолио». Остальное самоописание переходит в финальный абзац.'
      }
    },
    {
      id: 't3',
      section: 'positioning',
      anchorQuote: 'Делегирование двум проверенным спецам',
      seed: {
        author: 'Konstantin Konstantinopolskii',
        body: 'Два спеца сразу — много. Начать с одного на два месяца, иначе сплит внимания уйдёт в менеджмент.'
      },
      agentProposal: {
        author: 'Wealthy',
        body: 'Делегирование начинается с одного проверенного UI-спеца на два месяца, один проект, десять часов в неделю. Нелли держит архитектуру и ревью. Второй спец подключается после закрытия первого контракта.'
      }
    },
    {
      id: 't4',
      section: 'hypotheses-channels',
      anchorQuote: 'Фаундеры читают прямые сообщения в LinkedIn',
      seed: {
        author: 'Konstantin Konstantinopolskii',
        body: 'Гипотеза годится, но без правила для первой строки письма она не работает.'
      },
      agentProposal: {
        author: 'Wealthy',
        body: 'Фаундеры читают прямые сообщения в LinkedIn, если первая строка цитирует их последний релиз или питч. Правило — одна фраза по их продукту, одна по Founding Designer, остальное в следующем письме.'
      }
    },
    {
      id: 't5',
      section: 'next-steps',
      anchorQuote: 'Ассистентка и 25 инвайтов',
      seed: {
        author: 'Konstantin Konstantinopolskii',
        body: 'Перед полной воронкой стоит один короткий тестовый контракт, 1-2k USD, чтобы проверить сам оффер.'
      },
      agentProposal: {
        author: 'Wealthy',
        body: 'Шаг первый — один короткий тестовый контракт 1-2 000 USD на две недели, через прямой контакт из нетворка. Шаг второй — ассистентка и 25 инвайтов в день целевым ролям, 30 разговоров в месяц к концу июня.'
      }
    },
    {
      id: 't6',
      section: 'research-1',
      anchorQuote: 'LinkedIn Jobs, апрель 2026',
      seed: {
        author: 'Konstantin Konstantinopolskii',
        body: 'Одного источника мало. Нужен кросс-чек по тому же временному окну.'
      },
      agentProposal: {
        author: 'Wealthy',
        body: 'Источник — LinkedIn Jobs, апрель 2026. Кросс-чек — Wellfound (бывший AngelList), та же выборка AI-стартапов Seed и Series A. Расхождение в пределах 8% по объёму вакансий.'
      }
    },
    {
      id: 't7',
      section: 'research-1',
      anchorQuote: 'Taplio, Dripify работают',
      seed: {
        author: 'Konstantin Konstantinopolskii',
        body: 'Риск блокировки — слово, не число. Дайте срок жизни аккаунта под двумя режимами автоматизации.'
      },
      agentProposal: {
        author: 'Wealthy',
        body: 'Taplio и Dripify работают. Щадящий режим 25 инвайтов в день — срок жизни аккаунта 14-20 недель. Агрессивный 50+ действий в день — 4-6 недель. Риск блокировки становится числом.'
      }
    }
  ]
};
