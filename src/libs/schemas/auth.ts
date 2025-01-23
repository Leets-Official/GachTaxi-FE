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

const profileImageSchema = z.optional(
  z
    .union([
      z.instanceof(File, {
        message: '유효한 이미지가 아니에요!',
      }),
      z
        .string()
        .url('유효한 이미지 URL이 아니에요!')
        .min(1, '이미지 URL이 필요해요!'),
    ])
    .refine(
      (value) => {
        if (value instanceof File) {
          const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
          const maxSize = 10 * 1024 * 1024;
          return validTypes.includes(value.type) && value.size <= maxSize;
        }
        return true;
      },
      {
        message:
          '지원되는 이미지 형식(JPEG, PNG, GIF)이어야 하며, 10MB를 초과할 수 없어요!',
      },
    ),
);

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
  profilePicture: profileImageSchema,
  nickname: nickNameSchema,
  realName: realNameSchema,
  studentNumber: studentIdSchema,
  gender: genderSchema,
});

export const agreementsSchema = z.object({
  termsAgreement: requiredAgreementSchema,
  privacyAgreement: requiredAgreementSchema,
  marketingAgreement: optionalAgreementSchema,
});
