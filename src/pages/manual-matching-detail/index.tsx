import { useParams } from 'react-router-dom';
import RouteSettingIcon from '@/assets/icon/smallRouteChangeIcon.svg?react';
import Button from '@/components/commons/Button';

const ManualMatchingDetailPage = () => {
  // mock 데이터
  const data = {
    time: '오전 08:50',
    memberCount: 3,
    startName: '가천대 정문',
    startPoint: '123',
    destinationName: 'AI 공학관',
    destinationPoint: '123',
    criteria: ['태그 1', '태그 2', '태그 3'],
    content: '반갑다!',
    expectedTotalCharge: 4800,
  };

  const { id } = useParams();
  console.log(id);

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal">
      <h1 className="font-bold text-header">수동 매칭</h1>
      <div className="min-h-[310px] flex-shrink-0 bg-secondary rounded-box p-vertical flex flex-col gap-[32px]">
        <div className="flex justify-between w-full items-center">
          <p className="font-bold text-captionHeader">{data.time}</p>
          <span className="font-medium text-captionHeader">
            {data.memberCount}/4
          </span>
        </div>

        <div className="flex items-center gap-3">
          <RouteSettingIcon />
          <div className="relative top-[-2px]">
            <p className="font-medium text-captionHeader">{data.startName}</p>
            <p className="font-medium text-captionHeader">
              {data.destinationName}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll scroll-hideen">
          <p className="font-medium text-body">
            <span>추가 멘트 : </span>
            {data.content}
          </p>
        </div>

        <div className="w-full mt-auto flex items-center gap-2 overflow-x-scroll scroll-hidden">
          {data.criteria.map((tag) => {
            return (
              <span
                key={tag}
                className="text-assistive min-w-fit text-black font-medium px-3 py-1 rounded-full bg-primary"
              >
                # {tag}
              </span>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <Button className="w-full" isDisabled={data.memberCount === 4}>
          {data.memberCount === 4 ? '참여마감' : '참여하기'}
        </Button>
      </div>
    </section>
  );
};

export default ManualMatchingDetailPage;
