# Progreso GPT

Inicio: 15/11/2026. Reparto: REPARTO_GPT_CLAUDE.md.

- 33 fichas preparadas, 18 preguntas por ficha (594 decisiones iniciales). No son 594 posiciones nuevas ni 33 investigaciones completadas.
- Las posiciones existentes se importan con su fuente y baselinePosition. Los metadatos incompletos permanecen pendientes; accessed/reviewed no se inventan.
- Los huecos figuran sin-evidencia con búsqueda pendiente explícita. Estado inicial: todas las fichas en-curso; los avances posteriores se detallan por lote.
- Primera investigación nueva: EAJ-PNV, programa oficial de generales 2026, propuesta 2.2.01 (PDF p.14); nueva posición 18 = 5. No se infieren posiciones por palabras no encontradas.
- PNV pregunta 18 integrada en `b1f37493adf576b88aef38a5bc66db5c0926b7e9`. Versión 0.5.4 comprobada en la web el 15/11/2026; seis posiciones documentadas en PNV. Pruebas de cálculo y catálogo superadas.
- Ningún fichero de Claude ha sido modificado.

Siguiente: revisión completa de los huecos de PNV y de las principales candidaturas asignadas; actualizar preguntas y metadatos únicamente después de consultar fuentes.

## Segundo lote · 15/11/2026

- PNV: primera ficha con 18 decisiones revisadas. Cinco documentadas puntuables, tres en revisión y diez sin evidencia suficiente; revisión no significa cobertura completa. Nueva pregunta 15 del programa oficial actual.
- CC: dos propuestas nuevas con matices (IRPF territorial y trámites de vivienda). Cuatro posiciones en la web; ficha en-curso.
- Metadatos de ambos PDFs completados con huella SHA-256 y localizadores; PDFs no subidos.
- Integrado en `112411946bc2780f748eabaaa959cd820a393a31`. Versión 0.5.5 comprobada en la web el 15/11/2026. Pruebas de cálculo y catálogo superadas. La entrega de Claude se conserva y queda pendiente de revisión antes de integrarla.

## Tercer lote · 15/11/2026

- CC: pregunta 10 documentada con declaración oficial de 2026; cinco posiciones registradas. Se explicita autoría de CC y confirmación conjunta pendiente.
- Pregunta 8 en revisión: entrevista de 2025, condicionada a ayudas a pymes. No entra al cálculo. Resto de investigación pendiente; ficha en-curso.
- Publicado y comprobado 0.5.6 en la web el 15/11/2026; commit 7a3c5b13ae8458de8dc8bb385df581627bb5e892. Pruebas de cálculo y catálogo superadas.

## Corrección documental de PNV · 15/11/2026

Preguntas 1, 2, 4, 6, 8, 9, 13, 14, 16 y 17: sourceIds vacío, position y locator nulos. Consultas previas conservadas en consultedSources sin presentarlas como respaldo. No se trasladan localizadores de 2026 a la copia de 2023. Revisada concordancia de las 18 decisiones con data.json 0.5.7: cinco puntuables, dos contextuales excluidas y una en revisión solo en evidencia; diez huecos ausentes del cálculo. Sin cambios políticos ni nuevas búsquedas en esta corrección.


## Revisión D21 y Teruel Existe · 0.5.10

D21: pregunta 12 corregida de 5 a 4 tras leer directamente el programa oficial europeo. El origen se normaliza como oficial; no era prensa. Se conserva la codificación anterior en la evidencia. Defensa (pregunta 13) permanece sin puntuar. Teruel Existe: resumen oficial contrastado; la propuesta 13 no acredita por sí sola apoyo al marco legal específico de violencia de género. Pregunta 11 pasa a en-revision y permanece fuera del cálculo, al igual que la pregunta 1. No se declara leído el PDF completo. No se modifican los datos de otras formaciones ni el dominio.
