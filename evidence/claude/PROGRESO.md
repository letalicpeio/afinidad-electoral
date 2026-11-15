# Progreso de Claude

**Reparto:** `REPARTO_GPT_CLAUDE.md` · **Base:** `4f7fbd9ab5b675cf5d13114a62c3c9f89d3c8b1f` · **Fecha:** 15/11/2026 · **Agente:** `claude`

Los 33 ficheros de `evidence/claude/` están **revisados** (las 18 preguntas tienen decisión explícita y consta su `searchLog`). Ninguno está **completo con evidencia** (18 documentadas). Todos están `integration: pendiente`: no he modificado `data.json`, `programas.json`, `catalog.mjs`, la interfaz, las pruebas, el README ni REVIEW.

**Totales:** 44 documentadas · 27 en revisión · 523 sin evidencia (de 594 casillas).

Las cifras cuentan decisiones del fichero de evidencia, no cobertura ponderada ni preguntas que puntuarán: GPT decidirá al integrar cuáles de las `documentada` con `reviewNeeded: true` puntúan.

| Entidad | catalogId | Documentadas | En revisión | Sin evidencia | De ellas antecedente / prensa | Fuentes | Búsquedas |
|---|---|---:|---:|---:|---|---:|---:|
| VOX | `vox` | 11 | 4 | 3 | 0 / 0 | 1 | 3 |
| Frente Amplio | `frente-amplio` | 2 | 1 | 15 | 0 / 1 | 5 | 5 |
| Junts per Catalunya | `junts` | 7 | 3 | 8 | 7 / 0 | 1 | 5 |
| Esquerra Republicana de Catalunya | `erc` | 8 | 5 | 5 | 0 / 0 | 1 | 3 |
| BNG | `bng` | 8 | 2 | 8 | 0 / 0 | 1 | 3 |
| Compromís: Front Valencià | `compromis` | 1 | 3 | 14 | 0 / 1 | 1 | 3 |
| Comuns–Front Ampli | `comuns` | 0 | 0 | 18 | 0 / 0 | 0 | 3 |
| Chunta Aragonesista–Frente Amplio Aragón | `cha` | 0 | 3 | 15 | 0 / 0 | 1 | 3 |
| EH Bildu–ERC (coalición) | `ehbildu-erc` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| UPN-PP (coalición) | `upn-pp` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| PSC-PSOE | `psc` | 0 | 0 | 18 | 0 / 0 | 0 | 3 |
| PSdeG-PSOE | `psdeg` | 0 | 0 | 18 | 0 / 0 | 0 | 2 |
| PSE-EE (PSOE) | `pse-ee` | 0 | 0 | 18 | 0 / 0 | 0 | 2 |
| PSIB-PSOE | `psib` | 0 | 0 | 18 | 0 / 0 | 0 | 2 |
| PSN-PSOE | `psn` | 0 | 0 | 18 | 0 / 0 | 0 | 2 |
| Partido Socialista de Huelva (PSOE) | `psoe-huelva` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| Alhora | `alhora` | 0 | 1 | 17 | 0 / 0 | 1 | 3 |
| Aramés–Front Ampli | `arames` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| Eguzkilore | `eguzkilore` | 0 | 1 | 17 | 0 / 0 | 1 | 2 |
| Federación de los Independientes de Aragón | `fia` | 0 | 0 | 18 | 0 / 0 | 1 | 2 |
| Izquierda por Almería | `ipal` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| Juntos por Extremadura | `juex` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| Liberación Canaria | `liberacion-canaria` | 0 | 1 | 17 | 0 / 0 | 1 | 1 |
| PANCAL–URCI | `pancal` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| Partido Comunista del Pueblo Canario | `pcpc` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| Partido Demócrata Social Jubilados Europeos | `pdsje` | 0 | 0 | 18 | 0 / 0 | 1 | 2 |
| Partido Regionalista del País Leonés | `prepal` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| PCTE | `pcte` | 7 | 2 | 9 | 7 / 0 | 1 | 4 |
| Proyecto Alantre | `alantre` | 0 | 1 | 17 | 0 / 0 | 1 | 2 |
| Renacer Renaixer | `renacer` | 0 | 0 | 18 | 0 / 0 | 1 | 2 |
| Tercera Edad en Acción | `tercera-edad` | 0 | 0 | 18 | 0 / 0 | 1 | 2 |
| Unidad del Pueblo Canario | `upc` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |
| Valencia Unida | `valencia-unida` | 0 | 0 | 18 | 0 / 0 | 0 | 1 |

## Hallazgos que difieren del catálogo actual (propuestas para GPT)

Son propuestas; no se han aplicado a archivos compartidos.

