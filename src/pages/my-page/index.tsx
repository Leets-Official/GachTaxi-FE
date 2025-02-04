import Notice from './Notice';
import Inquiry from './Inquiry';
import Usage from './Usage';
import MyProfileHeader from '@/components/my-page/MyProfileHeader';
import MyPageButton from '@/components/my-page/MyPageButton';
import BackButton from '@/components/commons/BackButton';
import { Route, Routes } from 'react-router-dom';
import EditProfilePage from './EditProfilePage';

const DefaultMyPage = () => {
  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal">
      <BackButton />
      <h1 className="text-header font-bold">마이페이지</h1>
      <MyProfileHeader />
      <MyPageButton />
    </section>
  );
};

const MyPage = () => {
  return (
    <Routes>
      <Route index element={<DefaultMyPage />} />
      <Route path="notice" element={<Notice />} />
      <Route path="inquiry" element={<Inquiry />} />
      <Route path="useage" element={<Usage />} />
      <Route path="edit-profile" element={<EditProfilePage />} />
    </Routes>
  );
};

export default MyPage;
