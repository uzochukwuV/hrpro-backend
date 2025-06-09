import { Candidate } from '../../../../domain/candidate';
import { CandidateSchemaClass } from '../entities/candidate.schema';

export class CandidateMapper {
  public static toDomain(raw: CandidateSchemaClass): Candidate {
    const domainEntity = new Candidate();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Candidate): CandidateSchemaClass {
    const persistenceSchema = new CandidateSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
