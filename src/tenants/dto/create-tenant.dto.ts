import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatetenantDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  settings: string;
}
