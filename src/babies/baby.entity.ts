import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ParentEntity } from '../parents/parent.entity';

@Entity()
export class BabyEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ default: false })
  isActive!: boolean;

  @Column({ type: 'date' })
  dateOfBirth!: string;

  @ManyToMany(() => ParentEntity, (parent) => parent.children, {
    eager: true,
  })
  parents!: ParentEntity[];
}
