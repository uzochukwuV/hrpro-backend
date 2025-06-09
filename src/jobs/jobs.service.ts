import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobRepository } from './infrastructure/persistence/job.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Job } from './domain/job';
import { tenant } from '../tenants/domain/tenant';
import { tenantsService } from '../tenants/tenants.service';
import { Department } from '../departments/domain/department';
import { DepartmentsService } from '../departments/departments.service';

@Injectable()
export class JobsService {
  constructor(
    // Dependencies here
    private readonly jobRepository: JobRepository,
    private readonly tenantService: tenantsService,
    private readonly departmentService: DepartmentsService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    // Do not remove comment below.
    // <creating-property />

    let tenant: tenant | null = null;

    if (createJobDto.tenant?.id) {
      const tenantObject = await this.tenantService.findById(
        createJobDto.tenant.id,
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

    let department: Department | null = null;
    if (createJobDto.department?.id) {
      const departmentObject = await this.departmentService.findById(
        createJobDto.department!.id,
      );
      if (!departmentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            department: 'DepartmentNotExists',
          },
        });
      }
      department = departmentObject;
    }

    return this.jobRepository.create({
      department: department!,
      tenant: tenant!,
      description: createJobDto.description!,
      postedDate: createJobDto.postedDate,
      type: createJobDto.type!,
      title: createJobDto.title,
      location: createJobDto.location!,
      experienceLevel: createJobDto.experienceLevel!,
      requirements: createJobDto.requirements!,
      isRemote: createJobDto.isRemote!,
      salaryRange: createJobDto.salaryRange!,
      company: createJobDto.company!,
      status: createJobDto.status!,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.jobRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Job['id']) {
    return this.jobRepository.findById(id);
  }

  findByIds(ids: Job['id'][]) {
    return this.jobRepository.findByIds(ids);
  }

  async update(
    id: Job['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateJobDto: UpdateJobDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.jobRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Job['id']) {
    return this.jobRepository.remove(id);
  }
}
