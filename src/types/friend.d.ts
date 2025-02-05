declare module 'gachTaxi-types' {
  interface RequestFriend {
    nickName: string;
  }

  interface AcceptFriend {
    memberId: number;
  }

  interface BasicFriendResponse {
    code: number;
    message: string;
    data: null;
  }

  // FriendListResponse 종속
  interface Friend {
    friendsId: number;
    friendsNickName: string;
    friendsProfileUrl: string;
    gender: 'MALE' | 'FEMALE';
  }

  // FriendListResponse 종속
  interface Pageable {
    pageNum: number;
    pageSize: number;
    numberOfElements: number;
    last: boolean;
  }

  interface FriendListResponse {
    code: number;
    message: string;
    data: {
      response: Friend[];
      pageable: Pageable;
    };
  }
}
