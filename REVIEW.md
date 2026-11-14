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

La prueba de navegador usa respuestas sintéticas, sin datos personales. No se ha modificado la configuración del alojamiento ni la versión publicada: los cambios se entregan como una propuesta para integrar.
