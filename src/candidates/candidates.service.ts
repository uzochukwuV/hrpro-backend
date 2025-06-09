import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateRepository } from './infrastructure/persistence/candidate.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Candidate } from './domain/candidate';
import { tenant } from '../tenants/domain/tenant';
import { tenantsService } from '../tenants/tenants.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

@Injectable()
export class CandidatesService {
  constructor(
    // Dependencies here
    private readonly candidateRepository: CandidateRepository,
    private readonly tenantService: tenantsService,
    private readonly userService: UsersService,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createCandidateDto: CreateCandidateDto,
  ) {
    // Do not remove comment below.
    // <creating-property />
    let tenant: tenant | null = null;
    
        if (createCandidateDto.tenant?.id ) {
          const tenantObject = await this.tenantService.findById(
            createCandidateDto.tenant.id,
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

         let user: User | null = null;
    
        if (createCandidateDto.user?.id ) {
          const userObject = await this.userService.findById(
            createCandidateDto.user.id,
          );
          if (!userObject) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                user: 'userNotExists',
              },
            });
          }
          user = userObject;
        }

    return this.candidateRepository.create({
      preferredLocation: createCandidateDto.preferredLocation,
      preferredSalary: createCandidateDto.preferredSalary,
      tenant: tenant,
      source: createCandidateDto.source, 
      matchScore: createCandidateDto.matchScore,
      currentSalary: createCandidateDto.currentSalary,
      isRemotePreferred: createCandidateDto.isRemotePreferred,
      user: user
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.candidateRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Candidate['id']) {
    return this.candidateRepository.findById(id);
  }

  findByIds(ids: Candidate['id'][]) {
    return this.candidateRepository.findByIds(ids);
  }

  async update(
    id: Candidate['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateCandidateDto: UpdateCandidateDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.candidateRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Candidate['id']) {
    return this.candidateRepository.remove(id);
  }
}
