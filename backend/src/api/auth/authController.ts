import { type Request, type Response } from 'express';
import { authService } from '../../domain/auth/authService';
import { authMapper } from '../mappers/authMapper';
import { RegisterDto, LoginDto } from '../auth/authDtos';

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

        const response = authMapper.fromDomainToAuthResponseDto(usuarioCreado, token, refreshToken);

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
        const response = authMapper.fromDomainToAuthResponseDto(usuario, token, refreshToken);

        return res.status(200).json(response);
    } catch (e: any) {
        return res.status(401).json({ error: e.message });
    }
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: 'refreshToken es requerido' });
        }

        const { token, refreshToken: nuevoRefreshToken } = await authService.refreshToken(refreshToken);

        return res.status(200).json({ token, refreshToken: nuevoRefreshToken });
    } catch (e: any) {
        return res.status(401).json({ error: e.message });
    }
};