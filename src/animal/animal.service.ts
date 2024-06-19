import { Injectable } from '@nestjs/common';
import { Animal } from './animal.interface';

@Injectable()
export class AnimalService {
    private records: Animal[] = [];

    addAnimal(animal: Animal) {
        this.records.push(animal);
    }

    getAnimals() {
        return this.records;
    }

    getAnimal(uuid: string) {
        return this.records.find(a => a.uuid === uuid);
    }

    modifyAnimal(animal: Animal) {
        const index = this.records.findIndex(a => a.uuid === animal.uuid);
        
        if (index !== -1) {
            this.records[index] = animal;
        }
    }

    removeAnimal(uuid: string) {
        this.records = this.records.filter(a => a.uuid !== uuid);
    }
}
