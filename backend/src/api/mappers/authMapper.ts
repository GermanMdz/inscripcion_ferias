import { Usuario } from '../../domain/usuario/usuario';
import { RegisterDto, AuthResponseDto } from '../auth/authDtos';

export class AuthMapper {
  // DTO -> Domain (cuando llega del cliente)
  static fromRegisterDtoToDomain(dto: RegisterDto): Usuario {
    const usuario = new Usuario(dto.nombre, dto.email, dto.password);
    usuario.telefono = dto.telefono;
    usuario.rubro = dto.rubro;
    return usuario;
  }

  // Domain -> ResponseDto (cuando respondemos al cliente)
  // IMPORTANTE: NO incluir password en la respuesta
  static fromDomainToAuthResponseDto(
    usuario: Usuario,
    token: string,
    refreshToken: string
  ): AuthResponseDto {
    return {
      id: usuario.id!,
      nombre: usuario.nombre,
      email: usuario.email!,
      role: usuario.role!,
      token,
      refreshToken,
    };
  }

  // Para actualizar perfil (sin password)
  static fromDomainToProfileDto(usuario: Usuario) {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role,
      telefono: usuario.telefono,
      rubro: usuario.rubro,
      createdAt: usuario.createdAt,
    };
  }
}

export const authMapper = AuthMapper;