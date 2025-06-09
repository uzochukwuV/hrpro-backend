import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreatetenantDto } from './dto/create-tenant.dto';
import { UpdatetenantDto } from './dto/update-tenant.dto';
import { tenantRepository } from './infrastructure/persistence/tenant.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { tenant } from './domain/tenant';

@Injectable()
export class tenantsService {
  constructor(
    // Dependencies here
    private readonly tenantRepository: tenantRepository,
  ) {}

  async create(createtenantDto: CreatetenantDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.tenantRepository.create(createtenantDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.tenantRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: tenant['id']) {
    return this.tenantRepository.findById(id);
  }

  findByIds(ids: tenant['id'][]) {
    return this.tenantRepository.findByIds(ids);
  }

  async update(
    id: tenant['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatetenantDto: UpdatetenantDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.tenantRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: tenant['id']) {
    return this.tenantRepository.remove(id);
  }
}
