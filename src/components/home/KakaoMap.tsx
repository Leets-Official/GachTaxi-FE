/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, memo } from 'react';
import getRouteLine from '@/libs/apis/kakaoMobility.api';
import { ORIGIN, DESTINATION } from '@/constants';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = memo(() => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const origin = ORIGIN;
  const destination = DESTINATION;

  // 스크립트로 카카오맵 api 호출
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        setIsKakaoLoaded(true);
      });
    }
  }, []);

  // 로드 완료 후 map 객체 생성
  useEffect(() => {
    if (isKakaoLoaded && window.kakao) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(
          37.45065010968753,
          127.13095078158204,
        ),
        level: 4,
      };
      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
    }
  }, [isKakaoLoaded]);

  // 카카오 모빌리티 api 사용한 출발지 -> 목적지 경로 렌더링
  useEffect(() => {
    const drawRoute = async () => {
      if (!map) return;

      try {
        const response = await getRouteLine({ origin, destination });
        const { routes } = response;

        if (routes && routes[0]?.sections) {
          const polylinePath: any[] = [];
          routes[0].sections.forEach((section: any) => {
            section.roads.forEach((road: any) => {
              road.vertexes.forEach((_vertex: any, index: number) => {
                if (index % 2 === 0) {
                  polylinePath.push(
                    new window.kakao.maps.LatLng(
                      road.vertexes[index + 1],
                      road.vertexes[index],
                    ),
                  );
                }
              });
            });
          });

          const polyline = new window.kakao.maps.Polyline({
            map,
            path: polylinePath,
            strokeWeight: 10,
            strokeColor: '#007AFF',
            strokeOpacity: 1,
            strokeStyle: 'solid',
          });

          polyline.setMap(map);
        }
      } catch (error) {
        console.error('Error drawing route:', error);
      }
    };

    drawRoute();
  }, [map, origin, destination]);

  return <div id="map" className="w-full h-[85vh] z-20"></div>;
});

export default KakaoMap;
