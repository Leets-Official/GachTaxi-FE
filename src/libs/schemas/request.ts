import z from 'zod';

const friendSchema = z.string().min(1, '닉네임을 입력해주세요!');

export const friendRequestSchema = z.object({
  nickName: friendSchema,
});
