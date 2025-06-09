import { ApiProperty } from '@nestjs/swagger';
import { tenant } from '../../tenants/domain/tenant';
import { User } from '../../users/domain/user';

export class Candidate {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: () => tenant,
  })
  tenant: tenant | null;


  @ApiProperty({
    type: String,
    example: '100000',
  })
  currentSalary: string | null;

  @ApiProperty({
    type: String,
    example: '200000',
  })
  preferredSalary: string | null;

  @ApiProperty({
    type: String,
    example: ' senior dev',
  })
  source: string | null;

  @ApiProperty({
    type: Number,
    example: 20,
  })
  matchScore: Number | null;

  @ApiProperty({
    type: String,
    example: 'NYC',
  })
  preferredLocation: String | null;

  @ApiProperty({
    type: User,
  })
  user: User | null;

  @ApiProperty({
    type: Boolean,
    example: true,
  })

  isRemotePreferred: boolean | null;


  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
