import { z } from 'zod';

// 단일 스키마
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

const genderSchema = z.enum(['male', 'female']);

const profileImageSchema = z.optional(
  z
    .union([
      z.instanceof(File),
      z.string().url('사진 URL을 불러오는데 실패했어요!'),
    ])
    .refine(
      (value) => {
        if (value instanceof File) {
          const validTypes = ['image/jpeg', 'image/png'];
          const maxSize = 10 * 1024 * 1024; // 10MB
          return validTypes.includes(value.type) && value.size <= maxSize;
        }
        return true;
      },
      {
        message: '이미지 형식은 JPEG, PNG이고 크기는 10MB를 넘을 수 없어요!',
      },
    ),
);

const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요!')
  .email({ message: '이메일 형식으로 작성 부탁드려요!' });

const authCodeSchema = z.string().min(1, '인증번호를 입력해주세요!');

// 복합 스키마
export const emailVerificationSchema = z.object({
  email: emailSchema,
});

export const authCodeVerificationSchema = z.object({
  authCode: authCodeSchema,
});

export const userInfoVerificationSchema = z.object({
  profileImage: profileImageSchema,
  nickName: nickNameSchema,
  realName: realNameSchema,
  studentId: studentIdSchema,
  gender: genderSchema,
});
