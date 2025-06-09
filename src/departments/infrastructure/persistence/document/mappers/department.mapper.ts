import { Department } from '../../../../domain/department';
import { DepartmentSchemaClass } from '../entities/department.schema';

export class DepartmentMapper {
  public static toDomain(raw: DepartmentSchemaClass): Department {
    const domainEntity = new Department();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Department): DepartmentSchemaClass {
    const persistenceSchema = new DepartmentSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
