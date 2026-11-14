# Afinidad electoral

Web estática, adaptable a móvil, para el Congreso por provincias. Sin dependencias externas ni recogida de respuestas.

## Funciones

- 52 circunscripciones con candidaturas extraídas del BOE-A-2026-23103.
- Entre 1 y 10 personas, por turnos en el mismo dispositivo.
- 18 afirmaciones, acuerdo 1–5 y peso de importancia 1–5.
- Afinidad parcial, cobertura ponderada, rangos por temas sin datos y comparación sobre preguntas comunes puntuables.
- Matriz de fuentes por partido y tema, con evidencias en revisión excluidas del cálculo.
- Revisión de las respuestas de cada participante desde los resultados.
- Enlaces que comparten configuración sin respuestas y exportación JSON voluntaria.

## Estado documental — 14/11/2026

**Versión 0.4.3, catálogo incompleto. PP, VOX, EAJ-PNV, BNG, Municipalistas Primero Canarias–Coalición Canaria, ERC, PACMA, Por un Mundo Más Justo, FE de las JONS, Frente Obrero, Adelante Andalucía, Geroa Bai, SALF, Partido Humanista, Democracia 21, Iustitia Europa, Frente Amplio, Podemos, Compromís: Front Valencià, Junts y PSOE tienen análisis parcial. No identifica la máxima afinidad entre todas las candidaturas.** Las demás figuran como pendientes de revisión; esa etiqueta no afirma que carezcan de programa publicado. No se mezclan programas de 2023 con los de 2026.

Las afirmaciones y opciones son nuevas, basadas en los 18 temas del cuestionario previo, cuyas alternativas originales no se recuperaron. Las posiciones son interpretaciones editoriales provisionales, revisables, no una medición objetiva ni una puntuación oficial de los partidos. Las inferencias requieren revisión humana; la ausencia de una propuesta no equivale a oposición.

La página de transparencia explica fórmula, límites y privacidad. Cada afinidad usa solo las respuestas con posición documentada; su cobertura puede ser baja. El listado se ordena alfabéticamente para evitar presentar un ganador entre partidos con cobertura desigual. Los porcentajes no se normalizan para sumar 100.

## Cálculo

`100 × Σ[peso × (1 − |respuesta − posición| / 4)] / Σ[peso con posición documentada]`

Una posición con `scoreable: false` queda fuera del cálculo y de las preguntas comunes, pero conserva su fuente y `reviewNote` para revisión. No se deduce una respuesta sobre un tema entero a partir de una propuesta que solo trata una parte.

Sin opinión queda fuera del denominador. Sin datos produce `null`, nunca 0 %. Cobertura: peso documentado / peso de todas las preguntas contestadas. La comparación común requiere al menos dos partidos y utiliza exclusivamente preguntas puntuables en todos los partidos analizados presentes en la provincia.

El rango por temas sin datos conserva el numerador documentado y completa los desconocidos con los extremos posibles de posiciones 1–5. El mínimo de coincidencia de una respuesta `a` es `1 − max(a−1, 5−a)/4`; el máximo es 1. Se divide por el peso total contestado. Es un rango matemático condicionado a la escala, no un intervalo estadístico ni una estimación de voto. Sin ninguna evidencia se muestra «Sin datos».

## Datos y actualización

`candidaturas.json`: nombres de candidaturas del Congreso por provincia (sin nombres personales). Fuente: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23103

`data.json`: preguntas y posiciones. Cada posición requiere `value`, `source`, `locator`, `reason`, `reviewed` y `coding`. Los temas desconocidos se omiten. `data.json` es la única fuente de datos y se edita directamente; `scoring.test.mjs` lo valida. Para incorporar otra formación, añadir una entrada a `parties` y un patrón `match` inequívoco para su denominación oficial en el BOE; `aliases` (opcional) permite las denominaciones de una misma coalición en distintas provincias; `exclude` (opcional) descarta coaliciones que contienen ese nombre, p. ej. UPN-PP no hereda al PP. Las coaliciones necesitan revisión individual; no heredan automáticamente la postura de un miembro.

Antes de considerar completa la comparación deben documentarse todas las candidaturas de cada provincia y revisar las codificaciones, neutralidad y cobertura de los 18 temas. No se atribuyen posiciones por etiqueta ideológica.

## Verificación

`node scoring.test.mjs`

Pruebas de coincidencia total/oposición, pesos desiguales, sin opinión, ausencia de datos, cobertura, preguntas comunes puntuables, exclusiones editoriales y catálogo de 52 provincias. Comprobación exhaustiva de los extremos de los rangos contra las 25 combinaciones de dos posiciones desconocidas para cada par de respuestas 1–5. Prueba manual en navegador de validación y recorrido de 18 preguntas hasta resultados.

## GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch: **main**, carpeta **/(root)** → Save. El flujo CI valida los cálculos en cada push. `.nojekyll` permite servir los archivos estáticos directamente.

## Privacidad

Las respuestas se mantienen solo en memoria. No hay analítica, almacenamiento persistente ni llamadas a IA. La exportación voluntaria contiene opiniones políticas y debe tratarse como información sensible. El proveedor de hosting puede registrar datos técnicos de acceso.

## Investigación documental

`research` en `data.json` registra las consultas que aún no producen posiciones puntuables, con fecha, estado, fuente y límites. No localizar un programa en una página no prueba que no exista. Las copias del programa de ERC alojadas en Betevé se identifican en `sourceNote`, visible en los detalles de resultados.

Ampliación 14/11/2026: SALF se revisa a partir del resumen oficial de campaña (el PDF completo sigue sin verificar) y Partido Humanista a partir del PDF oficial de generales de 2026. Los documentos y posiciones quedan sincronizados en `programas.json` y `data.json`.

Ampliación 14/11/2026 (0.4.1): Democracia 21 pasa de tres a cinco afirmaciones documentadas. La limitación temporal y condicionada del alquiler se codifica como apoyo con reservas (4); la eliminación de trámites empresariales redundantes, como apoyo explícito (5).

Ampliación 0.4.2: se admiten fuentes secundarias identificadas cuando falta el programa oficial. Podemos incorpora regulación de alquileres (Europa Press reproducida por Idealista, iniciativa de 2026) y Frente Amplio revalorización de pensiones con IPC (nota oficial). Estas evidencias no constituyen programas completos; no se infieren posiciones de otros partidos por pertenecer a una coalición.

Ampliación 0.4.3: primeras evidencias para Compromís: Front Valencià (aborto constitucional, EFE/Valencia Plaza), Junts (traspaso de competencias, Europa Press) y PSOE (pensiones con IPC, El País). Declaraciones de 2026 en fuentes secundarias, diferenciadas del programa oficial.
