const formatTime = (data: Date | string | string[] | undefined) => {
  const formatTime = data!.toString();

  const time = formatTime.split(' ')[1];
  const [hour, minute] = time.split(':');

  return { hour, minute };
};

export default formatTime;
