// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatetenantDto } from './create-tenant.dto';

export class UpdatetenantDto extends PartialType(CreatetenantDto) {}
