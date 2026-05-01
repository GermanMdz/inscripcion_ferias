## **Acta de Constitución del Proyecto**

| **Nombre del Proyecto**                             | Sistema de inscripción a ferias.                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Justificación y Propósito del Proyecto**          | El propósito del proyecto es digitalizar y optimizar el proceso de inscripción, organización y comunicación de las ferias del municipio.                                                                                                                                                                                                                                                                                                 |
| **Descripción del Proyecto (de alto nivel)**        | El proyecto consiste en el desarrollo de una aplicación web que permita a los feriantes registrarse, administrar su perfil, inscribirse a ferias disponibles y gestionar listas de confirmados y espera de manera automática.<br><br>Como producto final, se obtendrá un sistema web accesible desde dispositivos móviles y computadoras, que facilite la administración municipal y la difusión de los feriantes y sus emprendimientos. |
| **Entregables Principales**                         | • Plataforma web funcional para registro y administración de feriantes. <br> • Sistema de inscripción a ferias con cupos automáticos y lista de espera. <br> • Panel de gestión para administradores municipales. <br> • Sección pública con información de próximas ferias.                                                                                                                                                             |
| **Exclusiones**                                     | • No tendrá un sistema de pago electrónico. <br> • No tendrá un módulo de mensajería interna.                                                                                                                                                                                                                                                                                                                                            |
| **Objetivos del Proyecto**                          | • Desarrollar y entregar una plataforma web funcional que permita la gestión digital de ferias del municipio. <br> • Plazo: completar el proyecto en un período estimado de 3 meses. <br> • Esfuerzo: desarrollo individual con una carga estimada máxima de 120 horas hombre. <br> • Otros objetivos: asegurar accesibilidad y facilidad de uso para usuarios.                                                                          |
| **Indicadores de Valor**                            | • Registrar al menos 50 feriantes dentro de los primeros 2 meses de implementación. <br> • Lograr que el 80% de las inscripciones a ferias se realicen mediante la plataforma sin intervención manual. <br> • Reducir el tiempo de confirmación de feriantes a menos de 24 horas. <br> • Obtener un índice de satisfacción del 85% o superior en encuestas a feriantes.                                                                  |
| **Enfoque de Gestión / Ciclo de Vida del Proyecto** | Se aplicará un ciclo iterativo e incremental con fases: <br> 1. Análisis y Diseño <br> 2. Desarrollo por módulos <br> 3. Pruebas con usuarios reales <br> 4. Ajustes y mejoras <br> 5. Implementación y despliegue                                                                                                                                                                                                                       |
| **Hitos Principales**                               | • Aprobación del acta de constitución del proyecto. <br> • Finalización del relevamiento de requisitos. <br> • Desarrollo del Sistema de Inscripción. <br> • Informe de cupos automatizados. <br> • Despliegue en producción. <br> • Cierre del proyecto con reporte final de indicadores.                                                                                                                                               |
| **Principales Colaboradores**                       | • Área de Desarrollo Social. <br> • Área de Sistemas. <br> • Feriantes y Emprendedores.                                                                                                                                                                                                                                                                                                                                                  |

##### AUTORIZACIÓN DEL ACTA

| **Nombre** | **Función** | **Fecha** | **Firma** |
| ---------- | ----------- | --------- | --------- |
| ----       | ----        | ----      | ----      |

## Planificacion (primeras 8 semanas):

#### Diagrama de Grantt

![Diagrama de grantt](docs/grantt.png)

#### Desglose de tareas

![](docs/tareas.png)

#### Requerimientos funcionales

| Código   | Requisito Funcional                                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **RF1**  | El sistema deberá permitir el registro de feriantes mediante formulario con validación de datos personales y del emprendimiento.    |
| **RF2**  | El sistema deberá permitir a los feriantes iniciar sesión y administrar su perfil (datos personales, rubro, redes sociales, fotos). |
| **RF3**  | El sistema deberá mostrar el listado de ferias disponibles, indicando fecha, ubicación y cupo disponible.                           |
| **RF4**  | El sistema deberá permitir que los feriantes se inscriban a una feria.                                                              |
| **RF5**  | El sistema deberá gestionar los cupos automáticamente: si el cupo está completo, deberá agregar al feriante a lista de espera.      |
| **RF6**  | El sistema deberá permitir a los administradores aprobar, rechazar o remover participantes de una feria.                            |
| **RF7**  | El sistema deberá notificar al feriante cuando cambie su estado en la inscripción.                                                  |
| **RF8**  | El sistema deberá permitir a los administradores crear, modificar o cancelar ferias.                                                |
| **RF9**  | El sistema deberá generar reportes de inscriptos, cupos asignados y lista de espera por feria.                                      |
| **RF10** | El sistema deberá ofrecer una sección pública que muestre próximas ferias y feriantes confirmados para difusión.                    |

#### Requerimientos No funcionales

