import { z } from 'zod';

// 개별 스키마
const studentIdSchema = z
  .string()
  .min(1, '학번을 입력해주세요!')
  .refine(
    (value) => {
      const number = Number(value);
      return !isNaN(number);
    },
    { message: '숫자로만 입력해주세요!' },
  );

const nickNameSchema = z.string().min(1, '닉네임을 입력해주세요!');

const realNameSchema = z.string().min(1, '본명을 입력해주세요!');

const genderSchema = z.enum(['MALE', 'FEMALE']).default('MALE');

const profileImageSchema = z.union([
  z.instanceof(File).refine(
    (file) => {
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    },
    {
      message: '이미지 형식은 JPEG, PNG이고 크기는 10MB를 넘을 수 없어요!',
    },
  ),
  z.string().url('사진 URL을 불러오는데 실패했어요!'),
]);

const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요!')
  .email({ message: '이메일 형식으로 작성 부탁드려요!' })
  .refine((email) => email.endsWith('@gachon.ac.kr'), {
    message: '가천대학교 이메일만 사용해주세요!',
  });

const phoneSchema = z
  .string()
  .min(1, '번호를 입력해주세요!')
  .refine(
    (value) => {
      const number = Number(value);
      return !isNaN(number);
    },
    { message: '숫자로만 입력해주세요!' },
  );

const authCodeSchema = z.string().min(1, '인증번호를 입력해주세요!');

// 약관 개별 스키마
const requiredAgreementSchema = z.boolean().refine((value) => value === true, {
  message: '필수 약관에 동의해주세요!',
});

const optionalAgreementSchema = z.boolean().default(false);

// 복합 스키마
export const emailVerificationSchema = z.object({
  email: emailSchema,
});

export const phoneVerificationSchema = z.object({
  phoneNumber: phoneSchema,
});

export const authCodeVerificationSchema = z.object({
  authCode: authCodeSchema,
  email: z.string(),
});

export const authCodeVerificationForPhoneSchema = z.object({
  authCode: authCodeSchema,
  phoneNumber: z.string(),
});

export const userInfoVerificationSchema = z.object({
  profileImage: profileImageSchema,
  nickName: nickNameSchema,
  realName: realNameSchema,
  studentId: studentIdSchema,
  gender: genderSchema,
});

export const agreementsSchema = z.object({
  termsAgreement: requiredAgreementSchema,
  privacyAgreement: requiredAgreementSchema,
  marketingAgreement: optionalAgreementSchema,
});
