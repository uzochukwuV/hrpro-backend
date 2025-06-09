import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepartmentSchemaClass } from '../entities/department.schema';
import { DepartmentRepository } from '../../department.repository';
import { Department } from '../../../../domain/department';
import { DepartmentMapper } from '../mappers/department.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DepartmentDocumentRepository implements DepartmentRepository {
  constructor(
    @InjectModel(DepartmentSchemaClass.name)
    private readonly departmentModel: Model<DepartmentSchemaClass>,
  ) {}

  async create(data: Department): Promise<Department> {
    const persistenceModel = DepartmentMapper.toPersistence(data);
    const createdEntity = new this.departmentModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return DepartmentMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Department[]> {
    const entityObjects = await this.departmentModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      DepartmentMapper.toDomain(entityObject),
    );
  }

  async findById(id: Department['id']): Promise<NullableType<Department>> {
    const entityObject = await this.departmentModel.findById(id);
    return entityObject ? DepartmentMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Department['id'][]): Promise<Department[]> {
    const entityObjects = await this.departmentModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      DepartmentMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Department['id'],
    payload: Partial<Department>,
  ): Promise<NullableType<Department>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.departmentModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.departmentModel.findOneAndUpdate(
      filter,
      DepartmentMapper.toPersistence({
        ...DepartmentMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? DepartmentMapper.toDomain(entityObject) : null;
  }

  async remove(id: Department['id']): Promise<void> {
    await this.departmentModel.deleteOne({ _id: id });
  }
}
