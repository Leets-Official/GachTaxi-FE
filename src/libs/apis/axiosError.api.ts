import axios from 'axios';

const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage =
      error.response?.data?.message || '서버 요청 중 오류가 발생했습니다.';
    console.error(error.response?.data);
    return errorMessage;
  } else {
    return 'axios가 정의하는 에러 범주에서 벗어납니다.';
  }
};

export default handleAxiosError;
