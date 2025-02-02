declare module 'gachTaxi-types' {
  interface RequestMatchingTypes {
    roomId: string;
  }

  interface Room {
    roomId: number;
    title: string;
    departure: string;
    destination: string;
    departureTime: string;
    maxCapacity: number;
    currentMembers: number;
    tags: string[];
  }

  interface Pageable {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    last: boolean;
  }

  interface RoomData {
    rooms: Room[];
    pageable: Pageable;
  }

  interface RoomResponse {
    code: number;
    message: string;
    data: RoomData;
  }
}
