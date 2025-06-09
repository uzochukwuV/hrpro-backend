import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Candidate } from '../../domain/candidate';

export abstract class CandidateRepository {
  abstract create(
    data: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Candidate>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Candidate[]>;

  abstract findById(id: Candidate['id']): Promise<NullableType<Candidate>>;

  abstract findByIds(ids: Candidate['id'][]): Promise<Candidate[]>;

  abstract update(
    id: Candidate['id'],
    payload: DeepPartial<Candidate>,
  ): Promise<Candidate | null>;

  abstract remove(id: Candidate['id']): Promise<void>;
}
