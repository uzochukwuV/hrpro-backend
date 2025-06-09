import { Module } from '@nestjs/common';
import { DepartmentRepository } from '../department.repository';
import { DepartmentRelationalRepository } from './repositories/department.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  providers: [
    {
      provide: DepartmentRepository,
      useClass: DepartmentRelationalRepository,
    },
  ],
  exports: [DepartmentRepository],
})
export class RelationalDepartmentPersistenceModule {}
