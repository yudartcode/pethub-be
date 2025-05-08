import { Exclude } from 'class-transformer';
import { Role } from 'src/core/constants/enums';
import { AdoptionRequest } from 'src/modules/adoption_request/entities/adoption_request.entity';
import { Pet } from 'src/modules/pets/entities/pet.entity';
import { Shelter } from 'src/modules/shelter/entities/shelter.entity';
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
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @OneToMany(() => AdoptionRequest, (request) => request.requester)
  adoptionRequests: AdoptionRequest[];

  @ManyToOne(() => Shelter, (shelter) => shelter.staff, { nullable: true })
  shelter: Shelter;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
