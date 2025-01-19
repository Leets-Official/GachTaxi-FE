import React, { createContext, useState, useContext, ReactNode } from 'react';
import Modal from '../components/modal';
import { AnimatePresence } from 'framer-motion';

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
}

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    content: null,
  });

  const openModal = (content: ReactNode) => {
    setModalState({ isOpen: true, content });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, content: null });
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: modalState.isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
      <AnimatePresence>
        {modalState.isOpen && (
          <PortalContainer modalState={modalState} closeModal={closeModal} />
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

const PortalContainer = React.memo(
  (props: { modalState: ModalState; closeModal: () => void }) => {
    const { modalState, closeModal } = props;

    if (!modalState.isOpen) return null;

    return (
      <>
        <Modal.Overlay key="overlay" onClose={closeModal} />
        <Modal key="modal">{modalState.content}</Modal>
      </>
    );
  },
);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('모달은 프로바이더 안에서 사용되어야 해요!');
  }
  return context;
};
