import { AppDataSource } from "../../data-source";
import { Feria } from "./feria";
import { FeriaEntity } from "../../entities/feriaEntity";

const repo = () => AppDataSource.getRepository(FeriaEntity);

export async function crearFeriaRepo(domainFeria: Feria): Promise<Feria> {
    const r = repo();
    const entity = r.create({ nombre: domainFeria.nombre });
    const saved = await r.save(entity);
    
    // TODO : usar mapper   
    const result = new Feria(saved.nombre);
    result.id = saved.id;
    result.createdAt = saved.createdAt;
    return result;
}

export async function obtenerCantidadRepo(): Promise<{ cantidad: number }> {
    const r = repo();
    const cantidad = await r.count();
    return { cantidad };
}

export default repo;
