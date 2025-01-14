import { useNavigate } from 'react-router-dom';

const LogOutButton: React.FC = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return <button onClick={onLogout}>로그아웃</button>;
};

export default LogOutButton;
