import Toast from '@/components/toast';
import { AnimatePresence } from 'framer-motion';
import { createContext, useState, useContext, ReactNode } from 'react';

interface ToastState {
  isOpen: boolean;
  content: ReactNode | null;
  fn?: () => void;
}

interface ToastContextType {
  isOpen: boolean;
  openToast: (content: ReactNode, fn?: () => void) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastState, setToastState] = useState<ToastState>({
    isOpen: false,
    content: null,
    fn: undefined,
  });

  const openToast = (content: ReactNode, fn?: () => void) => {
    setToastState({ isOpen: true, content, fn });
    setTimeout(() => {
      setToastState({
        isOpen: false,
        content: null,
        fn: undefined,
      });
    }, 4000);
  };

  return (
    <ToastContext.Provider
      value={{
        isOpen: toastState.isOpen,
        openToast,
      }}
    >
      {children}
      <AnimatePresence>
        {toastState.isOpen && (
          <Toast fn={toastState.fn}>{toastState.content}</Toast>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider!');
  }

  return context;
};
