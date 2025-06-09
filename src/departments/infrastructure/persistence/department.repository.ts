import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Department } from '../../domain/department';

export abstract class DepartmentRepository {
  abstract create(
    data: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Department>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Department[]>;

  abstract findById(id: Department['id']): Promise<NullableType<Department>>;

  abstract findByIds(ids: Department['id'][]): Promise<Department[]>;

  abstract update(
    id: Department['id'],
    payload: DeepPartial<Department>,
  ): Promise<Department | null>;

  abstract remove(id: Department['id']): Promise<void>;
}
