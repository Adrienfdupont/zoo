import { Test, TestingModule } from '@nestjs/testing';
import { EnclosureService } from './enclosure.service';
import { Animal, Species } from '../animal/animal.interface';
import { v4 as uuidv4 } from 'uuid';
import { Enclosure } from './enclosure.interface';

describe('EnclosureService', () => {
  let service: EnclosureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnclosureService],
    }).compile();

    service = module.get<EnclosureService>(EnclosureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add an animal to the enclosure', () => {
    const animal: Animal = {
      uuid: uuidv4(),
      name: 'Simba',
      age: 4,
      species: Species.LION,
    };

    const enclosure: Enclosure = {
      maxSize: 2,
      speciesAllowed: [Species.LION],
      animals: [],
    };

    service.addAnimal(enclosure, animal);
    expect(service.getAnimals(enclosure)).toContain(animal);
  });

  it('should remove an animal from the enclosure', () => {
    const animal: Animal = {
      uuid: uuidv4(),
      name: 'Simba',
      age: 4,
      species: Species.LION,
    };

    const enclosure: Enclosure = {
      maxSize: 2,
      speciesAllowed: [Species.ELEPHANT],
      animals: [animal],
    };

    service.removeAnimal(enclosure, animal);
    expect(service.getAnimals(enclosure)).not.toContain(animal);
    expect(service.getAnimals(enclosure)).toEqual([]);
  });
});