| Código                    | Requisito No Funcional                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **RNF1 – Usabilidad**     | La plataforma deberá ser intuitiva y accesible para usuarios.                                                                                    |
| **RNF2 – Rendimiento**    | El sistema deberá responder en menos de 3 segundos para las operaciones principales bajo una carga de hasta 100 usuarios concurrentes.           |
| **RNF3 – Seguridad**      | Los datos personales deberán almacenarse de forma segura, con contraseñas encriptadas. Solo los administradores podrán gestionar ferias y cupos. |
| **RNF4 – Disponibilidad** | La plataforma deberá estar disponible al menos el 98% del tiempo durante el primer año de uso.                                                   |
| **RNF5 – Compatibilidad** | La plataforma deberá ser accesible desde dispositivos móviles y navegadores web modernos (Chrome, Firefox, Edge).                                |

#### Tecnologias a utilizar

| Frontend          | Next.js    |
| ----------------- | ---------- |
| **Backend**       | Express.js |
| **ORM**           | TypeORM    |
| **Base de datos** | PostgreSQL |
| **Auth**          | JWT        |

#### Arquitectura

##### Capas

![](docs/arquitectura.png)

**Nota**: el admin tambien puede editar la lista de inscriptos y asignarle a un usuario el estado que considere apropiado.

##### Diagrama Entidad Ralacion

![](docs/der.png)

**Posibles estados de la inscripcion**: pendiente, confirmado, suplente, rechazado.

---

## Entregables del Proyecto

Los entregables se organizan en tres sprints con fechas de entrega definidas:

### Sprint 1 — Análisis y Diseño (7 nov – 15 nov)
| ID | Actividad | Estado |
|----|-----------|--------|
| SDIF-1 | Relevamiento de necesidades con feriantes y municipio | Finalizada |
| SDIF-2 | Definir requisitos funcionales y no funcionales | Finalizada |
| SDIF-3 | Diseño de arquitectura y tecnologías a utilizar | Finalizada |
| SDIF-4 | Diseño de UX/UI | Finalizada |

### Sprint 2 — Inscripciones y Cupos Automáticos (17 nov – 8 dic)
| ID | Actividad | Estado |
|----|-----------|--------|
| SDIF-5 | Setup del proyecto | Finalizada |
| SDIF-6 | Creación básica de una feria | Finalizada |
| SDIF-7 | Inscripción a ferias (backend básico para MVP) | Finalizada |
| SDIF-8 | Lista de inscriptos aceptados según criterio | Finalizada |
| SDIF-9 | Frontend básico para visualización | Finalizada |

### Sprint 3 — CRUD de Usuarios y Ferias (8 dic – 22 dic)
| ID | Actividad | Estado |
|----|-----------|--------|
| SDIF-10 | CRUD de usuarios | Finalizada |
| SDIF-11 | CRUD de ferias | Finalizada |
| SDIF-12 | Login (back y front) | Finalizada |
| SDIF-13 | Roles y permisos (backend más sofisticado) | Finalizada |

---

## Exclusiones del Proyecto

Las siguientes funcionalidades quedan **fuera del alcance** de este proyecto:

- **Notificaciones automáticas:** No se implementará envío de emails, SMS ni push notifications a feriantes sobre el resultado de su inscripción.
- **Gestión de productos/stands:** El sistema no contempla la asignación de puestos físicos, numeración de stands ni catálogo de productos de cada feriante.
- **Integración con sistemas municipales externos:** No se prevé integración con otros sistemas del municipio (padrón, habilitaciones, etc.).
- **Aplicación móvil nativa:** La solución es una aplicación web responsive; no se desarrollará una app nativa para iOS o Android.
- **Reportes avanzados y estadísticas:** No se incluyen dashboards de análisis histórico, exportación a formatos complejos ni BI.
- **Gestión de múltiples municipios/organizaciones:** El sistema está diseñado para una única organización administradora.
- **Soporte multi-idioma:** La aplicación se desarrollará únicamente en español.

---

## Beneficios Esperados

### Para el Municipio / Administradores
- **Reducción de carga operativa:** Eliminación del proceso manual de recepción y ordenamiento de inscripciones, reduciendo el tiempo dedicado a esta tarea de horas a minutos.
- **Transparencia y trazabilidad:** Cada decisión de aprobación queda registrada y puede auditarse, reduciendo conflictos con feriantes por criterios percibidos como arbitrarios.
- **Criterios de prioridad estandarizados:** El sistema aplica de forma automática y consistente las reglas de prioridad (orden de llegada, estado de participación previa), eliminando subjetividad.
- **Gestión centralizada:** Toda la información de ferias, inscripciones y feriantes en un único sistema accesible desde cualquier lugar.

### Para los Feriantes
- **Inscripción digital:** Posibilidad de inscribirse a ferias desde cualquier dispositivo con acceso a internet, sin necesidad de trasladarse o llamar.
- **Visibilidad del calendario:** Acceso a la lista de próximas ferias con fecha, horario y ubicación actualizada.
- **Perfil propio:** Cada feriante mantiene su perfil con rubro y datos de contacto, evitando tener que volver a cargarlos en cada inscripción.

