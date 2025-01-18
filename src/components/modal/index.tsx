import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const rootElement = document.getElementById('component-root') as Element;

  return createPortal(
    <div
      role="dialog"
      className={`flex flex-col gap-[16px] p-[16px] h-fit max-w-[430px] w-full z-[1000] bg-secondary absolute left-1/2 -translate-x-1/2 bottom-0 rounded-t-modal text-white`}
    >
      {children}
    </div>,
    rootElement,
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
