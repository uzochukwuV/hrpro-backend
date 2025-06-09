import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CandidateEntity } from '../entities/candidate.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Candidate } from '../../../../domain/candidate';
import { CandidateRepository } from '../../candidate.repository';
import { CandidateMapper } from '../mappers/candidate.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CandidateRelationalRepository implements CandidateRepository {
  constructor(
    @InjectRepository(CandidateEntity)
    private readonly candidateRepository: Repository<CandidateEntity>,
  ) {}

  async create(data: Candidate): Promise<Candidate> {
    const persistenceModel = CandidateMapper.toPersistence(data);
    const newEntity = await this.candidateRepository.save(
      this.candidateRepository.create(persistenceModel),
    );
    return CandidateMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Candidate[]> {
    const entities = await this.candidateRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CandidateMapper.toDomain(entity));
  }

  async findById(id: Candidate['id']): Promise<NullableType<Candidate>> {
    const entity = await this.candidateRepository.findOne({
      where: { id },
    });

    return entity ? CandidateMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Candidate['id'][]): Promise<Candidate[]> {
    const entities = await this.candidateRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CandidateMapper.toDomain(entity));
  }

  async update(
    id: Candidate['id'],
    payload: Partial<Candidate>,
  ): Promise<Candidate> {
    const entity = await this.candidateRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.candidateRepository.save(
      this.candidateRepository.create(
        CandidateMapper.toPersistence({
          ...CandidateMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CandidateMapper.toDomain(updatedEntity);
  }

  async remove(id: Candidate['id']): Promise<void> {
    await this.candidateRepository.delete(id);
  }
}
