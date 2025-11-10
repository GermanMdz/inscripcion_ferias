import { FeriaService } from '../../../src/domain/feria/feriaService';
import { Feria } from '../../../src/domain/feria/feria';

// Mock del repositorio
jest.mock('../../../src/infra/repositories/feriaRepository', () => ({
  crearFeriaRepo: jest.fn(),
  obtenerCantidadRepo: jest.fn(),
  buscarFeria: jest.fn(),
}));

import * as feriaRepo from '../../../src/infra/repositories/feriaRepository';

describe('FeriaService (Domain Service)', () => {
  let feriaService: FeriaService;

  beforeEach(() => {
    jest.clearAllMocks();
    feriaService = new FeriaService();
  });

  describe('crear', () => {
    it('debería crear una feria si no existe', async () => {
      const feria = new Feria('Feria de Música');
      const mockFeria = new Feria('Feria de Música');
      mockFeria.id = 1;
      mockFeria.createdAt = new Date();

      (feriaRepo.buscarFeria as jest.Mock).mockResolvedValue(null);
      (feriaRepo.crearFeriaRepo as jest.Mock).mockResolvedValue(mockFeria);

      const resultado = await feriaService.crear(feria);

      expect(resultado.nombre).toBe('Feria de Música');
      expect(resultado.id).toBe(1);
      expect(feriaRepo.crearFeriaRepo).toHaveBeenCalledWith(feria);
    });

    it('debería lanzar error si la feria ya existe', async () => {
      const feria = new Feria('Feria Existente');
      const feriaExistente = new Feria('Feria Existente');

      (feriaRepo.buscarFeria as jest.Mock).mockResolvedValue(feriaExistente);

      await expect(feriaService.crear(feria)).rejects.toThrow('La feria ya existe');
      expect(feriaRepo.crearFeriaRepo).not.toHaveBeenCalled();
    });

    it('debería lanzar error si el nombre está vacío (validación en constructor)', () => {
      expect(() => new Feria('')).toThrow('El nombre de la feria no puede estar vacío');
    });
  });

  describe('obtenerCantidad', () => {
    it('debería retornar la cantidad de ferias si hay al menos una', async () => {
      (feriaRepo.obtenerCantidadRepo as jest.Mock).mockResolvedValue({ cantidad: 5 });

      const resultado = await feriaService.obtenerCantidad();

      expect(resultado.cantidad).toBe(5);
      expect(feriaRepo.obtenerCantidadRepo).toHaveBeenCalled();
    });

    it('debería lanzar error si no hay ferias', async () => {
      (feriaRepo.obtenerCantidadRepo as jest.Mock).mockResolvedValue({ cantidad: 0 });

      await expect(feriaService.obtenerCantidad()).rejects.toThrow(
        'No hay ferias registradas'
      );
    });
  });
});
