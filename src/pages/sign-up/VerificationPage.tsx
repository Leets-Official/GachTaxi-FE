import { useState } from 'react';
import AuthCodeVerification from '../../components/sign/AuthCodeVerification';
import EmailVerification from '../../components/sign/EmailVerification';

const VerificationPage = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-[16px] text-white">
        <h1 className="text-header font-bold">
          가치택시에 오신 것을 <br /> 환영합니다!
        </h1>
        <p className="font-medium text-captionHeader">
          가천대학교 이메일로 인증할게요
        </p>
      </div>
      <EmailVerification
        isEmailVerified={isEmailVerified}
        setIsEmailVerified={setIsEmailVerified}
      />
      {isEmailVerified && <AuthCodeVerification />}
    </>
  );
};

export default VerificationPage;
