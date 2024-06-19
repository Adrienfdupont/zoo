import { Test, TestingModule } from '@nestjs/testing';
import { EnclosureService } from './enclosure.service';
import { Species } from 'src/species/species.interface';
import { Animal } from 'src/animal/animal.interface';
import { v4 as uuidv4 } from 'uuid';

describe('EnclosureService', () => {
  let service: EnclosureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnclosureService],
    }).compile();

    service = module.get<EnclosureService>(EnclosureService);
  });

  const species: Species = { name: 'Lion' };
  const animal: Animal = { uuid: uuidv4(), name: 'Simba', age: 4, species: species };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add an animal to the enclosure', () => {
    service.addAnimal(animal);
    expect(service.getAnimals()).toContain(animal);
  });

  it('should remove an animal from the enclosure', () => {
    service.addAnimal(animal);
    expect(service.getAnimals()).toContain(animal);

    service.removeAnimal(animal);
    expect(service.getAnimals()).not.toContain(animal);
  });
});
