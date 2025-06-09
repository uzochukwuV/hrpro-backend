import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { tenantEntity } from '../entities/tenant.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { tenant } from '../../../../domain/tenant';
import { tenantRepository } from '../../tenant.repository';
import { tenantMapper } from '../mappers/tenant.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class tenantRelationalRepository implements tenantRepository {
  constructor(
    @InjectRepository(tenantEntity)
    private readonly tenantRepository: Repository<tenantEntity>,
  ) {}

  async create(data: tenant): Promise<tenant> {
    const persistenceModel = tenantMapper.toPersistence(data);
    const newEntity = await this.tenantRepository.save(
      this.tenantRepository.create(persistenceModel),
    );
    return tenantMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<tenant[]> {
    const entities = await this.tenantRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => tenantMapper.toDomain(entity));
  }

  async findById(id: tenant['id']): Promise<NullableType<tenant>> {
    const entity = await this.tenantRepository.findOne({
      where: { id },
    });

    return entity ? tenantMapper.toDomain(entity) : null;
  }

  async findByIds(ids: tenant['id'][]): Promise<tenant[]> {
    const entities = await this.tenantRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => tenantMapper.toDomain(entity));
  }

  async update(id: tenant['id'], payload: Partial<tenant>): Promise<tenant> {
    const entity = await this.tenantRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.tenantRepository.save(
      this.tenantRepository.create(
        tenantMapper.toPersistence({
          ...tenantMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return tenantMapper.toDomain(updatedEntity);
  }

  async remove(id: tenant['id']): Promise<void> {
    await this.tenantRepository.delete(id);
  }
}
