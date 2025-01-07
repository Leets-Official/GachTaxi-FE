import Modal from '.';
import Button from '../commons/Button';
import Checkbox from '../commons/Checkbox';
import AgreeLinkIcon from '../../../src/assets/icon/agreeLinkIcon.svg?react';
import { AgreementsTypes } from 'gachTaxi-types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { agreementsSchema } from '@/libs/schemas/auth';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/contexts/ModalContext';

const AgreementModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const agreementForm = useForm<z.infer<typeof agreementsSchema>>({
    resolver: zodResolver(agreementsSchema),
    defaultValues: {
      termsAgreement: false,
      privacyAgreement: false,
      marketingAgreement: false,
    },
    mode: 'onSubmit',
  });

  const agreements = agreementForm.watch([
    'termsAgreement',
    'privacyAgreement',
    'marketingAgreement',
  ]);

  const isAllAgreed = agreements.every(Boolean);

  const handleAllAgree = (checked: boolean) => {
    agreementForm.setValue('termsAgreement', checked);
    agreementForm.setValue('privacyAgreement', checked);
    agreementForm.setValue('marketingAgreement', checked);
  };

  const handleSubmitToAgreement: SubmitHandler<AgreementsTypes> = (
    data: AgreementsTypes,
  ) => {
    console.log(data);
    navigate('/signup/user-info');
    closeModal();
  };

  return (
    <>
      <Modal.Header className="mt-vertical">
        <h1 className="text-header font-bold">
          가치 택시를 이용하기 위해 <br /> 약관에 동의해주세요
        </h1>
      </Modal.Header>
      <Modal.Content className="mb-0">
        <form
          onSubmit={agreementForm.handleSubmit(handleSubmitToAgreement)}
          className="flex flex-col gap-4"
        >
          <div className="p-3 border rounded-common flex items-center gap-2">
            <Checkbox
              checked={isAllAgreed}
              onChange={handleAllAgree}
              label="약관 모두 동의"
            />
          </div>
          <div className="flex items-center justify-between">
            <Checkbox
              control={agreementForm.control}
              name="termsAgreement"
              label="이용 약관 동의(필수)"
            />
            <Button variant="icon">
              <AgreeLinkIcon />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Checkbox
              control={agreementForm.control}
              name="privacyAgreement"
              label="개인정보 수집 및 이용 동의(필수)"
            />
            <Button variant="icon">
              <AgreeLinkIcon />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Checkbox
              control={agreementForm.control}
              name="marketingAgreement"
              label="광고성 정보 수신 동의(선택)"
            />
            <Button variant="icon">
              <AgreeLinkIcon />
            </Button>
          </div>
          {(agreementForm.formState.errors.privacyAgreement ||
            agreementForm.formState.errors.termsAgreement) && (
            <p className="text-red-500">필수 약관에 동의해주세요!</p>
          )}
          <Button className="w-full mt-vertical" type="submit">
            시작하기
          </Button>
        </form>
      </Modal.Content>
    </>
  );
};

export default AgreementModal;
