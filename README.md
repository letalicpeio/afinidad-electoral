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

**Versión 0.5.5, catálogo incompleto. PP, VOX, EAJ-PNV, BNG, Municipalistas Primero Canarias–Coalición Canaria, ERC, PACMA, Por un Mundo Más Justo, FE de las JONS, Frente Obrero, Adelante Andalucía, Geroa Bai, SALF, Partido Humanista, Democracia 21, Iustitia Europa, Frente Amplio, Podemos, Compromís: Front Valencià, Junts, PSOE y EH Bildu tienen análisis parcial. No identifica la máxima afinidad entre todas las candidaturas.** Las demás figuran como pendientes de revisión; esa etiqueta no afirma que carezcan de programa publicado. Desde 0.5 se admiten antecedentes de 2023 expresamente fechados para cubrir huecos, sin sustituir evidencias actuales ni presentarlos como compromisos de 2026.

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

Ampliación 0.4.4: PSOE pasa a tres afirmaciones (alquiler, pensiones y aborto), Podemos a dos (alquiler y gasto militar), Frente Amplio a dos (pensiones y cierre nuclear). Se combinan fuentes oficiales e información de agencias, identificadas por posición.

Versión 0.5: EH Bildu incorpora cuatro antecedentes de julio de 2023 desde Manifesto Corpus (versión 2026-1, explorador Spain → 2023-07 → Euskal Herria Bildu). PSOE añade cuatro posiciones del programa oficial de 2023 a sus tres actuales. Campos historical/sourceYear y notas visibles identifican la antigüedad. No se reutilizan programas de Sumar como si fueran de Podemos o Frente Amplio. La API de Manifesto exige cuenta y clave; no se ha realizado importación masiva.

Ampliación 0.5.1: Junts pasa de una a seis posiciones, con cinco antecedentes del programa de generales 2023 de la candidatura Junts–Demòcrates–Més Esquerres (copia Betevé). Podemos añade su prioridad oficial sobre aborto en las europeas de 2024. Se mantiene evidencia actual y se indica la convocatoria original.

Ampliación 0.5.2: Podemos pasa de tres a siete posiciones usando el PDF de europeas 2024 archivado por RTVE (sanidad, nuclear, legislación de violencia machista y democratización de la UE). PSOE pasa de siete a nueve con Defensa y violencia de género del programa de 2023.

Ampliación 0.5.3: PP incorpora Defensa e integración europea del programa de 2026; PSOE incorpora jornada máxima sin reducción salarial del acuerdo de gobierno de 2023, como firmante. No se atribuye ese acuerdo a Frente Amplio ni Podemos.

Integración 0.5.9 (15/11/2026): ERC 18 se reincorpora con valor 4 (la medida 86 sí propone simplificación administrativa para pymes; la retirada de 0.5.7 fue un error de lectura) y BNG 4 pasa a 1 con base en el apartado de sanidad (p. 37). ERC y BNG alcanzan 9 posiciones puntuables.
Revisión de huecos 0.5.11–0.5.12 (15/11/2026): pasada por los partidos con programa oficial buscando texto relacionado con preguntas sin puntuar. Se codifican Frente Obrero 17 (2), FE de las JONS 2 (5), VOX 6 (4) y 15 (1), Por un Mundo Más Justo 17 (4), BNG 5 (1) y PACMA 9 (1). El resto de huecos se mantiene: el programa no responde a la afirmación o sólo habla de un asunto relacionado.
Ampliación de antecedentes 0.5.13–0.5.15 (15/11/2026): Compromís (alquiler y jornada con prensa del 15/11/2026; conciertos educativos con su programa de 2023), EH Bildu (programa de 2023 leído completo: 6 posiciones, antecedente) y Podemos (jornada y pensiones, programa europeo de 2024). Frente Amplio y Geroa Bai no tienen un programa anterior de generales propio que se pueda usar sin heredar de otra formación.
Frente Amplio 0.5.16 (15/11/2026): por decisión del usuario se usa el programa de Sumar de 2023 como antecedente (7 posiciones, marcadas como tal con su año y su autoría). No se hereda ninguna posición de otras formaciones.
Antecedentes en huecos 0.5.17 (15/11/2026): por decisión del usuario, un partido con programa oficial de 2026 puede completar con su programa anterior los temas que el de 2026 no trata (ERC 4 posiciones de 2023, PNV 3). Nunca sustituyen una posición de 2026. Comuns se incorpora con el programa Sumar–En Comú Podem de 2023 alojado en su web (4 posiciones). PP, BNG y PACMA se rastrearon con sus programas de 2023 sin hallar texto aplicable; VOX 2023 y CC 2023 no se localizaron.
Posiciones inferidas 0.5.19–0.5.20 (15/11/2026): por decisión del usuario, los temas sin texto del partido se completan por inferencia editorial en los partidos grandes (PP, PSOE, VOX, Frente Amplio, Podemos, ERC, Junts, PNV, EH Bildu, BNG, Compromís, Comuns, CC, FE de las JONS y Frente Obrero; 110 posiciones; 0.5.21 las lleva a 135 y deja completos a Adelante, CC, Compromís, PNV, Junts, Comuns, BNG y EH Bildu). Tienen su propio nivel (`inferred: true`, aviso «INFERENCIA EDITORIAL», confianza y razón), se cuentan aparte en los resultados y son la última opción: se sustituyen en cuanto haya texto del partido. Quedan sin inferir los temas sin fundamento concreto.

