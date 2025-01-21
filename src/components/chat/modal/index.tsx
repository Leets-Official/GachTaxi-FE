import React from 'react';
import Close from '@/assets/icon/closeModal.svg?react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#141513] bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-toastColor max-w-[430px] w-[80%] relative rounded-3xl p-7">
        <div
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <Close />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
