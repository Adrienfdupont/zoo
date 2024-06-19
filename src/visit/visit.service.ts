import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Visit } from '../models/visit/visit.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VisitService {
  private visits: Visit[] = [];

  getAllVisits(): Visit[] {
    return this.visits;
  }

  getVisitById(id: string): Visit {
    const visit = this.visits.find((visit) => visit.id === id);
    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    return visit;
  }

  addVisit(date: string, startTime: string, endTime: string, enclosures: string[]): Visit {
    if (enclosures.length > 5) {
      throw new BadRequestException('A visit cannot include more than 5 enclosures');
    }
    const newVisit: Visit = {
      id: uuidv4(),
      date,
      startTime,
      endTime,
      enclosures,
    };
    this.visits.push(newVisit);
    return newVisit;
  }

  updateVisit(id: string, date: string, startTime: string, endTime: string, enclosures: string[]): Visit {
    const visit = this.getVisitById(id);
    if (enclosures.length > 5) {
      throw new BadRequestException('A visit cannot include more than 5 enclosures');
    }
    visit.date = date;
    visit.startTime = startTime;
    visit.endTime = endTime;
    visit.enclosures = enclosures;
    return visit;
  }

  deleteVisit(id: string): void {
    const index = this.visits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    this.visits.splice(index, 1);
  }
}