Integración 0.5.8 (15/11/2026): PSOE pasa a programa oficial de 2026 (psoe.es, publicado ese día): 11 posiciones documentadas, 1 en revisión (arraigo, antecedente de 2023 retirado) y 6 sin evidencia. PSOE 13 (gasto en defensa) baja de 5 a 2 porque el programa rechaza el 5 % del PIB.

Integración 0.5.7 (15/11/2026, a petición del usuario): se aplican las evidencias revisadas de `evidence/claude` y `evidence/gpt` (35 posiciones nuevas o modificadas y 1 retirada del cálculo: ERC 18). Se añade PCTE con antecedente de 2023 marcado como tal. Se omiten D21 12 (la ficha sólo tiene prensa y el partido tiene programa oficial) y Teruel Existe 11 (fuente de resumen distinta del programa enlazado).

## Jerarquía de la evidencia

1. **Fuente oficial de 2026** (programa o documento del partido): siempre prevalece.
2. **Prensa de 2026** (`Fuente secundaria` en `sourceNote`): solo cubre temas de partidos sin programa oficial.
3. **Antecedentes** (`historical: true` con `sourceYear` anterior a 2026): solo cubren temas de partidos sin programa oficial; llevan año, aviso y se sustituyen en cuanto exista evidencia actual.

Cada resultado indica cuántos temas puntuados proceden de cada nivel. Un test impide que un partido con programa oficial de 2026 conserve antecedentes o prensa.

Trabajo coordinado: consultar [REPARTO_GPT_CLAUDE.md](REPARTO_GPT_CLAUDE.md). GPT mantiene sus propuestas y trazabilidad en [evidence/gpt/PROGRESO.md](evidence/gpt/PROGRESO.md); las fichas en curso no equivalen a investigación terminada.

Ampliación 0.5.5: PNV añade protección del acceso al aborto del programa oficial de 2026. Su ficha de evidencia registra 18 decisiones: cinco documentadas, tres en revisión y diez sin evidencia suficiente. CC añade apoyo fiscal territorial (IRPF en tres islas) y simplificación sectorial de vivienda, ambos con matices explícitos.


Ampliación 0.5.6: CC añade pensiones mediante declaración oficial del 26/02/2026, que defiende subidas superiores a la inflación. Se señala que es anterior al programa conjunto y requiere confirmación del socio. Cinco posiciones registradas; jornada queda solo en investigación con fuente secundaria de 2025. El resto de preguntas pendientes no se declara revisado.


## Revisión D21 y Teruel Existe · 0.5.10

D21: pregunta 12 corregida de 5 a 4 tras leer directamente el programa oficial europeo. El origen se normaliza como oficial; no era prensa. Se conserva la codificación anterior en la evidencia. Defensa (pregunta 13) permanece sin puntuar. Teruel Existe: resumen oficial contrastado; la propuesta 13 no acredita por sí sola apoyo al marco legal específico de violencia de género. Pregunta 11 pasa a en-revision y permanece fuera del cálculo, al igual que la pregunta 1. No se declara leído el PDF completo. No se modifican los datos de otras formaciones ni el dominio.

### Mejora de las inferencias (16/11/2026)

El reparto de trabajo para mejorar las 209 inferencias que aún no tienen fuentes específicas está en [`REPARTO_INFERENCIAS.md`](REPARTO_INFERENCIAS.md) y su lista en [`audit/inferencias-pendientes.csv`](audit/inferencias-pendientes.csv): 123 para Claude (partidos grandes) y 86 para GPT (candidaturas pequeñas).
