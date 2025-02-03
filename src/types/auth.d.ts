declare module 'gachTaxi-types' {
  interface EmailVerificationTypes {
    email: string;
  }

  // 회원가입 응답 타입
  interface SignUpFlowResponse {
    code: number;
    message: string;
    data: UserResponse;
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
    profilePicture?: file | string | undefined;
    nickname: string;
    realName: string;
    studentNumber: string;
    gender: 'MALE' | 'FEMALE';
    accountNumber?: string;
  }

  interface AgreementsTypes {
    termsAgreement: boolean;
    privacyAgreement: boolean;
    marketingAgreement: boolean;
  }

  interface MemberResponseDto {
    userId: number;
    studentNumber: number;
    nickName: string;
    realName: string;
    profilePicture: null;
    email: string;
    role: string;
    gender: string;
  }

  // 회원가입 또는 로그인 시 반환되는 유저 정보
  interface UserResponse {
    memberResponseDto: MemberResponseDto | null;
  }
}
