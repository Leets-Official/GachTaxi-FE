import { useState } from 'react';

interface GeoLocationState {
  loaded: boolean;
  coordinates: {
    lat: number | null;
    lng: number | null;
  } | null;
  error?: {
    code: number;
    message: string;
  };
}

const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocationState>({
    loaded: false,
    coordinates: { lat: null, lng: null },
  });

  const getCurrentLocation = () =>
    new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        console.error('naviagtor는 해당 브라우저에서 사용할 수 없어요!');
        setLocation({ loaded: true, coordinates: null });
        return reject(new Error('geoLocation이 동작하지 않아요!'));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation({ loaded: true, coordinates: coords });
          resolve(coords);
        },
        (error) => {
          console.error('위치를 가져오는 도중에 에러가 발생했어요!', error);
          setLocation({ loaded: true, coordinates: null });
          reject(error);
        },
      );
    });

  return { location, getCurrentLocation };
};

export default useGeoLocation;
