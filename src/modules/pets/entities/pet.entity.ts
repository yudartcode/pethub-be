import { Gender } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  species: string;

  @Column({ nullable: true })
  breed?: string;

  @Column({ nullable: true })
  dob?: Date;

  @Column({ nullable: true })
  color?: string;

  @Column('simple-array', { nullable: true })
  pictures?: string[];

  @Column({ default: false })
  isDead?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
