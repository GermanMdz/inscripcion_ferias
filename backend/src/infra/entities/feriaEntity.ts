import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "feria" })
export class FeriaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  fecha!: string;

  @Column({ nullable: true })
  ubicacion!: string;

  @Column({ nullable: true })
  cupo!: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
