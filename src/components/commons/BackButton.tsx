import Button from '@/components/commons/Button';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/icon/backIcon.svg?react';

interface BackButtonProps {
  usedPage?: string;
}

const BackButton = ({ usedPage }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (usedPage === 'signUpPage') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <Button variant="icon" onClick={handleBack}>
      <BackIcon />
    </Button>
  );
};

export default BackButton;
