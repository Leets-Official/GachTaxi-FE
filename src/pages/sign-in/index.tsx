import { Link } from 'react-router-dom';
import SignInForm from '../../components/sign/SignInForm';

const SignInPage = () => {
  return (
    <div className="max-w-[375px] mx-auto flex flex-col gap-4">
      <h1 className="text-2xl">로그인</h1>
      <SignInForm />
      <div className="flex items-center justify-center gap-3">
        <p>회원이 아니신가요?</p>
        <Link onMouseDown={(e) => e.preventDefault()} to="/signup">
          회원가입 하기
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
