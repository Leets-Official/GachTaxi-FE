import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const rootElement =
    (document.getElementById('component-root') as Element) || document.body;

  return createPortal(
    <motion.div
      key="modal"
      initial={{ translateY: '100%', left: '50%', translateX: '-50%' }}
      animate={{ translateY: '0%', left: '50%', translateX: '-50%' }}
      exit={{ translateY: '100%', left: '50%', translateX: '-50%' }}
      transition={{
        type: 'keyframes',
      }}
      role="dialog"
      className="flex flex-col gap-[16px] p-[16px] h-fit max-w-[430px] w-full z-[1000] bg-secondary fixed left-1/2 -translate-x-1/2 bottom-0 rounded-t-box text-white"
    >
      {children}
    </motion.div>,
    rootElement,
  );
};

Modal.Overlay = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-[999] h-full w-screen"
      onClick={onClose}
    ></motion.div>
  );
};

Modal.Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`w-full h-fit mb-vertical ${className || ''}`}>
    {children}
  </div>
);

Modal.Header = Modal.Section;
Modal.Content = Modal.Section;
Modal.Footer = Modal.Section;

export default Modal;
