# Reparto · mejorar las inferencias con fuentes

**Acuerdo del usuario · 16/11/2026 · datos 0.5.34 · repositorio `letalicpeio/afinidad-electoral`**

## Qué hay que hacer

Con la casilla «solo documentado» desmarcada, la web puntúa los 18 temas de cada partido. Cuando el partido no trata un tema, la posición es una **inferencia editorial** (`inferred: true`). A partir de ahora el objetivo es **mejorar cada inferencia con fuentes**: encontrar el texto, la declaración o la votación del propio partido que la respalde, corregirla si la fuente dice otra cosa, o retirarla si no hay sustento.

Pendientes: **209 inferencias** (de las 218 actuales, 9 ya llevan fuentes en `basisLinks`). Están en [`audit/inferencias-pendientes.csv`](audit/inferencias-pendientes.csv): una fila por inferencia, con el partido, el tema, la afirmación exacta, el valor actual, el responsable y el orden de trabajo.

## Reparto (60 % Claude · 40 % GPT)

La unidad es el **partido entero**, para que cada uno trabaje siempre sobre sus propios ficheros de evidencia y no haya colisiones.

| Responsable | Inferencias | Partidos, en este orden |
|---|---|---|
| **Claude** | **123 (59 %)** | PSOE 6 · PP 4 · VOX 6 · Frente Amplio 3 · Podemos 7 · ERC 4 · Junts 8 · EH Bildu 10 · PNV 9 · BNG 7 · Compromís 4 · Adelante Andalucía 4 · Coalición Canaria 13 · Comuns 13 · PCTE 12 · Frente Obrero 8 · FE de las JONS 5 |
| **GPT** | **86 (41 %)** | Geroa Bai 16 · PACMA 13 · SALF 9 · Partido Humanista 9 · Por un Mundo Más Justo 9 · D21 14 · Iustitia Europa 16 |

Claude toma los partidos grandes y los de mayor peso en el resultado, que además tienen más textos y votaciones accesibles, y se queda también con los de programa 2023 ya leído. GPT toma las candidaturas pequeñas, que son muchas filas pero con pocas fuentes: ahí el trabajo es de búsqueda paciente.

### Por dónde empieza GPT

1. **Geroa Bai** (16): sus bases de 2026 (14 pp.) ya están leídas y solo cubren 2 temas. Quedan las de generales 2019 (`https://geroabai.eus/files/2019/10/BASES POLITICAS-10N-2019-VF.pdf`), 2015, 2011 y los programas forales 2019/2023 y el acuerdo de gobierno de Navarra 2023-2027 de la página de transparencia (`https://geroabai.eus/es/transparencia`). Las bases de 2019 ya se escanearon y apenas responden; el valor está en las otras.
2. **PACMA** (13): programa de 2026 ya integrado (4 temas); falta su programa de 2023 y 2019, y sus iniciativas parlamentarias y comunicados.
3. **SALF** (9), **Partido Humanista** (9), **Por un Mundo Más Justo** (9).
4. **D21** (14) e **Iustitia Europa** (16): son las más difíciles; si no hay sustento lo normal es proponer retirar la inferencia.

### Por dónde empieza Claude

PSOE → PP → VOX → Frente Amplio → Podemos → ERC → Junts → EH Bildu → PNV → BNG → Compromís → Adelante → CC → Comuns → PCTE → Frente Obrero → FE de las JONS.

## Cómo se trabaja cada fila

Para cada inferencia, el responsable decide **una** de estas cuatro salidas:

| Salida | Cuándo | Qué se registra |
|---|---|---|
| **A · documentar** | Hay texto, declaración o votación del partido que responde directamente a la afirmación. | Nueva posición documentada: valor, fuente, localizador exacto (`PDF p. N` según índice físico del PDF), resumen y razón. Pasa de inferida a documentada. |
| **B · inferencia con fuentes** | Hay indicios claros pero no una respuesta directa (por ejemplo, una votación o una declaración sobre un tema próximo). | Se conserva como inferida y se añade la lista de fuentes (`basisLinks`: url + etiqueta) y la razón concreta. Se corrige el valor si la fuente lo exige. |
| **C · retirar** | La inferencia no tiene sustento o la fuente dice lo contrario y no permite un valor. | Se retira de `data.json`; el tema queda «sin posición» también con la casilla desmarcada, y la web lo indica. |
| **D · sin cambio** | Tras buscar razonablemente no hay nada mejor. | Se deja como está, con un registro de las búsquedas hechas. |

Reglas, iguales a las del acuerdo inicial (`REPARTO_GPT_CLAUDE.md`) con los matices de esta ronda:

- Orden de fuentes: programa oficial 2026 > otra evidencia primaria de 2026 (comunicados, iniciativas, votaciones) > prensa fiable y atribuible > programa o documento anterior fechado. Leer la fuente original, no solo el resultado de búsqueda.
- **No convertir silencio en neutralidad**: no se propone un 3 «por si acaso». Un 3 solo vale si el partido declara una posición intermedia.
- Una votación sobre un paquete amplio no equivale a acuerdo con cada medida. Distinguir moción propia, enmienda, abstención y voto en contra.
- Una página impresa no es un índice físico: el localizador usa el índice físico del PDF (la hoja 1 es la primera del archivo). Anotar la equivalencia cuando se compruebe.
- Cada fuente nueva lleva año, tipo (`programa`, `declaracion`, `noticia`, `votacion`, `documento-politico`) y SHA-256 si es un archivo descargable.
- Si una fuente de 2025 o anterior es la única, se marca como **antecedente** con su aviso; no se presenta como compromiso de 2026.

## Cómo entrega GPT

GPT **no modifica `data.json`, `programas.json`, la interfaz ni las pruebas** en esta ronda: entrega y Claude integra, para que los dos no escriban a la vez en los mismos ficheros.

- Un CSV por partido en `audit/inferencias-gpt/<partido>.csv`, con una fila por inferencia (mismos `id` que `audit/inferencias-pendientes.csv`) y las columnas:

`id, salida (A|B|C|D), valor_propuesto, fuente_1_url, fuente_1_etiqueta, fuente_1_tipo, fuente_1_anio, fuente_1_localizador, fuente_2_url, fuente_2_etiqueta, fuente_2_tipo, fuente_2_anio, fuente_2_localizador, razon, confianza (alta|media|baja), busquedas_hechas`

- `razon` es una frase que explica por qué la fuente respalda el valor, sin interpretar más de lo que dice.
- `busquedas_hechas` recoge dónde se buscó (documentos, páginas, términos), también cuando la salida es C o D.
- El registro de avance va en `audit/inferencias-gpt/PROGRESO.md` (partidos terminados, filas por salida, dudas).
- Se hace commit por partido, con un mensaje que indique las filas tratadas.

Claude revisa cada CSV fila a fila, lo integra en `data.json` y sus fichas de evidencia, ejecuta las pruebas y publica. Las salidas A y B que Claude no pueda reproducir con la fuente se devuelven con una nota.

## Seguimiento

- Cuando una inferencia se resuelve se actualiza la fila correspondiente en `audit/inferencias-pendientes.csv`: se deja constancia de la salida y la versión de datos. Claude mantiene este archivo.
- Estado inicial (0.5.34): 218 inferencias, 9 con fuentes específicas, 209 pendientes: 123 de Claude y 86 de GPT.
- Cualquier partido o fila nuevos que aparezcan se quedan sin asignar hasta que el usuario decida.
