import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DepartmentSchema,
  DepartmentSchemaClass,
} from './entities/department.schema';
import { DepartmentRepository } from '../department.repository';
import { DepartmentDocumentRepository } from './repositories/department.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DepartmentSchemaClass.name, schema: DepartmentSchema },
    ]),
  ],
  providers: [
    {
      provide: DepartmentRepository,
      useClass: DepartmentDocumentRepository,
    },
  ],
  exports: [DepartmentRepository],
})
export class DocumentDepartmentPersistenceModule {}
