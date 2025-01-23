import { Control, Controller } from 'react-hook-form';
import { userInfoVerificationSchema } from '@/libs/schemas/auth';
import { z } from 'zod';
import BasicProfileIcon from '@/assets/icon/basicProfileIcon.svg?react';
import CameraIcon from '@/assets/icon/cameraIcon.svg?react';
import ImageCancelIcon from '@/assets/icon/imageCancelIcon.svg?react';
import Button from '@/components/commons/Button';

interface ProfileImageUploadProps {
  control: Control<z.infer<typeof userInfoVerificationSchema>>;
  imagePreview: string | undefined;
}

const ProfileImageUpload = ({
  control,
  imagePreview,
}: ProfileImageUploadProps) => {
  return (
    <Controller
      control={control}
      name="profilePicture"
      render={({ field: { onChange, ...field } }) => (
        <>
          <div className="flex items-center justify-center my-6">
            <label
              htmlFor="profileImage"
              className="flex items-center gap-[10px] cursor-pointer relative rounded-full bg-textDarkGray"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="프로필 이미지"
                  className="w-[104px] h-[104px] rounded-full object-cover"
                />
              ) : (
                <BasicProfileIcon width={104} height={104} />
              )}
              {imagePreview === undefined && (
                <div className="absolute bottom-0 right-0">
                  <CameraIcon />
                </div>
              )}
              {imagePreview && (
                <div className="absolute bottom-[-4px] right-0">
                  <Button
                    variant="icon"
                    className="z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(undefined);
                    }}
                  >
                    <ImageCancelIcon width={28} height={28} />
                  </Button>
                </div>
              )}
            </label>
            <input
              {...field}
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                }
              }}
              value={undefined}
            />
          </div>
        </>
      )}
    />
  );
};

export default ProfileImageUpload;
