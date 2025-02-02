import Modal from '@/components/modal';
import Button from '../commons/Button';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/contexts/ModalContext';

const CallTaxiModal = () => {
  const nav = useNavigate();
  const { closeModal } = useModal();

  return (
    <>
      <Modal.Header className="font-bold text-header mt-4 ml-2">
        택시를 호출할까요?
      </Modal.Header>
      <Modal.Content className="font-medium text-captionBody text-textDarkGray mb-10 ml-2">
        호출하기를 통해
        <br />
        택시 앱으로 이동할 수 있어요
      </Modal.Content>
      <Modal.Header className="font-bold text-captionHeader ml-2">
        예상금액: 4800원
      </Modal.Header>
      <Modal.Footer>
        <div className="w-full flex flex-col gap-3">
          <Button
            variant="primary"
            type="submit"
            className="w-full"
            onClick={() => {
              nav('/call-taxi');
              closeModal();
            }}
          >
            호출하기
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default CallTaxiModal;
