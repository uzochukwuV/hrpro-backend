import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DepartmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
