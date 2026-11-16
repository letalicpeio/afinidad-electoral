# Revisión de la auditoría de GPT (Claude, 16/11/2026)

Entradas: `gpt-informe-2026-11-16.md` y `gpt-resultados-2026-11-16.csv`. Corte auditado: `b1cdac7`. Cambios aplicados en datos 0.5.23.

## Resultado de la doble codificación a ciegas
- Acuerdo exacto entre pares numéricos: 109/125 (87,2 %); con diferencia ≤1: 124/125 (99,2 %).
- Una discrepancia crítica numérica (pp-3) y 15 de un punto. 38 casos de «sin posición» frente a cifra; 35 no verificables por acceso.
- Lectura: la codificación documentada es sólida; el desacuerdo principal es de **suficiencia** (¿responde el pasaje a la frase exacta?), no de dirección.

## Decisiones sobre las discrepancias numéricas
| Caso | Decisión |
|---|---|
| pp-3 (2 vs 4) | **3**: permite el arraigo solo de forma excepcional; posición intermedia declarada |
| pp-1, pacma-18, salf-18, junts-18 | Se baja a 4 (alcance dirigido o sectorial) |
| pnv-11, frente-amplio-10 | Se sube a 5 (compromiso legislativo / consolidar IPC) |
| adelante-5 | 1 (deroga el endurecimiento y rechaza elevar penas) |
| salf-17, iustitia-12 | 2 (matiz expreso) |
| pp-5, fo-7, d21-12, junts-1, junts-6, junts-11 | Se mantienen: criterio defendible y documentado |

## Decisiones sobre los 38 «sin posición»
- **Se retiran (22):** el pasaje no responde a la frase (financiación o coordinación sin legislación específica, defensa sin cifra de gasto, poder adquisitivo sin IPC, servicios sin igualdad de requisitos, declaración de un partido miembro aplicada a la coalición).
- **Se mantienen:** regularización extraordinaria como respuesta a «arraigo» (lectura por alcance); VOX 15 y 6, FO 11, PACMA 9; antecedentes de Comuns y Frente Amplio, que el usuario autorizó expresamente con aviso de autoría.

## Inferencias (135)
- Sustituidas por texto propio verificado: compromis (14 posiciones del programa oficial de 2026 localizado por GPT), pp-8, pp-14, pp-15, vox-8, bng-6, erc-5, junts-8, junts-9, ehbildu-9/10/18, adelante-18, comuns-14.
- **Retiradas:** las 58 «no sostenibles», las 9 de valor 3 sin posición intermedia declarada y todas las del tema 16 (la lucha anticorrupción no implica prohibir indultos).
- **Se mantienen** (con aviso y confianza baja): las clasificadas «plausible» o «discutible» que no incurren en las reglas anteriores.

## No verificado por Claude
- Página de VOX (403) y votaciones de EH Bildu en el Parlamento de Navarra y de Junts en el Congreso: se aceptan con la salvedad escrita en cada fuente.
- Referencias: dos localizadores incorrectos y seis parciales señalados por GPT; pendientes de corregir página a página.
