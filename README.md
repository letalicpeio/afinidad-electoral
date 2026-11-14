# Afinidad electoral

Web estática, adaptable a móvil, para el Congreso por provincias. Sin dependencias externas ni recogida de respuestas.

## Funciones

- 52 circunscripciones con candidaturas extraídas del BOE-A-2026-23103.
- Entre 1 y 10 personas, por turnos en el mismo dispositivo.
- 18 afirmaciones, acuerdo 1–5 y peso de importancia 1–5.
- Afinidad parcial, cobertura ponderada, comparación sobre preguntas comunes y fuentes por posición.
- Enlaces que comparten configuración sin respuestas y exportación JSON voluntaria.

## Estado documental — 14/11/2026

**Versión inicial incompleta. Solo PP, VOX y EAJ-PNV tienen posiciones parcialmente codificadas; PSOE, Frente Amplio y Podemos aún no tenían programa de 2026 publicado a esta fecha. No identifica la máxima afinidad entre todas las candidaturas.** Las demás aparecen expresamente como pendientes de análisis. No se mezclan programas de 2023 con los de 2026. No hay IA en tiempo de ejecución.

Las afirmaciones y opciones son nuevas, basadas en los 18 temas del cuestionario previo, cuyas alternativas originales no se recuperaron. Las posiciones son interpretaciones editoriales provisionales, revisables, no una medición objetiva ni una puntuación oficial de los partidos. Las inferencias requieren revisión humana; la ausencia de una propuesta no equivale a oposición.

La página de transparencia explica fórmula, límites y privacidad. Cada afinidad usa solo las respuestas con posición documentada; su cobertura puede ser baja. El listado se ordena alfabéticamente para evitar presentar un ganador entre partidos con cobertura desigual. Los porcentajes no se normalizan para sumar 100.

## Cálculo

`100 × Σ[peso × (1 − |respuesta − posición| / 4)] / Σ[peso con posición documentada]`

Sin opinión queda fuera del denominador. Sin datos produce `null`, nunca 0 %. Cobertura: peso documentado / peso de todas las preguntas contestadas. La comparación común utiliza exclusivamente preguntas documentadas en todos los partidos analizados presentes en la provincia.

## Datos y actualización

`candidaturas.json`: nombres de candidaturas del Congreso por provincia (sin nombres personales). Fuente: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23103

`data.json`: preguntas y posiciones. Cada posición requiere `value`, `source`, `locator`, `reason`, `reviewed` y `coding`. Los temas desconocidos se omiten. `data.json` es la única fuente de datos y se edita directamente; `scoring.test.mjs` lo valida. Para incorporar otra formación, añadir una entrada a `parties` y un patrón `match` inequívoco para su denominación oficial en el BOE; `exclude` (opcional) descarta coaliciones que contienen ese nombre, p. ej. UPN-PP no hereda al PP. Las coaliciones necesitan revisión individual; no heredan automáticamente la postura de un miembro.

Antes de considerar completa la comparación deben documentarse todas las candidaturas de cada provincia y revisar las codificaciones, neutralidad y cobertura de los 18 temas. No se atribuyen posiciones por etiqueta ideológica.

## Verificación

`node scoring.test.mjs`

Pruebas de coincidencia total/oposición, pesos desiguales, sin opinión, ausencia de datos, cobertura, preguntas comunes y catálogo de 52 provincias. Prueba manual en navegador de validación y recorrido de 18 preguntas hasta resultados.

## GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch: **main**, carpeta **/(root)** → Save. El flujo CI valida los cálculos en cada push. `.nojekyll` permite servir los archivos estáticos directamente.

## Privacidad

Las respuestas se mantienen solo en memoria. No hay analítica, almacenamiento persistente ni llamadas a IA. La exportación voluntaria contiene opiniones políticas y debe tratarse como información sensible. El proveedor de hosting puede registrar datos técnicos de acceso.
