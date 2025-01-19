import axios from 'axios';

const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw error;
  } else {
    throw new Error('axios가 정의하는 에러 범주에서 벗어납니다.');
  }
};

export default handleAxiosError;
