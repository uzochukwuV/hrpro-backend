import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from './infrastructure/persistence/department.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Department } from './domain/department';
import { tenant } from '../tenants/domain/tenant';
import { tenantsService } from '../tenants/tenants.service';

@Injectable()
export class DepartmentsService {
  constructor(
    // Dependencies here
    private readonly departmentRepository: DepartmentRepository,
    private readonly tenantService: tenantsService,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    // Do not remove comment below.
    // <creating-property />

    let tenant: tenant | null = null;

    if (createDepartmentDto.tenant?.id) {
      const tenantObject = await this.tenantService.findById(
        createDepartmentDto.tenant.id,
      );
      if (!tenantObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            tenant: 'TenantNotExists',
          },
        });
      }
      tenant = tenantObject;
    }

    return this.departmentRepository.create({
      name: createDepartmentDto.name,
      description: createDepartmentDto.description,
      tenant,
      activelyRecruiting: createDepartmentDto.activelyRecruiting,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.departmentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Department['id']) {
    return this.departmentRepository.findById(id);
  }

  findByIds(ids: Department['id'][]) {
    return this.departmentRepository.findByIds(ids);
  }

  async update(
    id: Department['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.departmentRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Department['id']) {
    return this.departmentRepository.remove(id);
  }
}
