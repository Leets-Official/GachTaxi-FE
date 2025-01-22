/* eslint-disable @typescript-eslint/no-explicit-any */
const getCoordinateByAddress = async (address: string) => {
  return new Promise((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps) {
      reject(new Error('Kakao Maps API is not loaded.'));
      return;
    }

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Places();

      geocoder.keywordSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { y: lat, x: lng } = result[0];
          resolve({
            lat: parseFloat(lat).toString(),
            lng: parseFloat(lng).toString(),
          });
        } else {
          reject(
            new Error(
              `Geocoding failed: ${status === window.kakao.maps.services.Status.ZERO_RESULT ? '주소를 찾을 수 없어요!' : '에러가 발생했어요!'}`,
            ),
          );
        }
      });
    });
  });
};

export default getCoordinateByAddress;
