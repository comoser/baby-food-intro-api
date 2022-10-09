import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BabyEntity } from '../babies/baby.entity';

export enum FoodIntroductionResult {
  Success = 'Success',
  Failure = 'Failure',
}

@Entity()
export class FoodIntroductionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  foodName!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({
    nullable: true,
  })
  preparation: string | null;

  @Column({
    nullable: true,
  })
  presentation: string | null;

  @Column({
    type: 'enum',
    enum: FoodIntroductionResult,
    nullable: true,
  })
  result: FoodIntroductionResult | null;

  @ManyToOne(() => BabyEntity, { eager: true })
  baby!: BabyEntity;
}
