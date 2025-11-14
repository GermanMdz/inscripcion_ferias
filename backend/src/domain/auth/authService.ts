import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Usuario } from '../usuario/usuario';
import {
  crearUsuarioRepo,
  obtenerUsuarioPorEmailRepo,
  obtenerUsuarioPorIdRepo,
} from '../../infra/repositories/usuarioRepository';
import { TokenPayload } from '../../api/auth/authDtos';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key';
const JWT_EXPIRATION = '15m';
const JWT_REFRESH_EXPIRATION = '7d';

export class AuthService {
  async register(usuario: Usuario): Promise<Usuario> {
    // Verificar que el email no exista
    const existente = await obtenerUsuarioPorEmailRepo(usuario.email!);
    if (existente) {
      throw new Error('El email ya está registrado');
    }

    // Hashear password
    usuario.password = await bcrypt.hash(usuario.password!, 10);

    // Guardar en DB
    return await crearUsuarioRepo(usuario);
  }

  async login(email: string, password: string): Promise<{ usuario: Usuario; token: string; refreshToken: string }> {
    // Buscar usuario
    console.log('🔍 Buscando usuario con email:', email);
    const usuario = await obtenerUsuarioPorEmailRepo(email);
    
    if (!usuario) {
      console.log('❌ Usuario no encontrado');
      throw new Error('Email o contraseña incorrectos');
    }

    console.log('✅ Usuario encontrado:', usuario.email);
    console.log('🔐 Password en BD existe:', !!usuario.password);
    console.log('🔐 Password proporcionado existe:', !!password);

    // Verificar password
    if (!usuario.password || !password) {
      console.error('❌ Password faltante - BD:', !!usuario.password, '- Formulario:', !!password);
      throw new Error('Email o contraseña incorrectos');
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValida) {
      console.log('❌ Password incorrecto');
      throw new Error('Email o contraseña incorrectos');
    }

    console.log('✅ Password correcto');

    // Generar tokens
    const token = this.generarToken(usuario);
    const refreshToken = this.generarRefreshToken(usuario);

    return { usuario, token, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as TokenPayload;
      
      // Buscar usuario
      const usuario = await obtenerUsuarioPorIdRepo(payload.userId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Generar nuevos tokens
      const nuevoToken = this.generarToken(usuario);
      const nuevoRefreshToken = this.generarRefreshToken(usuario);

      return { token: nuevoToken, refreshToken: nuevoRefreshToken };
    } catch (error) {
      throw new Error('Refresh token inválido');
    }
  }

  private generarToken(usuario: Usuario): string {
    const payload: TokenPayload = {
      userId: usuario.id!,
      email: usuario.email!,
      role: usuario.role!,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }

  private generarRefreshToken(usuario: Usuario): string {
    const payload: TokenPayload = {
      userId: usuario.id!,
      email: usuario.email!,
      role: usuario.role!,
    };
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
  }
}

export const authService = new AuthService();