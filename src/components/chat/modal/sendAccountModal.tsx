import Modal from './index';
import Button from '@/components/commons/Button';

interface SendAccountModalProps {
  onClose: () => void;
  account: string;
  onSend: (accountInfo: string) => void;
}

const SendAccountModal: React.FC<SendAccountModalProps> = ({
  onClose,
  account,
  onSend,
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="flex items-center gap-2 justify-center mb-7 gap-3">
        <p className="text-white text-captionHeader text-center">{account}</p>
      </div>
      <Button
        onClick={() => onSend(account)}
        className="w-full h-[42px] bg-primary text-[#012619] py-3 rounded-full font-semibold flex items-center justify-center"
      >
        전송하기
      </Button>
    </Modal>
  );
};

export default SendAccountModal;
