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

## Segunda pasada: inferencias «discutibles» (datos 0.5.24)

De las 36 inferencias que GPT calificó de discutibles, 6 ya estaban retiradas en la primera pasada o rehechas con texto. De las restantes se **retiran 14** (PNV-13, BNG-17, CC-8, CC-13, ERC-6, ERC-17, FO-2, FO-8, Frente Amplio-7, Podemos-6, Junts-14, EH Bildu-1, EH Bildu-6, EH Bildu-12) porque el salto desde los indicios hasta la afirmación era demasiado grande o la razón no tenía apoyo propio. **Podemos-7 baja de 5 a 4** (dirección clara, intensidad no). Se **mantienen** con su aviso las que responden a una posición de fondo muy conocida y de dirección inequívoca (por ejemplo VOX-12, BNG-9, BNG-14, Adelante-9, Podemos-5, PSOE-5, PSOE-6, EH Bildu-3 y EH Bildu-14); siguen siendo inferencias y se pueden excluir con «solo documentado».

## Localizadores (datos 0.5.26)

GPT entregó `audit/gpt-localizadores-2026-11-16.csv` (índice físico de cada PDF, 56 posiciones). Se aplican sus 51 localizadores propuestos. Páginas que cambian: ERC-15 44→47, PNV-11 6/8→26, Junts-11 110→111, PCTE-8 6/11→11, PACMA-4 55→56, PACMA-11 75-76→77, Adelante-11 27→98, Comuns-2 80→81, FO-11 31→32. El resto solo se normaliza al formato «PDF p. N; apartado/medida». GPT rectificó su observación sobre Comuns-8 (la 19 es correcta) y su equivalencia +1 en PACMA. Pendientes: el PDF de Adelante Andalucía ha cambiado desde que se registró su huella (la ficha debe actualizarse), la URL del PNV no termina en .pdf y por eso no genera enlace con página, y la ficha de PP 2026 cuenta 65 hojas frente a 64.

## Ampliación de huecos en partidos grandes (datos 0.5.27–0.5.28)

Frente Amplio: seis posiciones nuevas leídas en el programa de Sumar 2023 (antecedente): regularización permanente (p. 106), oposición a la privatización sanitaria (p. 91, confianza baja), eliminar la prisión permanente revisable (p. 135), no aumentar el gasto militar (p. 141, confianza baja), reforma de la ley de indultos sin prohibición (p. 130, posición intermedia declarada) y acceso de migrantes irregulares al IMV (p. 88). PNV-5 = 1 (programa 2023, p. 10). Siguen sin texto: Frente Amplio 1, 7 y 14; PNV 1, 2, 4, 9, 13, 14, 16 y 17.

## Segunda ronda de antecedentes (datos 0.5.30)

Escaneados los programas de 2023 de PP, Junts, EH Bildu y ERC y las bases de Geroa Bai de 2019: no contienen pasajes que respondan a los temas aún vacíos (los huecos son ausencias reales del texto). Se añade CC-10 = 4 (manifiesto de 2023, p. 7, «pensiones actualizadas en función del coste de la vida»). Fuera de este proceso, una declaración de Sumar de 2025 sustituye a la lectura del programa de 2023 en Frente Amplio-13.
