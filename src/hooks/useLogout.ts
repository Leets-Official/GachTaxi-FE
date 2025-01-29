import useUserStore from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();
  const { clearUser } = useUserStore();

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    clearUser();
    navigate('/');
  };

  return { onLogout };
};

export default useLogout;
