import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { RelationalDepartmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';
import { DocumentDepartmentPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { tenantsModule } from '../tenants/tenants.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentDepartmentPersistenceModule
  : RelationalDepartmentPersistenceModule;

@Module({
  imports: [
    // do not remove this comment
    infrastructurePersistenceModule,
    tenantsModule,
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService, infrastructurePersistenceModule],
})
export class DepartmentsModule {}
