import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobSchemaClass } from '../entities/job.schema';
import { JobRepository } from '../../job.repository';
import { Job } from '../../../../domain/job';
import { JobMapper } from '../mappers/job.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class JobDocumentRepository implements JobRepository {
  constructor(
    @InjectModel(JobSchemaClass.name)
    private readonly jobModel: Model<JobSchemaClass>,
  ) {}

  async create(data: Job): Promise<Job> {
    const persistenceModel = JobMapper.toPersistence(data);
    const createdEntity = new this.jobModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return JobMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Job[]> {
    const entityObjects = await this.jobModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      JobMapper.toDomain(entityObject),
    );
  }

  async findById(id: Job['id']): Promise<NullableType<Job>> {
    const entityObject = await this.jobModel.findById(id);
    return entityObject ? JobMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Job['id'][]): Promise<Job[]> {
    const entityObjects = await this.jobModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      JobMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Job['id'],
    payload: Partial<Job>,
  ): Promise<NullableType<Job>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.jobModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.jobModel.findOneAndUpdate(
      filter,
      JobMapper.toPersistence({
        ...JobMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? JobMapper.toDomain(entityObject) : null;
  }

  async remove(id: Job['id']): Promise<void> {
    await this.jobModel.deleteOne({ _id: id });
  }
}
