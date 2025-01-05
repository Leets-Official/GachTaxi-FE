interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  className?: string;
}

const Button = ({
  variant = 'primary',
  children,
  type = 'button',
  isDisabled = false,
  className,
  ...props
}: ButtonProps) => {
  // variant에 따라 스타일 적용
  let variantStyle = '';

  // variantStyle 조건부 설정
  if (variant === 'primary') {
    variantStyle =
      'bg-primary rounded-[10px] font-semibold text-[16px] p-3 text-neutral';
  } else if (variant === 'secondary') {
    variantStyle =
      'bg-transparent rounded-[10px] font-semibold text-[16px] p-3 text-white';
  } else if (variant === 'icon') {
    variantStyle = 'bg-transparent';
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${variantStyle} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
