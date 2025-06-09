import { Job } from '../../../../domain/job';
import { JobEntity } from '../entities/job.entity';

export class JobMapper {
  static toDomain(raw: JobEntity): Job {
    const domainEntity = new Job();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Job): JobEntity {
    const persistenceEntity = new JobEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
