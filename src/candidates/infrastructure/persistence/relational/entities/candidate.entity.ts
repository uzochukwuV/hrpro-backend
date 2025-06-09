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
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'candidate',
})
export class CandidateEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

   @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => tenantEntity)
  @JoinColumn({ name: 'tenant_id' })
  tenant: tenantEntity;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  matchScore: number;

  @Column({ nullable: true })
  source: string;

  @Column('jsonb', { nullable: true })
  currentSalary: any;

  @Column('jsonb', { nullable: true })
  preferredSalary: any;

  @Column({ nullable: true })
  preferredLocation: string;

  @Column({ default: false })
  isRemotePreferred: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
