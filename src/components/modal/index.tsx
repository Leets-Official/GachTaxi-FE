import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return createPortal(
    <div
      role="dialog"
      className={`flex flex-col gap-[16px] p-[16px] mx-auto h-fit w-full z-[1000] bg-secondary fixed bottom-0 rounded-t-modal text-white`}
    >
      {children}
    </div>,
    (document.getElementById('modal-root') as Element) || document.body,
  );
};

Modal.Overlay = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[999] h-full w-screen"
      onClick={onClose}
    ></div>
  );
};

Modal.Header = ({
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

Modal.Content = ({
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

Modal.Footer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`w-full h-fit ${className || ''}`}>{children}</div>;

export default Modal;
