import { Routes, Route, useLocation } from 'react-router-dom';
import VerificationPage from './VerificationPage';
import NotFoundPage from '../NotFound';
import UserInfoPage from './UserInfoPage';
import LocationTaxiIcon from '@/assets/icon/locationTaxiIcon.svg?react';
import BackButton from '@/components/commons/BackButton';
import ProtectSignUpRoute from '@/components/sign/ProtectSignUpRoute';
import { useState } from 'react';

const SignUpPage = () => {
  const { pathname } = useLocation();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const isUserInfoPage = pathname !== '/signup/user-info';

  return (
    <section className="flex-1 w-full flex flex-col gap-[48px] p-horizontal relative">
      {isUserInfoPage && <BackButton usedPage="signUpPage" />}
      <Routes>
        {/** 소셜 로그인 Route */}
        <Route
          path="/verification"
          element={<VerificationPage setIsVerified={setIsVerified} />}
        />
        <Route
          path="/user-info"
          element={
            <ProtectSignUpRoute
              isVerified={isVerified}
              redirectTo="/signup/verification"
            >
              <UserInfoPage />
            </ProtectSignUpRoute>
          }
        />
        {/* not-found 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {isUserInfoPage && (
        <div className="absolute left-0 bottom-2 w-full">
          <LocationTaxiIcon className="ml-auto " />
        </div>
      )}
    </section>
  );
};

export default SignUpPage;
