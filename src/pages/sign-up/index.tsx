import { Routes, Route, useLocation } from 'react-router-dom';
import VerificationPage from './VerificationPage';
import NotFoundPage from '../NotFound';
import UserInfoPage from './UserInfoPage';
import LocationTaxiIcon from '@/assets/icon/locationTaxiIcon.svg?react';
import BackButton from '@/components/commons/BackButton';

const SignUpPage = () => {
  const { pathname } = useLocation();

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal relative">
      {pathname !== '/signup/user-info' && <BackButton />}
      <Routes>
        {/** 소셜 로그인 Route */}
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/user-info" element={<UserInfoPage />} />
        {/* not-found 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {pathname !== '/signup/user-info' && (
        <div className="absolute left-0 bottom-2 w-full">
          <LocationTaxiIcon className="ml-auto " />
        </div>
      )}
    </section>
  );
};

export default SignUpPage;
