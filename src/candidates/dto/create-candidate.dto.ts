import { ApiPropertyOptional } from "@nestjs/swagger";
import { tenantDto } from "../../tenants/dto/tenant.dto";
import { UserDto } from "../../users/dto/user.dto";

export class CreateCandidateDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiPropertyOptional({ type: () => tenantDto })
  tenant: tenantDto | null;

  currentSalary: string;
  
  preferredSalary: string;

  isRemotePreferred: boolean;

  preferredLocation: string;

  source: string;

  matchScore: number;

  user: UserDto
}
