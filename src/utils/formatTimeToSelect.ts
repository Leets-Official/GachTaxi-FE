const formatTimeToSelect = (time: string) => {
  const formatTime = time;

  const dayOrNight =
    Number(formatTime.slice(0, 2)) / 12 === 1 ? '오후' : '오전';
  const hour = formatTime.slice(0, 2);
  const min = formatTime.slice(3, 5);

  return { dayOrNight, hour, min };
};

export default formatTimeToSelect;
