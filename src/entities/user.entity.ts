import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class UserEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  login: string;

  @Column()
  password: string;
}