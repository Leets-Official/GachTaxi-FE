import { Control } from 'react-hook-form';
import Input from '../../commons/Input';
import { userInfoVerificationSchema } from '../../../libs/schemas/auth';
import { z } from 'zod';

interface GenderSelectProps {
  control: Control<z.infer<typeof userInfoVerificationSchema>>;
  gender: string;
}

const GenderSelect = ({ control, gender }: GenderSelectProps) => {
  return (
    <div className="flex items-center w-full h-[50px] border border-[#787272] rounded-[10px] overflow-hidden">
      <div
        className={`flex-1 h-full cursor-pointer ${
          gender === 'male' ? 'bg-primary' : 'text-[#787272]'
        }`}
      >
        <Input
          control={control}
          name="gender"
          type="radio"
          value="male"
          label="남"
          labelClassName="text-[16px] w-full h-full flex items-center justify-center cursor-pointer"
          className="hidden"
        />
      </div>
      <div
        className={`flex-1 h-full cursor-pointer ${
          gender === 'female' ? 'bg-primary' : 'text-[#787272]'
        }`}
      >
        <Input
          control={control}
          name="gender"
          type="radio"
          value="female"
          label="여"
          labelClassName="text-[16px] w-full h-full flex items-center justify-center cursor-pointer"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default GenderSelect;
