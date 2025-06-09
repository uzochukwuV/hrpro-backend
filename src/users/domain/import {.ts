import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  domain: string;

  @Column('jsonb', { nullable: true })
  settings: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column()
  role: string;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  actively_recruiting: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  type: string;

  @Column('jsonb', { nullable: true })
  salary_range: any;

  @Column({ nullable: true })
  description: string;

  @Column('text', { array: true, nullable: true })
  requirements: string[];

  @Column({ default: false })
  is_remote: boolean;

  @Column({ nullable: true })
  experience_level: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  posted_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  match_score: number;

  @Column({ nullable: true })
  source: string;

  @Column('jsonb', { nullable: true })
  current_salary: any;

  @Column('jsonb', { nullable: true })
  preferred_salary: any;

  @Column({ nullable: true })
  preferred_location: string;

  @Column({ default: false })
  is_remote_preferred: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column()
  institution: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  field_of_study: string;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ default: false })
  is_current: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ default: false })
  is_current: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  category: string;

  @CreateDateColumn()
  created_at: Date;
}

@Entity()
export class CandidateSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column()
  level: number;

  @Column('decimal', { precision: 4, scale: 1 })
  years_of_experience: number;

  @CreateDateColumn()
  created_at: Date;
}

@Entity()
export class JobSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column()
  required_level: number;

  @Column({ default: true })
  is_required: boolean;

  @CreateDateColumn()
  created_at: Date;
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ default: 'submitted' })
  status: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  applied_date: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_updated: Date;

  @Column({ nullable: true })
  next_step: string;

  @Column({ type: 'timestamptz', nullable: true })
  next_step_date: Date;

  @Column({ nullable: true })
  feedback: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'info' })
  type: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  action_label: string;

  @Column({ default: false })
  is_read: boolean;

  @CreateDateColumn()
  created_at: Date;
}

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  action: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  entity_type: string;

  @Column({ type: 'uuid', nullable: true })
  entity_id: string;

  @CreateDateColumn()
  created_at: Date;
}
