import { AppDataSource } from '../../data-source';
import { InscripcionEntity } from '../entities/inscripcion';
import { Inscripcion } from '../../domain/inscripcion/Inscripcion';
import { InscripcionMapper } from '../../infra/mappers/inscripcionMapper';

const getRepo = () => AppDataSource.getRepository(InscripcionEntity);

export async function crearInscripcionRepo(inscripcion: Inscripcion){
    const r = getRepo();
    const entity = InscripcionMapper.fromDomainToEntity(inscripcion);
    const saved = await r.save(r.create(entity));
    return InscripcionMapper.fromEntityToDomain(saved);
}

export async function obtenerInscripcionRepo(inscripcion: Inscripcion) {
    const r = getRepo();
    const found = await r.findOneBy({
        usuarioId: inscripcion.usuarioId!,
        feriaId: inscripcion.feriaId!
    });
    return found ? InscripcionMapper.fromEntityToDomain(found) : null;
}
