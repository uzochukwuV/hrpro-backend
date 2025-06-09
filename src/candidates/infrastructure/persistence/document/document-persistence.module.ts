import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateSchema,
  CandidateSchemaClass,
} from './entities/candidate.schema';
import { CandidateRepository } from '../candidate.repository';
import { CandidateDocumentRepository } from './repositories/candidate.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CandidateSchemaClass.name, schema: CandidateSchema },
    ]),
  ],
  providers: [
    {
      provide: CandidateRepository,
      useClass: CandidateDocumentRepository,
    },
  ],
  exports: [CandidateRepository],
})
export class DocumentCandidatePersistenceModule {}
