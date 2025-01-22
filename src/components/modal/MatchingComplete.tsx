import Button from '@/components/commons/Button';
import Modal from '@/components/modal';
import { useModal } from '@/contexts/ModalContext';

const MatchingComplete = ({
  setCurrentPage,
}: {
  setCurrentPage: (value: 'MANUAL' | 'MY_MATCHING') => void;
}) => {
  const { closeModal } = useModal();

  const handleMyMatchingButton = () => {
    setCurrentPage('MY_MATCHING');
    closeModal();
  };

  return (
    <>
      <Modal.Header className="font-bold text-header mt-4">
        매칭 참여가 완료되었어요!
      </Modal.Header>
      <Modal.Content className="font-medium text-captionHeader text-textDarkGray mb-10">
        마이 매칭에서 지금까지 예약한 매칭들을
        <br />
        확인할 수 있어요
      </Modal.Content>
      <Modal.Footer>
        <div className="w-full flex flex-col gap-3">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleMyMatchingButton}
          >
            마이 매칭
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => closeModal()}
          >
            닫기
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default MatchingComplete;
