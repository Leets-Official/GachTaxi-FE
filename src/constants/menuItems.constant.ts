import CallTaxi from '@/assets/icon/callTaxi.svg?react';
import SendAccount from '@/assets/icon/sendAccount.svg?react';
import CancelMatching from '@/assets/icon/cancelMatching.svg?react';
import CloseMatching from '@/assets/icon/closeMatching.svg?react';

export const MENUITEMS = [
  { icon: CallTaxi, label: '택시 호출' },
  { icon: SendAccount, label: '계좌 전송' },
  { icon: CloseMatching, label: '매칭 마감' },
  { icon: CancelMatching, label: '매칭 취소' },
] as const;
