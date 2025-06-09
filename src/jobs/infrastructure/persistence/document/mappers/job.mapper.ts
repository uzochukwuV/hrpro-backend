import { Job } from '../../../../domain/job';
import { JobSchemaClass } from '../entities/job.schema';

export class JobMapper {
  public static toDomain(raw: JobSchemaClass): Job {
    const domainEntity = new Job();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Job): JobSchemaClass {
    const persistenceSchema = new JobSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
