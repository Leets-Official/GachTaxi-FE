import { useGoogleLogin } from '@react-oauth/google';

const GoogleSocialLogin = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return <button onClick={() => googleLogin()}>구글 로그인</button>;
};

export default GoogleSocialLogin;
