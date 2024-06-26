export enum Species {
  LION,
  PIG,
  ELEPHANT,
}

export interface Animal {
  uuid: string;
  name: string;
  species: Species;
  age: number;
}
