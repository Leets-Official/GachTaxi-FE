import Modal from '@/components/modal';
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
import { AGREE_VALUES } from '@/constants';
import requestAgreement from '@/libs/apis/auth/requestAgreement';
import { useToast } from '@/contexts/ToastContext';
import handleAxiosError from '@/libs/apis/axiosError.api';
import useRequestStatus from '@/hooks/useRequestStatus';

const AgreementModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { status, setSuccess, setError, setPending } = useRequestStatus();

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
  const { openToast } = useToast();

  const handleAllAgree = (checked: boolean) => {
    agreementForm.setValue('termsAgreement', checked);
    agreementForm.setValue('privacyAgreement', checked);
    agreementForm.setValue('marketingAgreement', checked);
  };

  const handleSubmitToAgreement: SubmitHandler<AgreementsTypes> = async (
    data: AgreementsTypes,
  ) => {
    setPending();
    try {
      const res = await requestAgreement(data);
      if (res?.code === 200) {
        setSuccess();
        openToast(res.message, 'success');
        closeModal();
        navigate('/signup/user-info');
      }
    } catch (error: unknown) {
      setError();
      const errorMessage = handleAxiosError(error);
      openToast(errorMessage, 'error');
    } finally {
      closeModal();
    }
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
          {AGREE_VALUES.map((values) => {
            return (
              <div
                key={values.name}
                className="flex items-center justify-between"
              >
                <Checkbox
                  control={agreementForm.control}
                  name={values.name}
                  label={values.label}
                />
                <Button variant="icon">
                  <AgreeLinkIcon />
                </Button>
              </div>
            );
          })}
          {(agreementForm.formState.errors.privacyAgreement ||
            agreementForm.formState.errors.termsAgreement) && (
            <p className="text-red-500">필수 약관에 동의해주세요!</p>
          )}
          <Button
            className="w-full mt-vertical"
            type="submit"
            isLoading={status === 'pending'}
          >
            시작하기
          </Button>
        </form>
      </Modal.Content>
    </>
  );
};

export default AgreementModal;
