import { tenant } from '../../../../domain/tenant';
import { tenantEntity } from '../entities/tenant.entity';

export class tenantMapper {
  static toDomain(raw: tenantEntity): tenant {
    const domainEntity = new tenant();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: tenant): tenantEntity {
    const persistenceEntity = new tenantEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
