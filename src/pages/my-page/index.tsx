// import Notice from './Notice';
// import Inquiry from './Inquiry';
// import Usage from './Usage';
// import Notification from './Notification';
// import PhoneVerification from './PhoneVerification';
import MyProfileHeader from '@/components/my-page/MyProfileHeader';
import MyPageButton from '@/components/my-page/MyPageButton';
import BackButton from '@/components/commons/BackButton';

const MyPage = () => {
  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal">
      <BackButton />
      <h1 className="text-header font-bold">마이페이지</h1>

      <MyProfileHeader />
      <MyPageButton />
    </section>
  );
};

export default MyPage;
