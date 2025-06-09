import { Candidate } from '../../../../domain/candidate';
import { CandidateEntity } from '../entities/candidate.entity';

export class CandidateMapper {
  static toDomain(raw: CandidateEntity): Candidate {
    const domainEntity = new Candidate();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Candidate): CandidateEntity {
    const persistenceEntity = new CandidateEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
