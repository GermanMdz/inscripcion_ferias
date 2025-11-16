import { type Request, type Response } from 'express';
import { authService } from '../../domain/auth/authService';
import { authMapper } from '../mappers/authMapper';
import { RegisterDto, LoginDto } from '../auth/authDtos';
// import { Usuario } from '../../';
// import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        const dto: RegisterDto = req.body;

        if (!dto.nombre || !dto.email || !dto.password) {
            return res.status(400).json({
                error: 'nombre, email y password son requeridos'
            });
        }
        const usuario = authMapper.fromRegisterDtoToDomain(dto);
        const usuarioCreado = await authService.register(usuario);

        const token = (authService as any).generarToken(usuarioCreado);
        const refreshToken = (authService as any).generarRefreshToken(usuarioCreado);

        const response = authMapper.fromDomainToAuthResponseDto(usuarioCreado, token);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        });
        return res.status(201).json(response);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const dto: LoginDto = req.body;

        if (!dto.email || !dto.password) {
            return res.status(400).json({ error: 'email y password son requeridos' });
        }

        const { usuario, token, refreshToken } = await authService.login(dto.email, dto.password);
        const response = authMapper.fromDomainToAuthResponseDto(usuario, token);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        });
        return res.status(200).json(response);
    } catch (e: any) {
        return res.status(401).json({ error: e.message });
    }
};


export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ error: 'refreshToken es requerido' });
        }

        const { token, refreshToken: nuevoRefreshToken } = await authService.refreshToken(refreshToken);
        res.cookie("refreshToken", nuevoRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        });
        return res.status(200).json({ token });
    } catch (e: any) {
        return res.status(401).json({ error: e.message });
    }
};

// /auth/me
// hacerlo mejor, con separacion de responsabilidades
// el token viaja en el header Authorization: Bearer <token>. Aun no esta implementado asi en el frontend
export const me = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: 'refreshToken es requerido' });
    }
    const usuario = await authService.me(token);
    const responce = authMapper.fromDomainToAuthResponseDto(usuario,token)
    return res.json(responce);
  } catch (e: any) {
    return res.status(401).json({ message:  e.message });
  }
};