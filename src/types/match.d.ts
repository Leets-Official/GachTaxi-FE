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
}
