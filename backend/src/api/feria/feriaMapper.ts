import { Feria } from "../../domain/feria/feria";

export class feriaMapper {
    static fromDtoToDomain(entity: any): Feria {
        const feria = new Feria(entity.nombre);
        feria.id = entity.id;
        feria.fecha = entity.fecha;
        feria.ubicacion = entity.ubicacion;
        feria.cupo = entity.cupo;
        feria.createdAt = entity.createdAt;
        return feria;
    }

    static fromDomainToDto(feria: Feria) {
        return {
            id: feria.id,
            nombre: feria.nombre,
            fecha: feria.fecha,
            direccion: feria.ubicacion
        };
    }
}