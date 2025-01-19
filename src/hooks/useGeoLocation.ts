import { useState, useEffect } from 'react';

interface GeoLocationState {
  loaded: boolean;
  coordinates: {
    lat: number | null;
    lng: number | null;
  };
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

  const onSuccess = (position: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      coordinates: { lat: null, lng: null },
      error: {
        code: error.code,
        message: error.message || '알 수 없는 에러입니다.',
      },
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocation({
        loaded: true,
        coordinates: { lat: null, lng: null },
        error: {
          code: 0,
          message: '위치 정보를 해당 브라우저에서 불러올 수 없습니다.',
        },
      });
      return;
    }

    // 위치 갱신 타이머 설정
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

    updateLocation();
    const intervalId = setInterval(updateLocation, 60000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return location;
};

export default useGeoLocation;
