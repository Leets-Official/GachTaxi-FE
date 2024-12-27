import SignUpForm from '../../components/sign/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="max-w-[375px] mx-auto flex flex-col gap-4">
      <h1 className="text-2xl">회원가입</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
