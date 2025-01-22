declare module 'gachTaxi-types' {
  interface EmailVerificationTypes {
    email: string;
  }

  interface PhoneVerificationTypes {
    phoneNumber: string;
  }

  interface AuthCodeTypes {
    authCode: string;
    email: string;
  }

  interface AuthCodeForPhoneTypes {
    authCode: string;
    phoneNumber: string;
  }

  interface UserInfoVerificationTypes {
    profileImage: file | string;
    nickName: string;
    realName: string;
    studentId: string;
    gender: 'MALE' | 'FEMALE';
  }

  interface AgreementsTypes {
    termsAgreement: boolean;
    privacyAgreement: boolean;
    marketingAgreement: boolean;
  }
}
