import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Note } from './entity/notes.entity';


@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) { }

  async create(body: any) {
    try {
      return await this.notesRepository.save(body)
    } catch (error) {
      console.log(error)
      return error;
    }

  }


  async update(updateNotesDto: any, userId, id): Promise<Note> {
    try {
      await this.notesRepository
        .createQueryBuilder()
        .update(Note)
        .set(updateNotesDto)
        .where({ id, userId })
        .execute();
      let updatedNotes = await this.notesRepository.findOneBy({ id })
      return updatedNotes;
    } catch (error) {
      return error;
    }

  }

  async findAllofUser(userId, filterObject): Promise<Note[]> {
    console.log("filterObject", filterObject)
    const { createdAt, updatedAt } = filterObject;
    let obj = {};
    if (createdAt) {
      obj['createdAt'] = Raw(dateField => `DATE(${dateField}) <= DATE(:createdAt)`, { createdAt })
    }
    if (updatedAt) {
      obj['updatedAt'] = Raw(dateField => `DATE(${dateField}) <= DATE(:updatedAt)`, { updatedAt })
    }
    return this.notesRepository.find({
      where: {
        ...filterObject,
        ...obj,
        userId
      }
    });
  }

  async filter(userId): Promise<Note[]> {
    return this.notesRepository.find({
      where: {
        userId
      }
    });
  }

  async findOne(id: string, userId): Promise<Note> {
    return this.notesRepository.findOne({
      where: {
        id,
        userId
      }
    });
  }

  async remove(id: string, userId): Promise<void> {
    await this.notesRepository.delete({ id, userId });
  }

}