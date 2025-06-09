import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { tenantsService } from './tenants.service';
import { tenantsController } from './tenants.controller';
import { RelationaltenantPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';
import { DocumenttenantPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumenttenantPersistenceModule
  : RelationaltenantPersistenceModule;

@Module({
  imports: [
    // do not remove this comment
    infrastructurePersistenceModule,
  ],
  controllers: [tenantsController],
  providers: [tenantsService],
  exports: [tenantsService, infrastructurePersistenceModule],
})
export class tenantsModule {}