### A Nivel Sistema
- **Escalabilidad:** La arquitectura por capas (Controller → Service → Repository) permite agregar nuevas funcionalidades sin modificar la lógica existente.
- **Mantenibilidad:** La separación entre dominio e infraestructura facilita cambios tecnológicos (base de datos, framework) sin reescribir la lógica de negocio.

---

## Riesgos del Proyecto

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Cambios en los criterios de prioridad/selección durante el desarrollo | Alta | Alto | Diseño modular con patrón Strategy (clase `Criterio` intercambiable); reuniones de validación antes de cada sprint |
| Baja adopción digital por parte de los feriantes (perfil no tecnológico) | Media | Alto | Diseño de interfaz simplificado; considerar flujo de inscripción asistida por administrador |
| Requisitos ambiguos o incompletos relevados en la primera reunión | Media | Alto | Validación iterativa de requisitos; prototipado rápido para confirmar flujos antes de implementar |
| Disponibilidad del cliente para reuniones de validación | Media | Medio | Establecer un canal de comunicación asíncrono (WhatsApp/email) para consultas puntuales |
| Problemas de conectividad o infraestructura en el entorno de producción | Baja | Alto | Despliegue en plataforma cloud (Vercel + backend hosteado); base de datos PostgreSQL administrada |
| Scope creep: solicitudes de nuevas funcionalidades durante el desarrollo | Alta | Medio | Definición clara del alcance en el acta de proyecto; cualquier nueva funcionalidad entra al Backlog para sprints futuros |
| Pérdida de datos por errores en la lógica de actualización de estados | Baja | Alto | Pruebas unitarias sobre el módulo de criterios; validación de estados en el dominio antes de persistir |

---

## Reuniones

### Reunión 1 — Relevamiento inicial
**Objetivo:** Entender el proceso actual de gestión de ferias e identificar oportunidades de mejora.

En esta primera reunión, el cliente describió cómo se organizan las ferias actualmente de manera completamente manual. Los feriantes se inscriben por mensaje o formulario físico, y el municipio lleva el registro en planillas. El proceso de selección cuando la demanda supera el cupo disponible se realiza de forma subjetiva, lo que genera frecuentes conflictos y reclamos por parte de los feriantes.

Durante la reunión se relevaron los actores involucrados (municipio como administrador, feriantes como usuarios), los datos que se manejan (nombre, rubro, teléfono, historial de participación) y las principales necesidades: digitalizar la inscripción, automatizar la selección de participantes y mantener un historial por feriante.

Esta reunión permitió definir el alcance inicial del proyecto y los requisitos funcionales de alto nivel.

### Reunión 2 — Definición técnica y lógica de negocio
**Objetivo:** Clarificar los criterios de selección de inscriptos y validar la arquitectura propuesta.

En la segunda reunión se profundizó en las reglas de negocio más complejas, particularmente la lógica de prioridad para la asignación de cupos. Se definieron los distintos estados que puede tener un feriante (`pendiente`, `confirmado`, `suplente`, `rechazado`, `proximo`) y cómo estos afectan su prioridad en la siguiente feria.

Se acordaron dos criterios de generación de listas:
- **Por orden de llegada:** sin distinción de historial, simplemente el primero en inscribirse tiene prioridad.
- **Por prioridad:** se favorece a quienes nunca participaron (`pendiente`), luego a quienes estuvieron como suplentes, y finalmente a quienes ya confirmaron participación. Al regenerar las listas (si se inscribió alguien nuevo), el orden entre confirmados y suplentes se invierte.

También se validó la arquitectura en capas propuesta (Controller → Service → Repository) y el modelo de datos (Usuario, Feria, Inscripción), confirmando que cubrían los requerimientos identificados.

---

## Conclusiones

El proyecto aborda una problemática concreta de gestión municipal que actualmente se resuelve de forma manual y propensa a errores. La solución propuesta digitaliza el proceso de inscripción a ferias y automatiza la aplicación de criterios de selección, aportando transparencia tanto para el municipio como para los feriantes.

La arquitectura elegida —Node.js con TypeScript, Express, TypeORM y PostgreSQL en el backend, con un frontend desacoplado— permite un desarrollo iterativo y facilita la incorporación de nuevas funcionalidades en el futuro. El uso del patrón Strategy para los criterios de selección es clave: desacopla la lógica de negocio de la infraestructura y permite agregar nuevos criterios sin modificar el código existente.

Los principales desafíos identificados son la adopción por parte de usuarios con poca experiencia digital y la posible evolución de los criterios de selección a medida que el municipio gane experiencia con la herramienta. Ambos riesgos son mitigables con un diseño flexible y una comunicación fluida con el cliente durante el desarrollo.

El proyecto tiene potencial de escalar en versiones futuras hacia notificaciones automáticas, generación de reportes históricos y mejoras en la interfaz orientadas a la accesibilidad.