declare module 'gachTaxi-types' {
  interface AutoMatchingTypes {
    startPoint: string;
    startName: string;
    destinationPoint: string;
    destinationName: string;
    criteria: string[];
    members: string[];
    expectedTotalCharge: number;
  }

  interface ManualMatchingTypes {
    startPoint: string;
    startName: string;
    destinationPoint: string;
    destinationName: string;
    criteria: string[];
    members: string[];
    expectedTotalCharge: number;
    time: string;
    content?: string;
  }

  type MatchingSchema = AutoMatchingTypes | ManualMatchingTypes;

  // 공통 필드 인터페이스
  interface BaseEvent {
    topic: string;
  }

  // 각 이벤트 타입 정의
  interface MatchRoomCreatedEvent extends BaseEvent {
    topic: 'match_room_created';
    roomMasterId: number;
    maxCapacity: number;
    title: string;
    description: string;
    startPoint: string;
    startName: string;
    destinationPoint: string;
    destinationName: string;
    criteria: string[]; // Tags[]
    expectedTotalCharge: number;
    roomId: number;
    createdAt: string | null; // ISO 형식 문자열
  }

  interface MatchMemberJoinedEvent extends BaseEvent {
    topic: 'match_member_joined';
    roomId: number;
    memberId: number;
    joinedAt: string | null; // ISO 형식 문자열
  }

  interface MatchMemberCancelledEvent extends BaseEvent {
    topic: 'match_member_cancelled';
    roomId: number;
    memberId: number;
    canceledAt: string | null; // ISO 형식 문자열
  }

  interface MatchRoomCancelledEvent extends BaseEvent {
    topic: 'match_room_cancelled';
    roomId: number;
  }

  interface MatchRoomCompletedEvent extends BaseEvent {
    topic: 'match_room_completed';
    roomId: number;
  }

  // 유니온 타입 정의
  type MatchingEvent =
    | MatchRoomCreatedEvent
    | MatchMemberJoinedEvent
    | MatchMemberCancelledEvent
    | MatchRoomCancelledEvent
    | MatchRoomCompletedEvent;

  // messages 배열 타입 정의
  export type MessagesArray = MatchingEvent[];
}
