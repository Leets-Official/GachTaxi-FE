import z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpValidationSchema } from '../../libs/schemas/auth';
import { SignUpTypes } from 'gachTaxi-types';
import Input from '../commons/Input';
import { useState } from 'react';

const SignUpForm = () => {
  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    passwordConfirm: false,
  });

  const signUpForm = useForm<z.infer<typeof signUpValidationSchema>>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      studentId: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onBlur',
  });

  const handleSubmitToSignUp: SubmitHandler<SignUpTypes> = (data) => {
    // API 구현 시 추가 구현
    alert('회원가입 성공!');
    console.table(data);
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={signUpForm.handleSubmit(handleSubmitToSignUp)}
    >
      <Input
        control={signUpForm.control}
        name="studentId"
        label="학번"
        type="text"
        maxLength={8}
        autoFocus
      />
      <Input
        control={signUpForm.control}
        name="email"
        label="이메일"
        type="email"
      />
      <div className="relative flex flex-col gap-2">
        <Input
          control={signUpForm.control}
          name="password"
          label="비밀번호"
          type={isShowPassword.password ? 'text' : 'password'}
        />
        {/* showPassword 제어할 버튼 아이콘 들어갈 공간 */}
        <div
          onClick={() =>
            setIsShowPassword((prev) => ({ ...prev, password: !prev.password }))
          }
          className="absolute w-5 h-5 bg-slate-500 right-1 top-[35px] cursor-pointer"
        ></div>
      </div>
      <div className="relative flex flex-col gap-2">
        <Input
          control={signUpForm.control}
          name="passwordConfirm"
          label="비밀번호 확인"
          type={isShowPassword.passwordConfirm ? 'text' : 'password'}
        />
        {/* showPassword 제어할 버튼 아이콘 들어갈 공간 */}
        <div
          onClick={() =>
            setIsShowPassword((prev) => ({
              ...prev,
              passwordConfirm: !prev.passwordConfirm,
            }))
          }
          className="absolute w-5 h-5 bg-slate-500 right-1 top-[35px] cursor-pointer"
        ></div>
      </div>
      <button type="submit" className="border mt-6">
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
