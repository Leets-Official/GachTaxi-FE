import { Control } from 'react-hook-form';
import Input from '../../commons/Input';
import { userInfoVerificationSchema } from '../../../libs/schemas/auth';
import { z } from 'zod';

interface GenderSelectProps {
  control: Control<z.infer<typeof userInfoVerificationSchema>>;
  gender: string;
}

const labelStyle =
  'text-[16px] w-full h-full flex items-center justify-center cursor-pointer';

const GenderSelect = ({ control, gender }: GenderSelectProps) => {
  return (
    <div className="flex items-center w-full h-[50px] border border-[#787272] rounded-[10px] overflow-hidden">
      <div
        className={`flex-1 h-full cursor-pointer ${
          gender === 'MALE' ? 'bg-primary' : 'text-[#787272]'
        }`}
      >
        <Input
          control={control}
          name="gender"
          type="radio"
          value="male"
          label="남"
          labelClassName={labelStyle}
          className="hidden"
        />
      </div>
      <div
        className={`flex-1 h-full cursor-pointer ${
          gender === 'FEMALE' ? 'bg-primary' : 'text-[#787272]'
        }`}
      >
        <Input
          control={control}
          name="gender"
          type="radio"
          value="female"
          label="여"
          labelClassName={labelStyle}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default GenderSelect;
