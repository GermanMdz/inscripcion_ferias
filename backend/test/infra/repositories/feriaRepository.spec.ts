import { crearFeriaRepo, obtenerCantidadRepo, buscarFeria } from '../../../src/infra/repositories/feriaRepository';
import { Feria } from '../../../src/domain/feria/feria';
import { AppDataSource } from '../../../src/data-source';

// Mock de AppDataSource
jest.mock('../../../src/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('FeriaRepository (Infra Repository)', () => {
  let mockRepository: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      count: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);
  });

  describe('crearFeriaRepo', () => {
    it('debería crear una feria en la base de datos', async () => {
      const domainFeria = new Feria('Feria Nueva');
      const savedEntity = {
        id: 1,
        nombre: 'Feria Nueva',
        fecha: null,
        ubicacion: null,
        cupo: null,
        createdAt: new Date(),
      };

      mockRepository.create.mockReturnValue(savedEntity);
      mockRepository.save.mockResolvedValue(savedEntity);

      const resultado = await crearFeriaRepo(domainFeria);

      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(resultado.id).toBe(1);
      expect(resultado.nombre).toBe('Feria Nueva');
    });
  });

  describe('buscarFeria', () => {
    it('debería encontrar una feria por nombre', async () => {
      const domainFeria = new Feria('Feria Buscada');
      const foundEntity = {
        id: 2,
        nombre: 'Feria Buscada',
        fecha: null,
        ubicacion: null,
        cupo: null,
        createdAt: new Date(),
      };

      mockRepository.findOneBy.mockResolvedValue(foundEntity);

      const resultado = await buscarFeria(domainFeria);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ nombre: 'Feria Buscada' });
      expect(resultado).not.toBeNull();
      expect(resultado?.nombre).toBe('Feria Buscada');
    });

    it('debería retornar null si no encuentra la feria', async () => {
      const domainFeria = new Feria('Feria Inexistente');

      mockRepository.findOneBy.mockResolvedValue(null);

      const resultado = await buscarFeria(domainFeria);

      expect(resultado).toBeNull();
    });
  });

  describe('obtenerCantidadRepo', () => {
    it('debería retornar la cantidad de ferias', async () => {
      mockRepository.count.mockResolvedValue(5);

      const resultado = await obtenerCantidadRepo();

      expect(resultado.cantidad).toBe(5);
      expect(mockRepository.count).toHaveBeenCalled();
    });

    it('debería retornar 0 si no hay ferias', async () => {
      mockRepository.count.mockResolvedValue(0);

      const resultado = await obtenerCantidadRepo();

      expect(resultado.cantidad).toBe(0);
    });
  });
});
