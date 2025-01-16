export const DAY_PERIOD = ['오전', '오후'];

export const HOURS = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, '0'),
);

export const MINUTES = Array.from({ length: 6 }, (_, i) =>
  i.toString().padEnd(2, '0'),
);
