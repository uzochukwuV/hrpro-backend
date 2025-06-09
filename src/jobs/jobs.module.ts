import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { RelationalJobPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';
import { DocumentJobPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { DepartmentsModule } from '../departments/departments.module';
import { tenantsModule } from '../tenants/tenants.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentJobPersistenceModule
  : RelationalJobPersistenceModule;

@Module({
  imports: [
    // do not remove this comment
    infrastructurePersistenceModule,
    DepartmentsModule,
    tenantsModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService, infrastructurePersistenceModule],
})
export class JobsModule {}
