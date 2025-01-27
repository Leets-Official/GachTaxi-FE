/* eslint-disable @typescript-eslint/no-explicit-any */
import getImageUrl from '@/libs/apis/auth/getImageUrl.api';
import getPresignedUrl from '@/libs/apis/auth/getPresignedUrl';
import { useState, useEffect } from 'react';

const useUploadImage = (image?: any) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined,
  );

  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const imageUpload = async () => {
      if (!image) {
        setImagePreview(undefined);
        setUploadedImage(undefined);
        return;
      }

      if (typeof image === 'string') {
        setImagePreview(image);
      } else {
        const { data, error } = await getImageUrl(image);
        if (error || !data) {
          throw new Error('이미지 업로드 실패');
        } else {
          const res = await getPresignedUrl(data, image);
          const slicedData = res.data.split('?')[0];
          setUploadedImage(slicedData);
        }

        const objectURL = URL.createObjectURL(image);
        setImagePreview(objectURL);

        // Cleanup
        return () => URL.revokeObjectURL(objectURL);
      }
    };
    imageUpload();
  }, [image]);

  return { imagePreview, uploadedImage };
};

export default useUploadImage;
