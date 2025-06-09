import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Job } from '../../domain/job';

export abstract class JobRepository {
  abstract create(
    data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Job>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Job[]>;

  abstract findById(id: Job['id']): Promise<NullableType<Job>>;

  abstract findByIds(ids: Job['id'][]): Promise<Job[]>;

  abstract update(
    id: Job['id'],
    payload: DeepPartial<Job>,
  ): Promise<Job | null>;

  abstract remove(id: Job['id']): Promise<void>;
}
