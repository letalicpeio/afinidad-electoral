# Revisión del proyecto — 14/11/2026

Base revisada: `092ead6` (incorpora los cambios del otro agente).

## Cambios de esta propuesta

- Se incorporan BNG (cinco temas) y Municipalistas Primero Canarias–Coalición Canaria (un tema), con fuentes primarias de 2026. Se reconocen las dos denominaciones de la misma coalición canaria en el BOE.
- PP/arraigo, PNV/regularización y PNV/penas quedan como evidencia contextual no puntuable: las fuentes existentes no justificaban la respuesta asignada sobre la afirmación completa. No se eliminan sus fuentes.
- La comparación común usa la misma validación que el cálculo y exige al menos dos candidaturas. Una posición inválida o excluida nunca puede reducir artificialmente la cobertura de los demás.
- Los resultados muestran el rango matemático que permiten las posiciones desconocidas sobre los temas contestados; no lo presentan como intervalo de confianza.
- Antes de responder se puede consultar una matriz por candidatura y tema; cada posición enlaza al documento. Las respuestas individuales pueden revisarse desde los resultados.
- La exportación incluye las preguntas, metodología, candidaturas pendientes y fuente del BOE para poder interpretar los resultados fuera de la web.

## Situación del catálogo

| Formación | Temas puntuables | Evidencias en revisión |
| --- | ---: | ---: |
| PP | 6 | 1 |
| VOX | 10 | 0 |
| EAJ-PNV | 3 | 2 |
| BNG | 5 | 0 |
| Municipalistas Primero Canarias–Coalición Canaria | 1 | 0 |
| ERC | 6 | 0 |
| PACMA | 3 | 2 |

Son cifras de documentación, no afinidades. Todas las formaciones siguen parcialmente analizadas. «Pendiente» significa que esta aplicación no ha revisado una candidatura; no acredita que el partido no haya publicado programa.

## Qué falta para ofrecer una comparación más completa

1. **Documentar el resto de candidaturas**, empezando por las de la provincia que se vaya a utilizar. Para cada afirmación: fuente primaria, año, sección/página, explicación de la codificación y revisión. No sustituir programas ausentes con estereotipos ideológicos ni mezclar convocatorias.
2. **Revisar las 18 afirmaciones y la escala editorial.** Una pregunta no representa todo un ámbito político. La versión actual reduce clima a nuclear y derechos individuales a aborto. Antes de ampliar el cuestionario hay que acordar dimensiones y equilibrar su peso para no duplicar unas áreas frente a otras.
3. **Segunda revisión de las codificaciones.** Los valores 1 y 5 expresan oposición o apoyo claros a la afirmación exacta, no intensidad retórica. La falta de evidencia no se convierte en 3. Las reservas o el apoyo a una medida relacionada requieren explicación y pueden quedar fuera del cálculo.
4. **Evitar una clasificación global prematura.** Con pocos temas comunes y muchos partidos pendientes, ordenar afinidades con denominadores distintos generaría una apariencia de precisión. Completar el catálogo antes de introducir un «partido más afín».
5. **Separar IA documental y cálculo.** Una futura IA puede proponer extractos y codificaciones para revisión, con claves solo en servidor. No hace falta enviar las opiniones de participantes a un modelo para calcular la afinidad.
6. **Encuestas desde dispositivos distintos.** Actualmente compartir un enlace copia la configuración y cada dispositivo inicia su propia sesión. Recoger respuestas de un grupo en remoto requiere otro diseño de almacenamiento, acceso y privacidad; todavía no está implementado.

## Verificación

- `node --check app.mjs` y `node scoring.test.mjs`.
- Casos extremos, pesos, omisiones, ausencia de datos y cobertura.
- Coincidencias entre candidaturas y coaliciones; exclusiones e identidades ambiguas.
- Rangos contrastados exhaustivamente con todas las combinaciones de dos posiciones desconocidas para cada pareja de respuestas 1–5.
- Navegador: recorrido de dos participantes en A Coruña, resultados con BNG, segundo participante sin opiniones y reapertura de respuestas conservando sus valores.

