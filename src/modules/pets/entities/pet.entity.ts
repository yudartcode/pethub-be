import { Gender } from 'src/core/constants/enums';
import { AdoptionRequest } from 'src/modules/adoption_request/entities/adoption_request.entity';
import { Shelter } from 'src/modules/shelter/entities/shelter.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
  gender: Gender;

  @Column()
  description: string;

  @Column({ default: true })
  isAvailableForAdoption: boolean;

  @ManyToOne(() => Shelter, (shelter) => shelter.pets, { nullable: true })
  shelter?: Shelter;

  @ManyToOne(() => User, (user) => user.pets, { nullable: true })
  owner?: User;

  @OneToMany(() => AdoptionRequest, (request) => request.pet)
  adoptionRequests: AdoptionRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
