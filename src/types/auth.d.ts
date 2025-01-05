declare module 'gachTaxi-types' {
  interface EmailVerificationTypes {
    email: string;
  }

  interface AuthCodeTypes {
    authCode: string;
  }

  interface UserInfoVerificationTypes {
    profileImage: file | string;
    nickName: string;
    realName: string;
    studentId: string;
    gender: string;
  }
}
