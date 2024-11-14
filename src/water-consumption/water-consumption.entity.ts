import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class WaterConsumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('float')
  amount: number;

  @CreateDateColumn()
  date: Date;
}
