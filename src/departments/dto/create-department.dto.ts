import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { tenantDto } from '../../tenants/dto/tenant.dto';

export class CreateDepartmentDto {
  // Don't forget to use the class-validator decorators in the DTO properties.

  @ApiPropertyOptional({ type: () => tenantDto })
  @IsOptional()
  tenant: tenantDto | null;

  name: string;
  description: string;
  activelyRecruiting: boolean;
}
