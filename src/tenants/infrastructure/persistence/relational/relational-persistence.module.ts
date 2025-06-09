import { Module } from '@nestjs/common';
import { tenantRepository } from '../tenant.repository';
import { tenantRelationalRepository } from './repositories/tenant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tenantEntity } from './entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tenantEntity])],
  providers: [
    {
      provide: tenantRepository,
      useClass: tenantRelationalRepository,
    },
  ],
  exports: [tenantRepository],
})
export class RelationaltenantPersistenceModule {}
