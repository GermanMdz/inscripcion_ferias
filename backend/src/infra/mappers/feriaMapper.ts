import { Feria } from "../../domain/feria/feria";

export class feriaMapper {
    static fromEntityToDomain(entity: any): Feria {
        const feria = new Feria(entity.nombre);
        feria.id = entity.id;
        feria.fecha = entity.fecha;
        feria.ubicacion = entity.ubicacion;
        feria.cupo = entity.cupo;
        feria.createdAt = entity.createdAt;
        return feria;
    }
    static fromDomainToEntity(domain: Feria): any {
        return {
            id: domain.id,
            nombre: domain.nombre,
            fecha: domain.fecha,
            ubicacion: domain.ubicacion,
            cupo: domain.cupo,
            createdAt: domain.createdAt,
        };
    }
}
