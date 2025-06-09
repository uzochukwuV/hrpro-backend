import { Department } from '../../../../domain/department';
import { DepartmentEntity } from '../entities/department.entity';

export class DepartmentMapper {
  static toDomain(raw: DepartmentEntity): Department {
    const domainEntity = new Department();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Department): DepartmentEntity {
    const persistenceEntity = new DepartmentEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
