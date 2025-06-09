import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class tenantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
