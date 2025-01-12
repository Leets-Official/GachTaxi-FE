import axios from 'axios';

interface KakaoLoginResponse {
  authorization: string;
  status: 'LOGIN' | 'UN_REGISTER';
}

export const kakaoLogin = async (
  authCode: string,
): Promise<KakaoLoginResponse> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login/kakao`,
      { authCode: authCode },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const authorization = res.headers['authorization'];
    const status = res.data.data.status;

    return { authorization, status };
  } catch (error) {
    throw new Error(`Kakao Login API Error: ${error}`);
  }
};
