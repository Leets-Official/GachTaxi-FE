import BackIcon from '../../assets/icon/backIcon.svg?react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import VerificationPage from './VerificationPage';
import NotFoundPage from '../NotFound';
import Button from '../../components/commons/Button';
import UserInfoPage from './UserInfoPage';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="max-w-[360px] w-full mx-auto p-vertical flex flex-col gap-[32px] mb-vertical">
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
    </section>
  );
};

export default SignUpPage;
