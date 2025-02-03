import Modal from '@/components/modal';
import Button from '../commons/Button';
import { useModal } from '@/contexts/ModalContext';

const CancelTaxiModal = ({ onConfirm }: { onConfirm: () => void }) => {
  const { closeModal } = useModal();

  const handleCancel = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <Modal.Header className="font-bold text-header mt-4 ml-2">
        정말로 매칭을 취소하시겠습니까?
      </Modal.Header>
      <Modal.Content className="font-medium text-captionBody text-textDarkGray mb-10 ml-2">
        매칭 취소 버튼을 누르시면
        <br />
        자동매칭까지 취소됩니다!
      </Modal.Content>
      <Modal.Footer>
        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={handleCancel}
            variant="primary"
            type="submit"
            className="w-full"
          >
            매칭 취소
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default CancelTaxiModal;
