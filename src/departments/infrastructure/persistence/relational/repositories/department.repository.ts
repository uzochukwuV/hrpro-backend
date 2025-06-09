import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DepartmentEntity } from '../entities/department.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Department } from '../../../../domain/department';
import { DepartmentRepository } from '../../department.repository';
import { DepartmentMapper } from '../mappers/department.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DepartmentRelationalRepository implements DepartmentRepository {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async create(data: Department): Promise<Department> {
    const persistenceModel = DepartmentMapper.toPersistence(data);
    const newEntity = await this.departmentRepository.save(
      this.departmentRepository.create(persistenceModel),
    );
    return DepartmentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Department[]> {
    const entities = await this.departmentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => DepartmentMapper.toDomain(entity));
  }

  async findById(id: Department['id']): Promise<NullableType<Department>> {
    const entity = await this.departmentRepository.findOne({
      where: { id },
    });

    return entity ? DepartmentMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Department['id'][]): Promise<Department[]> {
    const entities = await this.departmentRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DepartmentMapper.toDomain(entity));
  }

  async update(
    id: Department['id'],
    payload: Partial<Department>,
  ): Promise<Department> {
    const entity = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.departmentRepository.save(
      this.departmentRepository.create(
        DepartmentMapper.toPersistence({
          ...DepartmentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DepartmentMapper.toDomain(updatedEntity);
  }

  async remove(id: Department['id']): Promise<void> {
    await this.departmentRepository.delete(id);
  }
}
