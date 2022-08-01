export interface DistanceResponse {
  rows: Row[];
  originAddresses: string[];
  destinationAddresses: string[];
}

export interface Row {
  elements: Element[];
}

export interface Element {
  distance: Distance;
  duration: Duration;
  status: string;
}

export interface Distance {
  text: string;
  value: number;
}

export interface Duration {
  text: string;
  value: number;
}
