import BackIcon from '../../assets/icon/backIcon.svg?react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import VerificationPage from './VerificationPage';
import NotFoundPage from '../NotFound';
import Button from '../../components/commons/Button';
import UserInfoPage from './UserInfoPage';
import LocationTaxiIcon from '@/assets/icon/locationTaxiIcon.svg?react';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal relative">
      {pathname !== '/signup/user-info' && (
        <Button variant="icon" onClick={handleBack}>
          <BackIcon />
        </Button>
      )}
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
