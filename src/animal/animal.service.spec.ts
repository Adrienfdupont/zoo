import { Test, TestingModule } from '@nestjs/testing';
import { AnimalService } from './animal.service';
import { Animal, Species } from './animal.interface';
import { v4 as uuidv4 } from 'uuid';

describe('AnimalService', () => {
  let service: AnimalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalService],
    }).compile();

    service = module.get<AnimalService>(AnimalService);
  });

  const animal: Animal = {
    uuid: uuidv4(),
    name: 'Clément',
    age: 4,
    species: Species.PIG,
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add an animal', () => {
    service.addAnimal(animal);
    expect(service.getAnimals()).toContain(animal);
  });

  it('Should modify an animal', () => {
    service.addAnimal(animal);

    const newAge = 5;
    const newAnimal: Animal = { ...animal, age: newAge};

    service.modifyAnimal(newAnimal);
    expect(service.getAnimal(animal.uuid).age).toBe(newAge);
  });

  it('should remove an animal', () => {
    service.addAnimal(animal);

    service.removeAnimal(animal.uuid);
    expect(service.getAnimals()).not.toContain(animal.uuid);
  });
});
