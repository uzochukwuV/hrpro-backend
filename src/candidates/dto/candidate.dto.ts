import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class CandidateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  
}
