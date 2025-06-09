import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema, JobSchemaClass } from './entities/job.schema';
import { JobRepository } from '../job.repository';
import { JobDocumentRepository } from './repositories/job.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobSchemaClass.name, schema: JobSchema },
    ]),
  ],
  providers: [
    {
      provide: JobRepository,
      useClass: JobDocumentRepository,
    },
  ],
  exports: [JobRepository],
})
export class DocumentJobPersistenceModule {}
