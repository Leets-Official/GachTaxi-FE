import BackButton from '@/components/commons/BackButton';
import LocationTaxiIcon from '@/assets/icon/locationTaxiIcon.svg?react';
import { useState } from 'react';
import AuthCodeVerificationForPhone from '@/components/phoneVerification/AuthCodeVerificationForPhone';
import PhoneVerification from '@/components/phoneVerification/PhoneVerification';

const PhoneVerificationPage = () => {
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneNumInfo, setPhoneNumInfo] = useState<string>('');

  return (
    <section className="flex-1 w-full flex flex-col gap-[48px] p-horizontal relative">
      <BackButton />

      <div className="flex flex-col gap-[16px] text-white">
        <h1 className="text-header font-bold">
          서비스를 이용하려면 <br /> 번호 인증이 필요해요
        </h1>
        <p className="font-medium text-captionHeader">
          안전한 이용을 위한 과정이에요
        </p>
      </div>
      <PhoneVerification
        isPhoneVerified={isPhoneVerified}
        setIsPhoneVerified={setIsPhoneVerified}
        setPhoneNumInfo={setPhoneNumInfo}
      />
      {isPhoneVerified && (
        <AuthCodeVerificationForPhone phoneNumInfo={phoneNumInfo} />
      )}

      <div className="absolute left-0 bottom-2 w-full">
        <LocationTaxiIcon className="ml-auto " />
      </div>
    </section>
  );
};

export default PhoneVerificationPage;
