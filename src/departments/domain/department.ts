import { ApiProperty } from '@nestjs/swagger';
import { tenant } from '../../tenants/domain/tenant';

export class Department {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  name: string | null;

  @ApiProperty({
    type: () => tenant,
  })
  tenant: tenant | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  description: string | null;

  @ApiProperty({
    type: Boolean,
    example: 'Doe',
  })
  activelyRecruiting: boolean | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