- **ERC (`erc`).** Medida 18 (`medida 86`, p. 23): el texto trata de financiación, pagos y contratación pública de las pymes, no de reducir cargas administrativas. Se propone retirarla del cálculo (`en-revision`). Medidas 69, 88, 105 y 106–107 comprobadas en el PDF oficial (la 105 es «37 horas y mitja sense reducció salarial»; la 107 cita expresamente el IPC). Nuevas: pregunta 4 (p. 41, medida 232: sanidad pública de gestión pública, contra la privatización, valor 1) y pregunta 12 (p. 16, apartado G: UE con voz propia, presupuesto común más ambicioso y autonomía de la OTAN, valor 4 con matices).
- **BNG (`bng`).** Nuevas en el PDF del 12/11/2026 que el catálogo no recoge: pregunta 2 (p. 12, «topar por lei os prezos dos alugueiros», valor 5) y pregunta 1 (p. 43, «minorando a tributación polos ingresos do traballo», valor 5 con compensación a rentas altas). Existe una versión anterior del programa del 03/11/2026 con otro tamaño: conviene compararla.
- **VOX (`vox`).** El PDF completo oficial (HTTP 200 con User-Agent de navegador; SHA-256 en el fichero) permite citar punto y página y sustituir el resumen web. Las preguntas 6 (libre elección de centro), 7 (Ley de Unidad de Mercado, punto 42), 12 y 15 quedan en revisión: el texto no habla de concertada, transferencia de competencias, integración europea ni aborto. La 11 es oposición clara a mantener las «leyes de género» (punto 47).
- **Junts (`junts`).** No hay programa de 2026 en `junts.cat`. El «MANIFESTO-EN_WEB.pdf» de su web es el manifiesto *Reinventing Europe 2024* de Renew Europe: no debe usarse como programa de Junts. El fichero se basa en el programa íntegro de 2023 (copia de Betevé, 148 páginas, coalición con otros dos partidos), marcado como antecedente; incluye evidencia nueva para la pregunta 10 y deja en revisión las 2, 5 y 9. No pude leer la nota de Europa Press (06/11/2026) que cita el catálogo para la pregunta 7 porque el sitio bloquea mis herramientas.
- **Frente Amplio (`frente-amplio`).** Leídas las 13 notas oficiales de campaña (27/10–14/11/2026). La pregunta 9 (nuclear, valor 1) procede de Servimedia (09/11/2026, Mar González) y sigue siendo fuente secundaria. La pregunta 10 se propone como valor 4 con matices (la mención al IPC es de contexto). Sin propuestas explícitas sobre las demás.
- **Compromís (`compromis`).** Leída la noticia de EFE (09/11/2026): sólo la pregunta 15 (aborto, «blindaje en la Constitución») es explícita; jornada y pensiones quedan en revisión.
- **PCTE (`pcte`).** Nueva y relevante (36 provincias): su «Programa de lucha 2023-2027» (julio de 2023, documento político, no electoral) permite 7 posiciones como antecedente fechado: 2, 4, 6, 8, 12, 13 y 15. No hay programa del 29N.
- **Federaciones del PSOE, coaliciones y marcas territoriales.** Sin evidencia propia; no se ha heredado nada del PSOE, de Sumar/Frente Amplio ni de partidos miembros.

## Bloqueos y límites de acceso

Registrados también en el `searchLog` de cada fichero; no se ha evadido ninguna restricción.

- `europapress.es` bloqueado para la lectura web: noticia de Junts no verificada.
- `socialistes.cat` y su Ponencia política 2024-27: HTTP 403; no leída.
- `comuns.cat`: respuesta 202 vacía; `pse-ee.com`, `psn-psoe.es`, `upn.es`, `eguzkilore.eus`, `partidoalantre.es`: sin respuesta.
- `compromis.net`: sin respuesta; `esquerra.cat`: 403.
- `chunta.org/wp-content/uploads/2026/01/Programa-electoral.pdf`: 404 (era el programa de las autonómicas aragonesas, otra convocatoria).
- API de Manifesto y CEPC: no consultadas por exigir cuenta/clave o por bloqueo (ver `REVIEW.md`).

## Método y garantías

- Texto de los PDF extraído con `pdftotext`; búsquedas por palabras clave en el idioma del documento tras reparar los guiones de fin de línea. Se detectó que sin esa reparación se pierden coincidencias («alqui- leres»); tras corregirlo se repitieron las búsquedas de VOX (temas 6, 7, 8, 10, 12 y 14), de BNG y de las preguntas de alquiler de ERC.
- `sha256` sólo en las fuentes realmente descargadas. Las notas de prensa leídas con la herramienta de lectura web no llevan hash.
- Las preguntas `en-revision` llevan `position: null` y una lectura provisional en `reviewNote`; no la he convertido en valor.
- El esquema y el recuento de 18 preguntas se han validado con un script local (no incluido en el repositorio).

## Entregas

| Lote | Entidades | Estado de integración |
|---|---|---|
| 1 | las 33 entidades de la tabla | `pendiente` (sin commit de integración) |

## Traspaso de fichas de GPT (15/11/2026)

Por indicación del usuario, Claude completó las 33 fichas de `evidence/gpt/` (excepto `pnv`, ya revisada por GPT y no tocada).
Totales: 121 documentadas, 24 en revisión, 449 sin evidencia de 594.
- Sin verificar por fuentes bloqueadas (estado `en-curso`): `psoe` (PDFs 2023 tras Incapsula) y `ehbildu` (no verificable).
- Resto de fichas: `revisado`. Las 15 candidaturas menores quedan sin evidencia, con registro de búsquedas.
- Aviso a GPT: `pnv.json` lista `sourceIds` en 10 preguntas `sin-evidencia` (contradice el esquema).
