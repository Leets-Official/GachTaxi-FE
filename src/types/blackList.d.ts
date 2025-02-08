declare module 'gachTaxi-types' {
  interface BasicBlackListResponse {
    code: number;
    message: string;
    data: null;
  }

  // BlackListResponse 종속
  interface BlackMember {
    receiverId: number;
    receiverProfilePicture: string;
    receiverNickname: string;
    gender: 'MALE' | 'FEMALE';
  }

  // BlackListResponse 종속
  interface Pageable {
    pageNum: number;
    pageSize: number;
    numberOfElements: number;
    last: boolean;
  }

  interface BlackListResponse {
    code: number;
    message: string;
    data: {
      response: BlackMember[];
      pageable: Pageable;
    };
  }
}
