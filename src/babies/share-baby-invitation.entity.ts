import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ParentEntity } from '../parents/parent.entity';
import { BabyEntity } from './baby.entity';

export enum ShareBabyInvitationStatus {
  Accepted,
  Pending,
  Rejected,
}

@Entity()
export class ShareBabyInvitationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'timestamptz' })
  date!: string;

  @Column()
  otherParentEmail!: string;

  @Column({
    type: 'enum',
    enum: ShareBabyInvitationStatus,
    default: ShareBabyInvitationStatus.Pending,
  })
  status: ShareBabyInvitationStatus;

  @ManyToOne(() => ParentEntity, {
    eager: true,
  })
  requester!: ParentEntity;

  @ManyToOne(() => BabyEntity, {
    eager: true,
  })
  baby: BabyEntity;
}
