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

  it('should not add a duplicate animal', () => {
    service.addAnimal(animal);
    service.addAnimal(animal);
    expect(service.getAnimals().filter(a => a.uuid === animal.uuid).length).toBe(1);
  });

  it('should modify an animal', () => {
    service.addAnimal(animal);

    const newAge = 5;
    const newAnimal: Animal = { ...animal, age: newAge };

    service.modifyAnimal(newAnimal);
    expect(service.getAnimal(animal.uuid)?.age).toBe(newAge);
  });

  it('should not modify a non-existing animal', () => {
    const newAnimal: Animal = { ...animal, uuid: uuidv4() };
    service.modifyAnimal(newAnimal);
    expect(service.getAnimals()).not.toContain(newAnimal);
  });

  it('should remove an animal', () => {
    service.addAnimal(animal);

    service.removeAnimal(animal.uuid);
    expect(service.getAnimals()).not.toContain(animal);
  });

  it('should not remove a non-existing animal', () => {
    const nonExistingUuid = uuidv4();
    const initialCount = service.getAnimals().length;
    service.removeAnimal(nonExistingUuid);
    expect(service.getAnimals().length).toBe(initialCount);
  });
});
