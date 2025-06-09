import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { JobEntity } from '../entities/job.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Job } from '../../../../domain/job';
import { JobRepository } from '../../job.repository';
import { JobMapper } from '../mappers/job.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class JobRelationalRepository implements JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async create(data: Job): Promise<Job> {
    const persistenceModel = JobMapper.toPersistence(data);
    const newEntity = await this.jobRepository.save(
      this.jobRepository.create(persistenceModel),
    );
    return JobMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Job[]> {
    const entities = await this.jobRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => JobMapper.toDomain(entity));
  }

  async findById(id: Job['id']): Promise<NullableType<Job>> {
    const entity = await this.jobRepository.findOne({
      where: { id },
    });

    return entity ? JobMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Job['id'][]): Promise<Job[]> {
    const entities = await this.jobRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => JobMapper.toDomain(entity));
  }

  async update(id: Job['id'], payload: Partial<Job>): Promise<Job> {
    const entity = await this.jobRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.jobRepository.save(
      this.jobRepository.create(
        JobMapper.toPersistence({
          ...JobMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return JobMapper.toDomain(updatedEntity);
  }

  async remove(id: Job['id']): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
