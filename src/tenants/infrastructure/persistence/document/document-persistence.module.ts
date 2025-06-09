import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { tenantSchema, tenantSchemaClass } from './entities/tenant.schema';
import { tenantRepository } from '../tenant.repository';
import { tenantDocumentRepository } from './repositories/tenant.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: tenantSchemaClass.name, schema: tenantSchema },
    ]),
  ],
  providers: [
    {
      provide: tenantRepository,
      useClass: tenantDocumentRepository,
    },
  ],
  exports: [tenantRepository],
})
export class DocumenttenantPersistenceModule {}
