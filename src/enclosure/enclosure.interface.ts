import { Animal, Species } from '../animal/animal.interface';

export interface Enclosure {
  maxSize: number;
  speciesAllowed: Species[];
  animals: Animal[];
}
