import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "usuario" })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  rubro!: string;

  @Column({ nullable: true })
  telefono!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
