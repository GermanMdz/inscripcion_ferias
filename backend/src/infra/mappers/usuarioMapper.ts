import { Usuario } from '../../domain/usuario/usuario';
import { UsuarioEntity } from '../entities/usuarioEntity';

export class UsuarioMapper {
  static fromEntityToDomain(entity: UsuarioEntity): Usuario {
    const usuario = new Usuario(entity.nombre, entity.email, entity.password);
    usuario.id = entity.id;
    usuario.role = entity.role;
    usuario.telefono = entity.telefono;
    usuario.rubro = entity.rubro;
    usuario.createdAt = entity.createdAt;
    return usuario;
  }

  static fromDomainToEntity(usuario: Usuario): Partial<UsuarioEntity> {
    return {
      nombre: usuario.nombre,
      email: usuario.email!,
      password: usuario.password!,
      role: usuario.role!,
      telefono: usuario.telefono!,
      rubro: usuario.rubro!,
    };
  }
}