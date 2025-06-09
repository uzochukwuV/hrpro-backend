import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CandidateSchemaClass } from '../entities/candidate.schema';
import { CandidateRepository } from '../../candidate.repository';
import { Candidate } from '../../../../domain/candidate';
import { CandidateMapper } from '../mappers/candidate.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CandidateDocumentRepository implements CandidateRepository {
  constructor(
    @InjectModel(CandidateSchemaClass.name)
    private readonly candidateModel: Model<CandidateSchemaClass>,
  ) {}

  async create(data: Candidate): Promise<Candidate> {
    const persistenceModel = CandidateMapper.toPersistence(data);
    const createdEntity = new this.candidateModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return CandidateMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Candidate[]> {
    const entityObjects = await this.candidateModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      CandidateMapper.toDomain(entityObject),
    );
  }

  async findById(id: Candidate['id']): Promise<NullableType<Candidate>> {
    const entityObject = await this.candidateModel.findById(id);
    return entityObject ? CandidateMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Candidate['id'][]): Promise<Candidate[]> {
    const entityObjects = await this.candidateModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      CandidateMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Candidate['id'],
    payload: Partial<Candidate>,
  ): Promise<NullableType<Candidate>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.candidateModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.candidateModel.findOneAndUpdate(
      filter,
      CandidateMapper.toPersistence({
        ...CandidateMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? CandidateMapper.toDomain(entityObject) : null;
  }

  async remove(id: Candidate['id']): Promise<void> {
    await this.candidateModel.deleteOne({ _id: id });
  }
}
