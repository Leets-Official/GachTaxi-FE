import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/icon/backIcon.svg?react';

const LogOutButton: React.FC = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return (
    <div
      onClick={onLogout}
      className="flex justify-between items-center w-full text-captionHeader"
    >
      로그아웃
      <BackIcon className="rotate-180" />
    </div>
  );
};

export default LogOutButton;
