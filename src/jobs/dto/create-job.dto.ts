import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { tenantDto } from '../../tenants/dto/tenant.dto';
import { DepartmentDto } from '../../departments/dto/department.dto';

export class CreateJobDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  salaryRange?: string;

  type?: string;

  description?: string;

  status?: string;

  isRemote?: boolean;

  requirements?: string[];

  postedDate: Date;

  experienceLevel?: string;

  location?: string | null;

  @ApiProperty({ example: 'IC intl', type: String })
  @IsNotEmpty()
  company: string | null;

  @ApiProperty({ example: 'Accountant', type: String })
  @IsNotEmpty()
  title: string | null;

  @ApiPropertyOptional({ type: () => tenantDto })
  tenant: tenantDto | null;

  @ApiPropertyOptional({ type: () => DepartmentDto })
  department: DepartmentDto | null;
}
