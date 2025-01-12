declare module 'gachTaxi-types' {
  interface AutoMatchingTypes {
    route: 'BASIC' | 'REVERSE';
    members: string[];
    tags: string[];
  }

  interface ManualMatchingTypes {
    route: 'BASIC' | 'REVERSE';
    time: string;
    members: string[];
    tags: string[];
    content?: string;
  }

  type MatchingSchema = AutoMatchingTypes | ManualMatchingTypes;
}
