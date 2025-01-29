import { Navigate } from 'react-router-dom';
import isTokenValid from '@/utils/isTokenValid';
import { useToast } from '@/contexts/ToastContext';

const ProtectRoute = ({
  children,
  isPrivate,
}: {
  children: React.ReactNode;
  isPrivate?: boolean;
}) => {
  const isLogin = () => {
    if (isPrivate) {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('user');
      return !!token && isTokenValid(token) && !!userData;
    } else {
      const token = localStorage.getItem('accessToken');
      return !!token && isTokenValid(token);
    }
  };

  const isLogined = isLogin();
  const { openToast } = useToast();

  if (!isLogined) {
    setTimeout(
      () =>
        openToast(
          isPrivate
            ? '서비스 사용 전에 로그인이 필요해요!'
            : '회원가입을 먼저 진행해주세요!',
          'error',
        ),
      0,
    );
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
