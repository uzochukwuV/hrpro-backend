import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tenantSchemaClass } from '../entities/tenant.schema';
import { tenantRepository } from '../../tenant.repository';
import { tenant } from '../../../../domain/tenant';
import { tenantMapper } from '../mappers/tenant.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class tenantDocumentRepository implements tenantRepository {
  constructor(
    @InjectModel(tenantSchemaClass.name)
    private readonly tenantModel: Model<tenantSchemaClass>,
  ) {}

  async create(data: tenant): Promise<tenant> {
    const persistenceModel = tenantMapper.toPersistence(data);
    const createdEntity = new this.tenantModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return tenantMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<tenant[]> {
    const entityObjects = await this.tenantModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      tenantMapper.toDomain(entityObject),
    );
  }

  async findById(id: tenant['id']): Promise<NullableType<tenant>> {
    const entityObject = await this.tenantModel.findById(id);
    return entityObject ? tenantMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: tenant['id'][]): Promise<tenant[]> {
    const entityObjects = await this.tenantModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      tenantMapper.toDomain(entityObject),
    );
  }

  async update(
    id: tenant['id'],
    payload: Partial<tenant>,
  ): Promise<NullableType<tenant>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.tenantModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.tenantModel.findOneAndUpdate(
      filter,
      tenantMapper.toPersistence({
        ...tenantMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? tenantMapper.toDomain(entityObject) : null;
  }

  async remove(id: tenant['id']): Promise<void> {
    await this.tenantModel.deleteOne({ _id: id });
  }
}
