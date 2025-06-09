import { tenant } from '../../../../domain/tenant';
import { tenantSchemaClass } from '../entities/tenant.schema';

export class tenantMapper {
  public static toDomain(raw: tenantSchemaClass): tenant {
    const domainEntity = new tenant();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: tenant): tenantSchemaClass {
    const persistenceSchema = new tenantSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
