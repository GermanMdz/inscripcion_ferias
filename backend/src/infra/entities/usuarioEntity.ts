import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "usuario" })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  email!: string;

  @Column()
  password!: string; // hasheada con bcrypt

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role!: 'admin' | 'user';

  @Column({ nullable: true })
  rubro!: string;

  @Column({ nullable: true })
  telefono!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
