import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "ferias" })
export class FeriaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
