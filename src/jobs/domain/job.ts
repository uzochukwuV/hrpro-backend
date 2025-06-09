import { ApiProperty } from '@nestjs/swagger';
import { tenant } from '../../tenants/domain/tenant';
import { Department } from '../../departments/domain/department';

export class Job {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  company: string | null;

  @ApiProperty({
    type: String,
    example: 'Software dev',
  })
  title: string | null;

  @ApiProperty({
    type: String,
    example: 'Los Angeles',
  })
  location: string | null;

  @ApiProperty({
    type: String,
    example: 'remote',
  })
  type: string | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  salaryRange: string | null;

  @ApiProperty({
    type: String,
    example: 'full time mid dev',
  })
  description: string | null;

  @ApiProperty({
    type: Array<string>,
    example: [],
  })
  requirements: Array<string> | null;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isRemote: boolean | null;

  @ApiProperty({
    type: String,
    example: ' senior dev',
  })
  experienceLevel: string | null;

  @ApiProperty({
    type: String,
    example: 'active',
  })
  status: string | null;

  @ApiProperty({
    type: () => tenant,
  })
  tenant: tenant | null;

  @ApiProperty({
    type: () => Department,
  })
  department: Department | null;

  @ApiProperty()
  postedDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
