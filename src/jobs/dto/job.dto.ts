import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JobDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
