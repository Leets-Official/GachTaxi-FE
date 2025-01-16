import BackButton from '@/components/commons/BackButton';
import Button from '@/components/commons/Button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ManualMatchingTypes } from 'gachTaxi-types';
import { manualMatchingSchema } from '@/libs/schemas/match';
import RouteSetting from '@/components/home/autoMatching/RouteSetting';
import InviteMembers from '@/components/home/autoMatching/inviteMembers';
import SelectTags from '@/components/home/autoMatching/selectTags';
import AddContent from '@/components/manual-register/AddContent';
import { formatTimeToSelect } from '@/utils';
import TimeSelect from '@/components/manual-register/timeSelect';

const ManualMatchingRegister = () => {
  const manualMatchingForm = useForm<z.infer<typeof manualMatchingSchema>>({
    resolver: zodResolver(manualMatchingSchema),
    defaultValues: {
      route: 'BASIC',
      time: formatTimeToSelect(new Date(new Date().setHours(1, 0, 0, 0))),
      members: [],
      tags: [],
      content: '',
    },
  });

  const handleSubmitToManualMatching: SubmitHandler<ManualMatchingTypes> = (
    data,
  ) => {
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal relative max-h-screen">
      <BackButton />
      <h1 className="text-header font-bold">수동 매칭 등록</h1>

      <form
        className="flex-1 overflow-scroll scroll-hidden mb-[62px] flex flex-col gap-[16px] rounded-box"
        onSubmit={manualMatchingForm.handleSubmit(handleSubmitToManualMatching)}
      >
        <RouteSetting control={manualMatchingForm.control} />
        <Controller
          name="time"
          control={manualMatchingForm.control}
          render={({ field }) => {
            return (
              <TimeSelect timeVal={field.value} onChange={field.onChange} />
            );
          }}
        />
        <InviteMembers control={manualMatchingForm.control} />
        <SelectTags control={manualMatchingForm.control} />
        <AddContent control={manualMatchingForm.control} />
        <button type="submit" className="hidden"></button>
      </form>

      <div className="absolute left-0 bottom-0 w-full p-horizontal">
        <Button
          type="button"
          className="w-full"
          onClick={manualMatchingForm.handleSubmit(
            handleSubmitToManualMatching,
            (errors) => console.error('폼 검증 실패:', errors),
          )}
        >
          매칭등록
        </Button>
      </div>
    </section>
  );
};

export default ManualMatchingRegister;
