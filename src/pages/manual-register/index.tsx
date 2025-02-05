import BackButton from '@/components/commons/BackButton';
import Button from '@/components/commons/Button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues,
} from 'react-hook-form';
import { ManualMatchingTypes } from 'gachTaxi-types';
import { manualMatchingSchema } from '@/libs/schemas/match';
import RouteSetting from '@/components/home/autoMatching/RouteSetting';
import InviteMembers from '@/components/home/autoMatching/inviteMembers';
import SelectTags from '@/components/home/autoMatching/selectTags';
import AddContent from '@/components/manual-register/AddContent';
import { formatTimeToSelect } from '@/utils';
import TimeSelect from '@/components/manual-register/timeSelect';
import { useToast } from '@/contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import useSheetStore from '@/store/useSheetStore';
import createManualMatchingRoom from '@/libs/apis/manual/createManualMatchingRoom.api';
import axios from 'axios';
import { Suspense } from 'react';

const ManualMatchingRegister = () => {
  const manualMatchingForm = useForm<z.infer<typeof manualMatchingSchema>>({
    resolver: zodResolver(manualMatchingSchema),
    defaultValues: {
      startName: '가천대 반도체대학',
      destinationName: '가천대 AI 공학관',
      departureTime: formatTimeToSelect(
        new Date(new Date().setHours(1, 0, 0, 0)),
      ),
      members: [],
      criteria: [],
      description: '',
      expectedTotalCharge: 4800,
    },
  });
  const { openToast } = useToast();
  const navigate = useNavigate();
  const { openSheet, openMatch } = useSheetStore();

  const handleSubmitToManualMatching: SubmitHandler<
    ManualMatchingTypes
  > = async (data) => {
    try {
      const res = await createManualMatchingRoom(data);
      if (res.code >= 200 && res.code < 300) {
        openSheet();
        openMatch();
        navigate('/home');
        openToast(res.message, 'success');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        const errorCode = error.response?.status;

        openToast(errorMessage, 'error');
        if (errorCode === 409) {
          navigate('/matching');
        }
      }
    }
  };

  const handleError = (errors: FieldValues) => {
    const message = Object.values(errors).find(
      (item) => item?.message,
    )?.message;
    openToast(message, 'error');
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal relative max-h-screen">
      <BackButton />
      <h1 className="text-header font-bold">수동 매칭 등록</h1>

      <form
        className="flex-1 overflow-scroll scroll-hidden mb-[62px] flex flex-col gap-[16px] rounded-box"
        onSubmit={manualMatchingForm.handleSubmit(
          handleSubmitToManualMatching,
          handleError,
        )}
      >
        <RouteSetting control={manualMatchingForm.control} />
        <Controller
          name="departureTime"
          control={manualMatchingForm.control}
          render={({ field }) => (
            <TimeSelect timeVal={field.value} onChange={field.onChange} />
          )}
        />
        <Suspense
          fallback={
            <div className="h-[150px] w-full flex items-center justify-center">
              <SpinnerIcon width={36} height={36} className="mx-auto spinner" />
            </div>
          }
        >
          <InviteMembers control={manualMatchingForm.control} />
        </Suspense>
        <SelectTags control={manualMatchingForm.control} />
        <AddContent control={manualMatchingForm.control} />
      </form>

      <div className="absolute left-0 bottom-0 w-full p-horizontal">
        <Button
          type="button"
          className="w-full"
          onClick={() =>
            manualMatchingForm.handleSubmit(
              handleSubmitToManualMatching,
              handleError,
            )()
          }
        >
          매칭등록
        </Button>
      </div>
    </section>
  );
};

export default ManualMatchingRegister;
