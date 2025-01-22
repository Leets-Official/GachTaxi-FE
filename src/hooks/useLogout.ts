import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('accessToken');

    navigate('/');
  };

  return { onLogout };
};

export default useLogout;
