import { Navigate, Outlet } from 'react-router-dom';
import isTokenValid from '@/utils/isTokenValid';
import { useToast } from '@/contexts/ToastContext';
import { useMemo } from 'react';

const ProtectRoute = () => {
  const isLogin = useMemo(() => {
    const token = localStorage.getItem('accessToken');
    return token && isTokenValid(token);
  }, []);
  const { openToast } = useToast();

  if (!isLogin) {
    setTimeout(
      () => openToast('서비스 사용 전에 로그인이 필요해요!', 'error'),
      0,
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectRoute;
