import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';

interface ProtectSignUpRouteProps {
  children: ReactNode;
  isVerified: boolean;
  redirectTo: string;
}

const ProtectSignUpRoute = ({
  children,
  isVerified,
  redirectTo,
}: ProtectSignUpRouteProps) => {
  const { openToast } = useToast();
  setTimeout(() => openToast('이메일 인증을 먼저 진행해주세요!', 'error'));

  return isVerified ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectSignUpRoute;
