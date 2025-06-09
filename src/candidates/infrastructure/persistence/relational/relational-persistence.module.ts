import { Module } from '@nestjs/common';
import { CandidateRepository } from '../candidate.repository';
import { CandidateRelationalRepository } from './repositories/candidate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateEntity } from './entities/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateEntity])],
  providers: [
    {
      provide: CandidateRepository,
      useClass: CandidateRelationalRepository,
    },
  ],
  exports: [CandidateRepository],
})
export class RelationalCandidatePersistenceModule {}
