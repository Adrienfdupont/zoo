import { Injectable } from '@nestjs/common';
import { Animal, Species } from '../animal/animal.interface';
import { Enclosure } from './enclosure.interface';

interface IEnclosureService {
  addAnimal(enclosure: Enclosure, animal: Animal): void;
  getAnimals(enclosure: Enclosure): Animal[];
  removeAnimal(enclosure: Enclosure, animal: Animal): void;
  containsAnimal(enclosure: Enclosure, animal: Animal): boolean;
}

@Injectable()
export class EnclosureService implements IEnclosureService {
  addAnimal(enclosure: Enclosure, animal: Animal): void {
    if (
      enclosure.animals.length < enclosure.maxSize &&
      enclosure.speciesAllowed.includes(animal.species)
    ) {
      enclosure.animals.push(animal);
    }
  }

  getAnimals(enclosure: Enclosure): Animal[] {
    return enclosure.animals;
  }

  removeAnimal(enclosure: Enclosure, animal: Animal): void {
    enclosure.animals = enclosure.animals.filter((a) => a.uuid !== animal.uuid);
  }

  containsAnimal(enclosure: Enclosure, animal: Animal): boolean {
    return enclosure.animals.some((a) => a.uuid === animal.uuid);
  }
}
