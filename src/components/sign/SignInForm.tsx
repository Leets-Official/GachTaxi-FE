import z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInValidationSchema } from '../../libs/schemas/auth';
import { SignInTypes } from 'gachTaxi-types';
import Input from '../commons/Input';
import { useState } from 'react';

const SignInForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const signInForm = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const handleSubmitToSignIn: SubmitHandler<SignInTypes> = (data) => {
    // API 구현 시 추가 구현
    alert('로그인 성공!');
    console.table(data);
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={signInForm.handleSubmit(handleSubmitToSignIn)}
    >
      <Input
        control={signInForm.control}
        name="email"
        label="이메일"
        type="email"
        autoFocus
      />
      <div className="relative flex flex-col gap-2">
        <Input
          control={signInForm.control}
          name="password"
          label="비밀번호"
          type={isShowPassword ? 'text' : 'password'}
        />
        {/* showPassword 제어할 버튼 아이콘 들어갈 공간 */}
        <div
          onClick={() => setIsShowPassword((prev) => !prev)}
          className="absolute w-5 h-5 bg-slate-500 right-1 top-[35px] cursor-pointer"
        ></div>
      </div>
      <button type="submit" className="border mt-6">
        로그인
      </button>
    </form>
  );
};

export default SignInForm;
