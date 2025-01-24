/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, memo, useRef } from 'react';
import getRouteLine from '@/libs/apis/kakaoMobility.api';
import useLocationStore from '@/store/useLocationStore';
import getCenterPoint from '@/utils/getCenterPoint';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = memo(() => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [coordinatesLoaded, setCoordinatesLoaded] = useState(false);
  const {
    auto: { startPoint, destinationPoint },
  } = useLocationStore();
  const mapRef = useRef(null);
  const origin = destinationPoint;
  const destination = startPoint;
  const center = getCenterPoint(origin!, destination!);

  useEffect(() => {
    if (origin && destination) {
      setCoordinatesLoaded(true);
    }
  }, [origin, destination]);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => setIsKakaoLoaded(true));
    }
  }, []);

  // Map 객체 생성
  useEffect(() => {
    if (isKakaoLoaded && !mapRef.current && window.kakao && coordinatesLoaded) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 4,
      };
      mapRef.current = new window.kakao.maps.Map(container, options);
    }
  }, [isKakaoLoaded, center.lat, center.lng, coordinatesLoaded]);

  useEffect(() => {
    const drawRoute = async () => {
      if (!mapRef.current && !coordinatesLoaded) {
        return;
      } else {
        try {
          const response = await getRouteLine({ origin, destination });
          const { routes } = response;

          if (routes?.length > 0 && routes[0]?.sections) {
            const polylinePath = routes[0].sections.flatMap((section: any) =>
              section.roads.flatMap((road: any) =>
                road.vertexes.reduce((acc: any[], _: any, i: number) => {
                  if (i % 2 === 0) {
                    acc.push(
                      new window.kakao.maps.LatLng(
                        road.vertexes[i + 1],
                        road.vertexes[i],
                      ),
                    );
                  }
                  return acc;
                }, []),
              ),
            );

            const polyline = new window.kakao.maps.Polyline({
              map: mapRef.current,
              path: polylinePath,
              strokeWeight: 10,
              strokeColor: '#007AFF',
              strokeOpacity: 1,
              strokeStyle: 'solid',
            });

            polyline.setMap(mapRef.current);
          } else {
            console.warn('No valid route data');
          }
        } catch (error) {
          console.error('Error drawing route:', error);
        }
      }
    };

    drawRoute();
  }, [isKakaoLoaded, origin, destination, coordinatesLoaded]);

  return <div id="map" className="w-full h-[85vh] z-20"></div>;
});

export default KakaoMap;
