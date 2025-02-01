const formatToKoreanTime = (time: string): string => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours < 12 ? '오전' : '오후';
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${period} ${formattedHours}:${formattedMinutes}`;
};

export default formatToKoreanTime;
