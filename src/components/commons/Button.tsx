import { motion, MotionProps } from 'framer-motion';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const Button = ({
  variant = 'primary',
  children,
  isLoading = false,
  type = 'button',
  isDisabled = false,
  className,
  ...props
}: ButtonProps) => {
  // variant에 따라 스타일 적용
  let variantStyle = '';

  // variantStyle 조건부 설정
  if (variant === 'primary') {
    variantStyle = `${isDisabled || isLoading ? 'bg-matchLine' : 'bg-primary'} h-[50px] rounded-modal font-semibold text-neutral outline-none text-center`;
  } else if (variant === 'secondary') {
    variantStyle =
      'bg-transparent h-[50px] rounded-modal font-semibold text-button text-textLightGray outline-none border-2 border-primary text-center';
  } else if (variant === 'icon') {
    variantStyle = 'bg-transparent outline-none w-fit h-fit';
  }

  return (
    <motion.button
      type={type}
      disabled={isDisabled || isLoading}
      initial={{ scale: 1 }}
      whileTap={isDisabled || isLoading ? { scale: 1 } : { scale: 0.95 }}
      className={`${variantStyle} ${className || ''}`}
      {...(props as MotionProps)}
    >
      {isDisabled ? (
        children
      ) : isLoading ? (
        <SpinnerIcon width={24} height={24} className="mx-auto spinner" />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
