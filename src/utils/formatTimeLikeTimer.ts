// 시간을 타이머 형식으로 포맷하는 함수 00:00 형식
const formatTimeLikeTimer = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default formatTimeLikeTimer;
