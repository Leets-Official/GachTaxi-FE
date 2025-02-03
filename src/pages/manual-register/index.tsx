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
import useSheetStore from '@/store/useSheetStore';

const ManualMatchingRegister = () => {
  const manualMatchingForm = useForm<z.infer<typeof manualMatchingSchema>>({
    resolver: zodResolver(manualMatchingSchema),
    defaultValues: {
      startName: '가천대 반도체대학',
      destinationName: '가천대 AI 공학관',
      time: formatTimeToSelect(new Date(new Date().setHours(1, 0, 0, 0))),
      members: [],
      criteria: [],
      content: '',
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
      console.log(data);
      openSheet();
      openMatch();
      navigate('/home');
    } catch (e) {
      console.error(e);
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
          name="time"
          control={manualMatchingForm.control}
          render={({ field }) => (
            <TimeSelect timeVal={field.value} onChange={field.onChange} />
          )}
        />
        <InviteMembers control={manualMatchingForm.control} />
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
