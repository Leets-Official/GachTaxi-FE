import { z } from 'zod';

// Regex
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요!')
  .email({ message: '이메일 형식으로 작성 부탁드려요!' });

const passwordSchema = z
  .string()
  .min(8, '8자 이상으로 입력해주세요!')
  .max(12, '12자 이하로 입력해주세요!')
  .refine((value) => passwordRegex.test(value), {
    message: '영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요!',
  });

const passwordConfirmSchema = z
  .string()
  .min(8, '비밀번호가 같은지 확인해야해요!');

// 복합 스키마
export const signInValidationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpValidationSchema = z
  .object({
    studentId: studentIdSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않아요!',
  });
