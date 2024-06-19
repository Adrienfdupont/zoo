import { Injectable } from '@nestjs/common';
import { Animal } from 'src/animal/animal.interface';

@Injectable()
export class EnclosureService {
    private records: Animal[] = [];
    
    addAnimal(animal: Animal) {
        this.records.push(animal);
    }
    
    getAnimals() {
        return this.records;
    }

    removeAnimal(animal: Animal) {
        this.records = this.records.filter(a => a.uuid !== animal.uuid);
    }
}
