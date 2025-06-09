import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { RelationalCandidatePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';
import { DocumentCandidatePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { tenantsModule } from '../tenants/tenants.module';
import { UsersModule } from '../users/users.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentCandidatePersistenceModule
  : RelationalCandidatePersistenceModule;

@Module({
  imports: [
    // do not remove this comment
    infrastructurePersistenceModule,
    tenantsModule,
    UsersModule
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService, infrastructurePersistenceModule],
})
export class CandidatesModule {}
