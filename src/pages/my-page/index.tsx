import Button from '@/components/commons/Button';
import BackIcon from '@/assets/icon/backIcon.svg?react';
import { useNavigate } from 'react-router-dom';
// import Notice from './Notice';
// import Inquiry from './Inquiry';
// import Usage from './Usage';
// import Notification from './Notification';
// import PhoneVerification from './PhoneVerification';
import MyProfileHeader from '@/components/my-page/MyProfileHeader';
import MyPageButton from '@/components/my-page/MyPageButton';

const MyPage = () => {
  const nav = useNavigate();

  const handleBack = () => {
    nav(-1);
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal">
      <Button variant="icon" onClick={handleBack}>
        <BackIcon />
      </Button>
      <h1 className="text-header font-bold">마이페이지</h1>

      <MyProfileHeader />
      <MyPageButton />
    </section>
  );
};

export default MyPage;
