import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

interface ToastProps {
  children: ReactNode;
  fn?: () => void;
}

const Toast = ({ children, fn }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const rootElement =
    (document.getElementById('component-root') as Element) || document.body;

  const handleFnByAnimationStateExit = () => {
    if (!isExiting) {
      setIsExiting(true);
    }
    if (fn && isExiting) {
      fn();
    }
  };

  return createPortal(
    <motion.div
      role="toast"
      initial={{ opacity: 0, scale: 0.8, left: '50%', translateX: '-50%' }}
      animate={{ opacity: 1, scale: 1, left: '50%', translateX: '-50%' }}
      exit={{ opacity: 0, scale: 0.8, left: '50%', translateX: '-50%' }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 14,
      }}
      onAnimationStart={handleFnByAnimationStateExit}
      className={`flex flex-col gap-[16px] p-[16px] h-fit max-w-[400px] w-full z-[1000] bg-secondary absolute top-8 rounded-modal text-white`}
    >
      {children}
    </motion.div>,
    rootElement,
  );
};

export default Toast;
