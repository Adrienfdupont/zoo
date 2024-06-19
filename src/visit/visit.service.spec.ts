import { Test, TestingModule } from '@nestjs/testing';
import { VisitService } from './visit.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('VisitService', () => {
  let service: VisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitService],
    }).compile();

    service = module.get<VisitService>(VisitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new visit', () => {
    const visit = service.addVisit('2024-06-19', '10:00', '12:00', ['Enclos1', 'Enclos2']);
    expect(visit).toBeDefined();
    expect(service.getAllVisits()).toHaveLength(1);
  });

  it('should not allow more than 5 enclosures in a visit', () => {
    expect(() => {
      service.addVisit('2024-06-19', '10:00', '12:00', ['Enclos1', 'Enclos2', 'Enclos3', 'Enclos4', 'Enclos5', 'Enclos6']);
    }).toThrow(BadRequestException);
  });

  it('should get a visit by id', () => {
    const visit = service.addVisit('2024-06-19', '10:00', '12:00', ['Enclos1']);
    const foundVisit = service.getVisitById(visit.id);
    expect(foundVisit).toBeDefined();
  });

  it('should throw an error if visit not found', () => {
    expect(() => {
      service.getVisitById('non-existent-id');
    }).toThrow(NotFoundException);
  });

  it('should update an existing visit', () => {
    const visit = service.addVisit('2024-06-19', '10:00', '12:00', ['Enclos1']);
    const updatedVisit = service.updateVisit(visit.id, '2024-06-20', '11:00', '13:00', ['Enclos1', 'Enclos2']);
    expect(updatedVisit.date).toBe('2024-06-20');
    expect(updatedVisit.startTime).toBe('11:00');
  });

  it('should delete a visit', () => {
    const visit = service.addVisit('2024-06-19', '10:00', '12:00', ['Enclos1']);
    service.deleteVisit(visit.id);
    expect(() => {
      service.getVisitById(visit.id);
    }).toThrow(NotFoundException);
  });
});
