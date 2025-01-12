import Button from '@/components/commons/Button';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/icon/backIcon.svg?react';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="icon" onClick={handleBack}>
      <BackIcon />
    </Button>
  );
};

export default BackButton;
