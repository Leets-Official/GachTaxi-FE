import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import { withdrawUser } from '@/libs/apis/withdrawUser.api';

const useWithdraw = () => {
  const navigate = useNavigate();
  const { openToast } = useToast();

  const onWithdraw = async () => {
    try {
      const response = await withdrawUser();

      if (response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        openToast('계정이 성공적으로 탈퇴되었습니다.');
        navigate('/');
      } else {
        throw new Error('계정 탈퇴 실패');
      }
    } catch (error) {
      console.error('탈퇴 중 오류 발생:', error);
    }
  };

  return { onWithdraw };
};

export default useWithdraw;
