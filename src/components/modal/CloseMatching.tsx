import Modal from '@/components/modal';
import Button from '../commons/Button';

const CloseMatchingModal = () => {
  return (
    <>
      <Modal.Header className="font-bold text-header mt-4 ml-2">
        정말로 매칭을 마감하시겠습니까?
      </Modal.Header>
      <Modal.Content className="font-medium text-captionBody text-textDarkGray mb-10 ml-2">
        매칭을 마감하고
        <br />
        현재 인원으로 택시를 호출합니다!
      </Modal.Content>
      <Modal.Footer>
        <div className="w-full flex flex-col gap-3">
          <Button variant="primary" type="submit" className="w-full">
            매칭 마감
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default CloseMatchingModal;
