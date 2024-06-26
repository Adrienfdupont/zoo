import { Injectable } from '@nestjs/common';
import { Animal } from './animal.interface';

interface IAnimalService {
  addAnimal(animal: Animal): void;
  getAnimals(): Animal[];
  getAnimal(uuid: string): Animal | undefined;
  modifyAnimal(animal: Animal): void;
  removeAnimal(uuid: string): void;
}

@Injectable()
export class AnimalService implements IAnimalService {
  private records: Animal[] = [];

  addAnimal(animal: Animal): void {
    this.records.push(animal);
  }

  getAnimals(): Animal[] {
    return this.records;
  }

  getAnimal(uuid: string): Animal | undefined {
    return this.records.find((a) => a.uuid === uuid);
  }

  modifyAnimal(animal: Animal): void {
    const index = this.records.findIndex((a) => a.uuid === animal.uuid);
    if (index !== -1) {
      this.records[index] = animal;
    }
  }

  removeAnimal(uuid: string): void {
    this.records = this.records.filter((a) => a.uuid !== uuid);
  }
}
