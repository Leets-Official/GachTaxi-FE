declare module 'gachTaxi-types' {
  interface EmailVerificationTypes {
    email: string;
  }

  // 회원가입 응답 타입 종속
  type DataType = {
    userId: number;
  };

  // 회원가입 응답 타입
  interface SignUpFlowResponse {
    code: number;
    message: string;
    data: DataType | null;
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
    profileImage: file | string | undefined;
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
