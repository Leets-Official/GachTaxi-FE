import { Routes, Route, useLocation } from 'react-router-dom';
import VerificationPage from './VerificationPage';
import NotFoundPage from '../NotFound';
import UserInfoPage from './UserInfoPage';
import BackButton from '@/components/commons/BackButton';

const SignUpPage = () => {
  const { pathname } = useLocation();

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal">
      {pathname !== '/signup/user-info' && <BackButton />}
      <Routes>
        {/** 소셜 로그인 Route */}
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/user-info" element={<UserInfoPage />} />
        {/* not-found 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </section>
  );
};

export default SignUpPage;
