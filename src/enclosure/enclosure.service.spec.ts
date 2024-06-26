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

  it('should not add an animal if enclosure is full', () => {
    const animal1: Animal = {
      uuid: uuidv4(),
      name: 'Simba',
      age: 4,
      species: Species.LION,
    };
    const animal2: Animal = {
      uuid: uuidv4(),
      name: 'Nala',
      age: 3,
      species: Species.LION,
    };
    const animal3: Animal = {
      uuid: uuidv4(),
      name: 'Mufasa',
      age: 6,
      species: Species.LION,
    };

    const enclosure: Enclosure = {
      maxSize: 2,
      speciesAllowed: [Species.LION],
      animals: [animal1, animal2],
    };

    service.addAnimal(enclosure, animal3);
    expect(service.getAnimals(enclosure)).not.toContain(animal3);
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
      speciesAllowed: [Species.LION],
      animals: [animal],
    };

    service.removeAnimal(enclosure, animal);
    expect(service.getAnimals(enclosure)).not.toContain(animal);
    expect(service.getAnimals(enclosure)).toEqual([]);
  });

  it('should check if an animal is in the enclosure', () => {
    const animal: Animal = {
      uuid: uuidv4(),
      name: 'Simba',
      age: 4,
      species: Species.LION,
    };

    const enclosure: Enclosure = {
      maxSize: 2,
      speciesAllowed: [Species.LION],
      animals: [animal],
    };

    expect(service.containsAnimal(enclosure, animal)).toBe(true);
    service.removeAnimal(enclosure, animal);
    expect(service.containsAnimal(enclosure, animal)).toBe(false);
  });
});
