const BOARD_SITUATIONS = [
  { text: 'AIRPORT CHECK-IN', location: 'NEW YORK' },
  { text: 'RENT AN APARTMENT', location: 'LONDON' },
  { text: 'ORDER AT A CAFE', location: 'TORONTO' },
  { text: 'BUY A SIM CARD', location: 'SYDNEY' },
  { text: 'INTRODUCE YOURSELF', location: 'BOSTON' },
  { text: 'VISIT THE DOCTOR', location: 'CHICAGO' },
  { text: 'MEET YOUR CLASSMATES', location: 'EDINBURGH' },
  { text: 'ASK FOR DIRECTIONS', location: 'MELBOURNE' },
];

const STRESS_LEVELS = [
  { min: 0, max: 20, emoji: '😰', text: "I'm scared to speak" },
  { min: 21, max: 40, emoji: '😬', text: "A little nervous, honestly" },
  { min: 41, max: 60, emoji: '😐', text: "I can manage basic things" },
  { min: 61, max: 80, emoji: '🙂', text: "Getting more confident" },
  { min: 81, max: 100, emoji: '😎', text: "Ready for real practice" },
];

const AIRPORT_SCENARIOS = [
  {
    id: 1,
    speaker: '👮',
    role: 'Border Control Officer',
    question: 'What is the purpose of your visit?',
    context: "You've just arrived at passport control. The officer is looking at your documents and waiting for your answer.",
    hint: '💡 Tip: Be specific and formal. Mention studying, work, or tourism.',
    sampleAnswer: "I'm here to study for a short-term academic program.",
    feedback: {
      score: 'good',
      improved: "I'm here to study at [University] as part of a full-time degree program.",
      grammarNote: 'Use "I\'m here to" — it\'s the natural, native phrase. Avoid "I come for" or "I am come to".',
      toneNote: 'Border officers want brief, confident answers. Name the institution if possible — it shows you\'re prepared.',
      issues: ['grammar', 'informal'],
    },
  },
  {
    id: 2,
    speaker: '👮',
    role: 'Border Control Officer',
    question: 'How long do you plan to stay?',
    context: 'The officer is reviewing your visa stamp and wants to confirm your stay duration.',
    hint: '💡 Tip: Give a specific duration. Match it to your visa.',
    sampleAnswer: "I'll be staying for approximately one year on a student visa.",
    feedback: {
      score: 'great',
      improved: "I'll be staying for one year. I have a student visa valid until [date].",
      grammarNote: '"I\'ll be staying" is the correct future continuous — shows a planned, ongoing situation.',
      toneNote: 'Mentioning the visa type proactively shows you\'re organized and confident. Officers appreciate it.',
      issues: [],
    },
  },
  {
    id: 3,
    speaker: '👮',
    role: 'Border Control Officer',
    question: 'Do you have accommodation arranged?',
    context: "The officer wants to know where you'll be living. Have your address or dorm name ready.",
    hint: '💡 Tip: Yes/No + a brief detail. Name the place if you can.',
    sampleAnswer: 'Yes, I\'m staying at university accommodation in the city center.',
    feedback: {
      score: 'great',
      improved: "Yes, I have accommodation confirmed — I'll be at [Name] student residence.",
      grammarNote: '"I have accommodation confirmed" is more formal and natural than "I have accommodation arranged".',
      toneNote: 'Give a specific name or address if you have it. Vague answers can cause delays.',
      issues: [],
    },
  },
  {
    id: 4,
    speaker: '✈️',
    role: 'Check-in Agent',
    question: "Could I see your passport and booking confirmation?",
    context: "You're at the check-in counter. The agent needs your documents before issuing your boarding pass.",
    hint: '💡 Tip: Respond calmly and hand over documents. You can ask about luggage here.',
    sampleAnswer: "Of course, here you are. Could I also check my luggage allowance?",
    feedback: {
      score: 'great',
      improved: "Of course, here you are. Could you also confirm how many bags I can check in?",
      grammarNote: '"Here you are" is the standard polite phrase when handing something. "Could you confirm..." sounds more natural than "Could I check...".',
      toneNote: 'Adding a follow-up question in one turn is smart — you save time and sound confident.',
      issues: [],
    },
  },
];

const PLAN_ITEMS_BY_GOAL = {
  moving: [
    { icon: '✈️', label: '<strong>Day 1–2:</strong> Airport & first hours' },
    { icon: '🏠', label: '<strong>Day 3–4:</strong> Housing & neighborhood basics' },
    { icon: '🧾', label: '<strong>Day 5–6:</strong> Documents, SIM card, bank' },
    { icon: '💬', label: '<strong>Day 7:</strong> Small talk & meeting people' },
  ],
  study: [
    { icon: '✈️', label: '<strong>Day 1:</strong> Airport & arrival' },
    { icon: '🏫', label: '<strong>Day 2–3:</strong> Campus, admin office, registration' },
    { icon: '👥', label: '<strong>Day 4–5:</strong> Meeting classmates & professors' },
    { icon: '🍔', label: '<strong>Day 6–7:</strong> Everyday life & social English' },
  ],
  work: [
    { icon: '✈️', label: '<strong>Day 1:</strong> Airport & transit' },
    { icon: '🏢', label: '<strong>Day 2–3:</strong> Office intro, meetings, small talk' },
    { icon: '💬', label: '<strong>Day 4–5:</strong> Networking & professional English' },
    { icon: '🏠', label: '<strong>Day 6–7:</strong> Life admin & community' },
  ],
  travel: [
    { icon: '✈️', label: '<strong>Day 1:</strong> Airport & hotel check-in' },
    { icon: '🍔', label: '<strong>Day 2–3:</strong> Restaurants, cafes, ordering' },
    { icon: '🗺️', label: '<strong>Day 4–5:</strong> Directions, transport, sightseeing' },
    { icon: '🛍️', label: '<strong>Day 6–7:</strong> Shopping & emergency phrases' },
  ],
};
