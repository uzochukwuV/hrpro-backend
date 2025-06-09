import { ApiProperty } from '@nestjs/swagger';

export class tenant {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  domain: string;

  @ApiProperty({
    type: String,
  })
  settings: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
