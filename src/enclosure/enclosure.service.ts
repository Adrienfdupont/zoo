import { Injectable } from '@nestjs/common';
import { Animal } from 'src/animal/animal.interface';
import { Enclosure } from './enclosure.interface';

@Injectable()
export class EnclosureService {
  addAnimal(enclosure: Enclosure, animal: Animal) {
    if (
      enclosure.animals.length < enclosure.maxSize &&
      enclosure.speciesAllowed.includes(animal.species)
    ) {
      enclosure.animals.push(animal);
    }
  }

  getAnimals(enclosure: Enclosure) {
    return enclosure.animals;
  }

  removeAnimal(enclosure: Enclosure, animal: Animal) {
    enclosure.animals = enclosure.animals.filter((a) => a.uuid !== animal.uuid);
  }

  containsAnimal(enclosure: Enclosure, animal: Animal) {
    return enclosure.animals.includes(animal);
  }
}
