import BackButton from '@/components/commons/BackButton';
import KakaoT from '@/assets/icon/kakaoT.svg?react';
import UberT from '@/assets/icon/uberT.svg?react';
import TmoneyGo from '@/assets/icon/tmoneyGo.svg?react';
import TadaT from '@/assets/icon/tadaT.svg?react';

const CallTaxi = () => {
  const openTaxiApp = (
    deepLink: string,
    androidUrl: string,
    iosUrl: string,
  ) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const fallbackUrl = isIOS ? iosUrl : androidUrl;

    const newTab = window.open(deepLink, '_blank');

    setTimeout(() => {
      if (newTab) {
        newTab.location.href = fallbackUrl;
      } else {
        window.location.href = fallbackUrl;
      }
    }, 1500);
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal">
      <BackButton />
      <h1 className="text-header font-bold">택시 앱으로 연결해 드릴게요</h1>
      <p className="text-medium">
        원하는 택시 앱을 선택하면
        <br />
        해당 앱으로 이동해요
      </p>
      <div className="px-12 grid grid-cols-2 gap-y-8 mt-[80px] place-items-center">
        <KakaoT
          className="cursor-pointer"
          onClick={() =>
            openTaxiApp(
              'kakaot://',
              'https://play.google.com/store/apps/details?id=com.kakao.taxi',
              'https://apps.apple.com/kr/app/id981110422',
            )
          }
        />
        <UberT
          className="cursor-pointer"
          onClick={() =>
            openTaxiApp(
              'uber://?action=setPickup',
              'https://m.uber.com/ul/?action=setPickup&pickup=my_location',
              'https://m.uber.com/ul/?action=setPickup&pickup=my_location',
            )
          }
        />
        <TmoneyGo
          className="cursor-pointer"
          onClick={() =>
            openTaxiApp(
              'tmoneygo://',
              'https://play.google.com/store/apps/details?id=kr.co.tmoney.tia',
              'https://apps.apple.com/kr/app/%ED%8B%B0%EB%A8%B8%EB%8B%88go-%EA%B3%A0%EC%86%8D%EB%B2%84%EC%8A%A4-%EC%8B%9C%EC%99%B8%EB%B2%84%EC%8A%A4-%ED%83%9D%EC%8B%9C-%EB%94%B0%EB%A6%89%EC%9D%B4-%ED%82%A5%EB%B3%B4%EB%93%9C/id1483433931',
            )
          }
        />
        <TadaT
          className="cursor-pointer"
          onClick={() =>
            openTaxiApp(
              '',
              'https://play.google.com/store/apps/details?id=kr.co.vcnc.tada',
              'https://apps.apple.com/kr/app/%ED%83%80%EB%8B%A4/id1422751774',
            )
          }
        />
      </div>
    </section>
  );
};

export default CallTaxi;
