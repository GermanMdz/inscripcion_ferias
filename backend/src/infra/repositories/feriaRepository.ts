import { AppDataSource } from "../../data-source";
import { Feria } from "../../domain/feria/feria";
import { FeriaEntity } from "../entities/feriaEntity";
import { feriaMapper } from "../mappers/feriaMapper";

const repo = () => AppDataSource.getRepository(FeriaEntity);

export async function crearFeriaRepo(domainFeria: Feria): Promise<Feria> {
    const r = repo();
    const feria = feriaMapper.fromDomainToEntity(domainFeria);
    const entity = r.create(feria);
    const saved = await r.save(entity);
    return feriaMapper.fromEntityToDomain(saved);
}

export async function buscarFeria(domainFeria: Feria): Promise<Feria | null> {
    const r = repo();
    const feria = feriaMapper.fromDomainToEntity(domainFeria);
    const found = await r.findOneBy({ nombre: feria.nombre });
    if (!found) return null;
    return feriaMapper.fromEntityToDomain(found);
}

export async function obtenerCantidadRepo(): Promise<{ cantidad: number }> {
    const r = repo();
    const cantidad = await r.count();
    return { cantidad };
}

export default repo;