La prueba de navegador usa respuestas sintéticas, sin datos personales. La primera propuesta se integró en main mediante la PR #1. La ampliación posterior añade ERC (copia del documento en Betevé), PACMA (PDF oficial) y un registro de consultas sin puntuación para PSOE, Podemos, Frente Amplio, EH Bildu y Junts. El catálogo continúa incompleto; no se modifica la configuración del alojamiento.

## Ampliación posterior sobre main 7e05a65

Se conserva el trabajo posterior de los otros agentes. Se incorporan SALF (6 posiciones puntuables y una evidencia de arraigo no puntuable, desde el resumen oficial) y Partido Humanista (8 posiciones puntuables, desde su programa oficial de generales de 2026). La distinción entre resumen y programa completo permanece visible en el comparador. No se han asignado posturas de 2023 ni se ha modificado el umbral del 50 % establecido para mostrar afinidades.

También se verifican las versiones web vigentes de Democracia 21 (3 posiciones) e Iustitia Europa (2 posiciones). Para los programas organizados por páginas, la validación admite fuentes bajo el índice del programa en el mismo origen, conservando enlaces a cada tema concreto.

## Ampliación documental 0.4.1 · 14/11/2026

Se revisaron los apartados oficiales de Democracia 21 sobre vivienda, simplificación normativa, impuestos, migración, defensa, corrupción, envejecimiento, salarios y educación. Se añaden únicamente dos coincidencias explícitas: pregunta 2 (valor 4 por el límite temporal y condicionado en zonas tensionadas) y pregunta 18 (valor 5 por eliminar trámites empresariales redundantes). Conservan fuente y localizador por posición.

No se equipara deflactar IRPF con una rebaja general de impuestos al trabajo, política de pensiones con revalorización por IPC, neutralidad tecnológica con continuidad nuclear ni rechazo de regularizaciones extraordinarias con rechazo del arraigo. Estos temas siguen sin puntuación nueva. Democracia 21 tiene cinco de dieciocho posiciones; sigue aplicándose el umbral de cobertura ponderada del 50 %.

## Ampliación 0.4.2

Autorizado el uso de fuentes secundarias. Se añade estado «secundaria» para distinguir prensa de copias documentales. Podemos: pregunta 2, apoyo a reducción por ley de los alquileres, fuente Europa Press reproducida por Idealista (17/09/2026), corroborada por Europa Press en campaña de Euskadi (14/11/2026). No se heredan posiciones a otras coaliciones. Frente Amplio: pregunta 10, apartado «Consolidar lo conseguido» de su nota oficial del 24/10/2026. Se retiran registros de investigación que negaban la existencia de evidencias directas para esas dos formaciones. Se mantienen omisiones y umbral de cobertura.

## Ampliación 0.4.3

Tres posiciones provisionales en prensa de precampaña: Compromís: Front Valencià, pregunta 15, EFE/Valencia Plaza 09/11; Junts, pregunta 7, Europa Press 06/11; PSOE, pregunta 10, El País 15/10. Se excluyen otras denominaciones del BOE que contengan los mismos nombres para evitar atribuir posiciones a marcas territoriales o coaliciones sin evidencia propia. La fuente de Compromís se refiere expresamente a la candidatura conjunta de 2026. Se mantienen preguntas sin datos y umbral del 50 %.

## Ampliación 0.4.4 · principales candidaturas

Cuatro evidencias nuevas: PSOE pregunta 2 (iniciativa oficial 19/03/2026) y 15 (anuncio oficial 24/10/2026); Podemos pregunta 13 (Europa Press 06/11/2026, reasignación del incremento militar a medidas sociales); Frente Amplio pregunta 9 (Servimedia 09/11/2026, cumplimiento explícito del cierre de todas las centrales). Las tres fichas aclaran su cobertura y mezcla de fuentes. PSOE enlaza ahora a un anuncio oficial, sin presentar el anuncio como programa completo. La reducción de jornada recogida por Newtral es un compromiso anterior actualizado en 2026; no se ha usado como nuevo programa de campaña. EH Bildu continúa pendiente sin extrapolar declaraciones genéricas sobre pensiones.
