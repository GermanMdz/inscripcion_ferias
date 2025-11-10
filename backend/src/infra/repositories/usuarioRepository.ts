import { AppDataSource } from "../../data-source";
import { Usuario } from "../../domain/usuario/usuario";
import { UsuarioEntity } from "../../infra/entities/usuarioEntity";

const repo = () => AppDataSource.getRepository(UsuarioEntity);

export async function crearUsuarioRepo(domainUsuario: Usuario): Promise<Usuario> {
    const r = repo();
    // mapper domain -> entity
    const entity = r.create({ nombre: domainUsuario.nombre });
    const saved = await r.save(entity);
    
    // mapper entity -> domain
    const result = new Usuario(saved.nombre);
    result.id = saved.id;
    result.createdAt = saved.createdAt;
    return result;
}

export default repo;
