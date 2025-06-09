import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { tenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { DepartmentEntity } from '../../../../../departments/infrastructure/persistence/relational/entities/department.entity';

@Entity({
  name: 'job',
})
export class JobEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => tenantEntity)
  @JoinColumn({ name: 'tenant_id' })
  tenant: tenantEntity;

  @ManyToOne(() => DepartmentEntity)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  type: string;

  @Column('jsonb', { nullable: true })
  salaryRange: any;

  @Column({ nullable: true })
  description: string;

  @Column('text', { array: true, nullable: true })
  requirements: string[];

  @Column({ default: false })
  isRemote: boolean;

  @Column({ nullable: true })
  experienceLevel: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  postedDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
