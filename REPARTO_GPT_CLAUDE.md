# Reparto de trabajo — GPT y Claude

**Acuerdo operativo del usuario · 15/11/2026 · Repositorio `letalicpeio/afinidad-electoral`**

## Leer esto antes de empezar

El usuario ha autorizado completar la web con fuentes oficiales como primera opción y, si no permiten avanzar, con fuentes secundarias o desactualizadas identificadas. No hace falta esperar a que aparezcan todos los programas nuevos. Se conserva la información necesaria para revisarla después. Prioridad: terminar una web útil, trazable y actualizable.

Este documento reparte las **66 entidades del catálogo, 33 para GPT y 33 para Claude**. La unidad de responsabilidad es la entidad (`programas.json.id`), no una provincia ni un partido miembro. El reparto equilibra candidaturas principales y territoriales; no presupone igual número de horas. No trabajar en entidades del otro agente sin dejar un traspaso acordado por el usuario.

**Claude:** empieza leyendo `main` actualizado y este archivo. Trabaja únicamente tus 33 entidades. No necesitas que GPT termine su investigación. El usuario te dará la orden de comenzar; este archivo no implica que ya estés ejecutando nada.

**GPT:** trabaja tus 33 entidades y actúa como integrador de datos y publicación. Crear este documento no significa haber completado esa mitad.

Base examinada: `f34a2d8aaf7b359e9089212ac01a4b75e085bb7b`, datos versión 0.5.3. Es una referencia de partida: consultar siempre el estado actual, no restaurar esta versión.

## Archivos y coordinación sin colisiones

- Claude entrega lotes en `evidence/claude/<catalog-id>.json` y su registro en `evidence/claude/PROGRESO.md`.
- GPT entrega lotes en `evidence/gpt/<catalog-id>.json` y su registro en `evidence/gpt/PROGRESO.md`.
- Un fichero por entidad, con las 18 preguntas revisadas y fuentes normalizadas. Crear las carpetas al comenzar. No guardar respuestas de participantes ni datos personales.
- Cada agente usa su rama y commits propios. Claude entrega su rama/PR o incorpora exclusivamente su carpeta a `main` tras actualizarla; nunca fuerza el historial. Los commits deben indicar entidades y preguntas tratadas.
- **Solo GPT, en su función de integrador, modifica `data.json`, `programas.json`, `catalog.mjs`, interfaz, pruebas compartidas, README, REVIEW y versiones.** Claude propone cambios de código o correcciones ajenas en su registro, sin aplicarlos a esos archivos.
- Antes de integrar, GPT actualiza `main`, comprueba los cambios de ambos agentes y aplica solo las entidades/preguntas del lote. Nunca sustituye un JSON completo por una copia antigua. Si cambió la misma posición desde `baseCommit`, compara las dos evidencias antes de resolver.
- Los ficheros de evidencia son propuestas revisables; **no aparecen en la web hasta integrarse**. Registrar `integrado` con SHA real solo después de comprobarlo. GPT conserva fuentes y evidencia anterior al sustituir una posición.
- No modificar este reparto unilateralmente. Si hay una entidad nueva, dejarla pendiente de asignación; no apropiarse de tareas ajenas.

## Objetivo y criterio de finalización

Para cada una de las 18 afirmaciones exactas de `data.json.questions`, buscar y registrar una respuesta documentada. No cambiar preguntas ni fórmula para facilitar el relleno.

Una entidad está **revisada** cuando sus 18 preguntas tienen una decisión explícita (`documentada`, `en-revision` o `sin-evidencia`) y se han registrado búsquedas y fuentes. Está **completa con evidencia** solo si las 18 son documentadas. Tener un enlace al programa o una posición no significa estar completa. Informar ambas métricas; no confundir casillas revisadas con puntuables.

La prioridad de terminar permite usar antecedentes y prensa; **no autoriza inventar posiciones, convertir silencio en neutralidad ni rellenar por ideología**. Si tras una búsqueda razonable en fuente oficial, archivo y fuente secundaria no hay respaldo, dejar `sin-evidencia`, explicar el hueco y seguir con la siguiente pregunta. Un partido de propuesta única puede quedar legítimamente sin evidencia en otros temas.

## Fuentes comunes y orden de búsqueda

Los dos agentes usarán el mismo método, no necesariamente el mismo artículo para partidos distintos:

1. **Documento oficial de la convocatoria vigente (2026)**: programa completo, resumen o páginas sectoriales enlazadas desde la campaña. Comprobar año, elección, autor y versión.
2. **Otra evidencia primaria actual**: propuestas oficiales, comunicados, declaraciones identificables, iniciativas y votaciones parlamentarias. Una votación sobre un paquete amplio no demuestra acuerdo con cada elemento.
3. **Fuente secundaria actual y atribuible**: priorizar RTVE, EFE, Europa Press, Servimedia y medios con autor, fecha y acceso a la declaración/documento. Leer la fuente original, no solo un resultado de búsqueda. Los comparadores agregadores sirven para localizar referencias; no importar sus puntuaciones.
4. **Programa oficial anterior o documento político fechado**, preferentemente de la misma elección e identidad; si procede de autonómicas/europeas o de otra composición de coalición, explicitarlo. Una copia íntegra autenticable en RTVE/Betevé u otro archivo conserva el carácter de documento del partido, pero su alojamiento no es oficial.
5. Si hay contradicción, prevalece la propuesta **actual, explícita y aplicable a la afirmación**, especialmente el programa oficial de 2026. No dejar que una frase genérica actual invalide una propuesta anterior concreta sin explicar el conflicto. Conservar ambas y marcar revisión cuando no pueda resolverse.

En una misma posición no sumar fuentes como si fueran votos ni calcular promedios entre posturas incompatibles. No presentar antigüedad o calidad documental como intensidad política: puntuación y fiabilidad son campos separados.

### Directorio compartido

| Recurso | Uso común y límites |
|---|---|
| Web oficial de cada entidad | `programas.json.website` como punto de partida; comprobar enlaces y fecha, no asumir que la ruta disponible sea actual. |
| Manifesto Project | https://manifesto-project.wzb.eu/ — programas y metadatos. |
| Manifesto Corpus | https://manifesto-project.wzb.eu/information/documents/corpus — textos anotados. |
| Explorador de documentos | https://visuals.manifesto-project.wzb.eu/mpdb-shiny/cmp_dashboard_corpus_doc/ — seleccionar país, convocatoria y partido; registrar selección, unidad y versión. España dispone de 2023-07 en la consulta realizada. |
| API Manifesto | https://manifesto-project.wzb.eu/information/documents/api — requiere cuenta y clave para textos. Nunca guardar claves en el repositorio; sin clave usar explorador o documentos originales. No convertir categorías MARPOR en afinidad 1–5. |
| CEPC | https://www.cepc.gob.es/documentacion/programas-electorales — archivo histórico; su página indica consulta presencial y petición anticipada para algunos materiales. No afirmar que un PDF se obtuvo del CEPC si solo se consultó su catálogo. |
| Archivo PSOE | https://www.psoe.es/transparencia/informacion-politica-organizativa/programa/ — comprobar de nuevo si aparece programa 2026; el listado consultado anteriormente enlazaba generales 2023. |
| RTVE generales 2023 | https://www.rtve.es/noticias/elecciones-generales/2023/comparador-programas-electorales/ — localizar PDFs; distinguir el documento del resumen editorial. |
| RTVE europeas 2024 | https://www.rtve.es/noticias/elecciones/europeas/comparador-programas/ — PDFs y propuestas de otra convocatoria, que deben identificarse como tales. |
| Betevé | Usar enlaces documentales ya existentes en el catálogo y verificar año; no confundir una noticia de 2026 con un PDF de 2023 enlazado en ella. |

No invertir todo el lote intentando abrir una sola web bloqueada. Registrar el error (403, PDF demasiado grande, etc.) y continuar por una copia/archivo o agencia fiable. No evadir restricciones ni declarar leído un documento inaccesible.

## Escala común de posiciones

| Valor | Significado |
|---|---|
| 1 | Oposición clara a la afirmación exacta. |
| 2 | Oposición con matices o reservas explicitados. |
| 3 | Posición intermedia explícita; nunca ausencia de datos. |
| 4 | Apoyo con matices o condiciones explicitadas. |
| 5 | Apoyo claro a la afirmación exacta. |

`scoreable: false` excluye la posición del cálculo cuando el texto es contextual, ambiguo o responde a otra pregunta. Usar `reviewNote` y no un valor ficticio para hacer pasar validaciones. En los ficheros de evidencia se permite `position: null` para estos casos; al integrar, mantener el modelo válido de la aplicación o conservar el caso únicamente como investigación sin puntuación.

Ejemplos de errores que ambos deben evitar: pensión mínima alta no equivale a revalorización con IPC; reducir jornada no garantiza mantener salario; rechazo de regularización masiva no equivale a eliminar arraigo; neutralidad tecnológica no demuestra continuidad nuclear; criticar corrupción no implica prohibir indultos. No heredar automáticamente posiciones entre PSOE y sus marcas, entre Sumar y Frente Amplio, ni entre partidos miembros y coaliciones. Un documento conjunto firmado sí puede ser antecedente de un firmante, indicando autoría y alcance.

## Formato normalizado de entrega

Fichero UTF-8, JSON válido, dos espacios. Usar identificadores existentes; la tabla inferior distingue `catalogId` de `dataId` (varios son distintos). Para entidades sin `dataId`, proponer uno estable igual al `catalogId`, sin crear coincidencias ambiguas.

```json
{
  "schemaVersion": "1.0",
  "catalogId": "ID_EXACTO_DEL_CATALOGO",
  "dataId": "ID_EXISTENTE_O_PROPUESTO",
  "agent": "claude",
  "baseCommit": "SHA_LEIDO_ANTES_DE_TRABAJAR",
  "reviewed": "2026-11-15",
  "status": "en-curso",
  "sources": [
    {
      "id": "ID_ENTIDAD-s01",
      "url": "https://dominio/ruta-documento",
      "publisher": "Autor o editor identificado",
      "title": "Título exacto",
      "published": "2023-07-07",
      "accessed": "2026-11-15",
      "election": "Generales de España 2023",
      "year": 2023,
      "kind": "programa",
      "origin": "primaria",
      "hosting": "copia-archivo",
      "historical": true,
      "documentVersion": null,
      "sha256": null,
      "notes": "Cómo se verificó autoría y convocatoria; limitaciones de acceso"
    }
  ],
  "questions": {
    "1": {
      "status": "documentada",
      "position": 4,
      "sourceIds": ["ID_ENTIDAD-s01"],
      "locator": "PDF p. 58 (página física); medida X",
      "evidenceSummary": "Paráfrasis fiel de la medida, sin deducirla por ideología",
      "reason": "Relación con la afirmación y motivo de los matices",
      "confidence": "media",
      "reviewNeeded": true,
      "reviewNote": "Antecedente que deberá contrastarse con el programa nuevo",
      "nextAction": "Buscar el apartado equivalente al publicarse el programa 2026",
      "replaces": null
    }
  },
  "searchLog": [
    {
      "date": "2026-11-15",
      "urlOrQuery": "URL o búsqueda efectuada",
      "outcome": "Fuente leída, sin resultado, error o documento de otra elección"
    }
  ],
  "integration": {"status": "pendiente", "commit": null}
}
```

El ejemplo muestra una pregunta por brevedad: **la entrega final debe incluir claves `1` a `18`**, sin cambiar su orden o texto. No copiar la puntuación de ejemplo. `agent` será `gpt` o `claude` en minúsculas. `status` del lote: `en-curso`, `revisado`; integración: `pendiente`, `integrado`, `requiere-cambios`. Preguntas: `documentada`, `en-revision`, `sin-evidencia`. Confianza editorial: `alta`, `media`, `baja`; describir su motivo, no convertirla en porcentaje estadístico.

Fuentes: `kind` = `programa`, `resumen`, `documento-politico`, `acuerdo`, `declaracion`, `iniciativa`, `votacion`, `noticia`; `origin` = `primaria` o `secundaria`; `hosting` = `oficial`, `copia-archivo` o `medio`. `published` puede ser solo año o `null` si se desconoce, indicándolo. `year` corresponde a la evidencia, no al año de descarga. `sha256` solo si se descargó realmente el archivo. Conservar localizador reproducible y una paráfrasis suficiente; no subir PDFs enteros, artículos completos ni grandes extractos sin licencia.

Para `sin-evidencia`: `position: null`, `sourceIds: []`, explicación y búsquedas; para `en-revision`, indicar fuentes y conflicto sin forzar puntuación. En `replaces`, registrar el valor/fuente anterior si se propone cambiarlo. Conservar una entrada de historial en la evidencia cuando se sustituya una posición; no borrar la procedencia anterior.

## Correspondencia con la aplicación actual

Al integrar una pregunta documentada, GPT conserva los campos existentes `value`, `source`, `locator`, `reason`, `reviewed`, `coding`, y añade `sourceNote`; usa `historical: true` y `sourceYear` cuando corresponda. El registro de evidencia contiene los metadatos ampliados y puede vincularse desde la posición sin obligar a rediseñar el motor. Una posición histórica debe mostrar año y convocatoria en su localizador y una advertencia visible de uso provisional.

Los estados de `programas.json` disponibles son `oficial`, `resumen`, `copia`, `secundaria`, `historico`, `no-localizado`, `sin-revisar`. `official` describe el alojamiento del enlace principal según el dominio, no la fiabilidad de todas las fuentes de la ficha. No convertir una mezcla de fuentes en «programa oficial completo».

Conservar el umbral de cobertura ponderada del 50 %, las omisiones y la fórmula actual. No bajar el umbral para aparentar finalización. Sin tareas de rediseño, autenticación, almacenamiento de opiniones, nuevas preguntas ni cambios de alojamiento dentro de este reparto.

## Validación e integración de cada lote

1. Actualizar la rama desde `main` y comprobar que el lote sigue perteneciendo al agente.
2. Revisar identidad exacta y posibles coaliciones; no reutilizar todo `data.json` de un checkout antiguo.
3. Comprobar 18 decisiones, fuentes, fechas, localizadores, avisos históricos y preguntas que quedan sin evidencia.
4. GPT integra únicamente cambios respaldados y sincroniza catálogo, datos y notas; conserva antecedentes sustituidos en la evidencia.
5. Ejecutar `node --check app.mjs`, `node --check programas.mjs`, `node scoring.test.mjs`, `node programas.test.mjs` y `git diff --check`. Si se modifican reglas o esquema, añadir pruebas significativas. No borrar pruebas que detecten un conflicto para ocultarlo.
6. Verificar en la web las etiquetas de origen/año cuando cambie la presentación. Publicar con actualización segura de rama; nunca `force` a ciegas.
7. Registrar SHA de integración, fecha, preguntas nuevas/actualizadas y huecos restantes en el progreso del propietario. Informar al usuario solo de cambios realmente publicados.

## Orden de trabajo y reparto cerrado

Dentro de cada mitad, priorizar primero las candidaturas principales con menos cobertura. Después completar territoriales y pequeñas. Revisar las posiciones ya existentes antes de añadir: los recuentos siguientes son **casillas con alguna evidencia, incluidas las no puntuables**, no cobertura ponderada ni garantía de calidad. Una casilla sin datos puede permanecer así tras revisión justificada.

### GPT — 33 entidades

| Nº | catalogId | Entidad | dataId actual | Casillas registradas / 18 |
|---:|---|---|---|---:|
| 1 | `pp` | Partido Popular | `pp` | 12 |
| 2 | `psoe` | PSOE | `psoe` | 10 |
| 3 | `podemos` | Podemos | `podemos` | 7 |
| 4 | `ehbildu` | EH Bildu | `ehbildu` | 4 |
| 5 | `pnv` | EAJ-PNV | `pnv` | 5 |
| 6 | `cc` | Coalición Canaria–Municipalistas Primero Canarias | `cc` | 2 |
| 7 | `pacma` | PACMA | `pacma` | 5 |
| 8 | `mundo-justo` | Por un Mundo Más Justo | `mj` | 11 |
| 9 | `salf` | Se Acabó La Fiesta | `salf` | 7 |
| 10 | `d21` | Democracia para el Siglo 21 | `d21` | 5 |
| 11 | `humanista` | Partido Humanista | `humanista` | 8 |
| 12 | `fe-jons` | Falange Española de las JONS | `fejons` | 12 |
| 13 | `frente-obrero` | Frente Obrero | `fo` | 7 |
| 14 | `iustitia` | Iustitia Europa | `iustitia` | 2 |
| 15 | `geroa-bai` | Geroa Bai | `geroabai` | 1 |
| 16 | `adelante-andalucia` | Adelante Andalucía | `adelante` | 13 |
| 17 | `agenda-valenciana` | Agenda Valenciana | — proponer `agenda-valenciana` | 0 |
| 18 | `alternativa-malaguena` | Alternativa Malagueña | — proponer `alternativa-malaguena` | 0 |
| 19 | `convergents` | Convergents | — proponer `convergents` | 0 |
| 20 | `escanos-en-blanco` | Escaños en Blanco | — proponer `escanos-en-blanco` | 0 |
| 21 | `feminism8` | Feminism8 | — proponer `feminism8` | 0 |
| 22 | `jose-maria-calvo` | José María Calvo Guerra | — proponer `jose-maria-calvo` | 0 |
| 23 | `justicia-y-ley` | Justicia y Ley | — proponer `justicia-y-ley` | 0 |
| 24 | `nex` | Nuevo Extremeñismo–Adelante Extremadura | — proponer `nex` | 0 |
| 25 | `autonomos` | Partido Autónomos | — proponer `autonomos` | 0 |
| 26 | `pctg` | Partido Comunista dos Traballadores da Galiza | — proponer `pctg` | 0 |
| 27 | `drago` | Partido Drago Canarias | — proponer `drago` | 0 |
| 28 | `pctc` | Partit Comunista dels Treballadors de Catalunya | — proponer `pctc` | 0 |
| 29 | `pcte-euskadi` | PCTE en Euskadi (ELAK/PCTE) | — proponer `pcte-euskadi` | 0 |
| 30 | `puede` | PUEDE | — proponer `puede` | 0 |
| 31 | `soria-ya` | Soria ¡Ya! | — proponer `soria-ya` | 0 |
| 32 | `teruel-existe` | Teruel Existe | — proponer `teruel-existe` | 0 |
| 33 | `union-cartaginense` | Unión Cartaginense | — proponer `union-cartaginense` | 0 |

### CLAUDE — 33 entidades

| Nº | catalogId | Entidad | dataId actual | Casillas registradas / 18 |
|---:|---|---|---|---:|
| 1 | `vox` | VOX | `vox` | 12 |
| 2 | `frente-amplio` | Frente Amplio | `frente-amplio` | 2 |
| 3 | `junts` | Junts per Catalunya | `junts` | 6 |
| 4 | `erc` | Esquerra Republicana de Catalunya | `erc` | 7 |
| 5 | `bng` | BNG | `bng` | 8 |
| 6 | `compromis` | Compromís: Front Valencià | `compromis` | 1 |
| 7 | `comuns` | Comuns–Front Ampli | — proponer `comuns` | 0 |
| 8 | `cha` | Chunta Aragonesista–Frente Amplio Aragón | — proponer `cha` | 0 |
| 9 | `ehbildu-erc` | EH Bildu–ERC (coalición) | — proponer `ehbildu-erc` | 0 |
| 10 | `upn-pp` | UPN-PP (coalición) | — proponer `upn-pp` | 0 |
| 11 | `psc` | PSC-PSOE | — proponer `psc` | 0 |
| 12 | `psdeg` | PSdeG-PSOE | — proponer `psdeg` | 0 |
| 13 | `pse-ee` | PSE-EE (PSOE) | — proponer `pse-ee` | 0 |
| 14 | `psib` | PSIB-PSOE | — proponer `psib` | 0 |
| 15 | `psn` | PSN-PSOE | — proponer `psn` | 0 |
| 16 | `psoe-huelva` | Partido Socialista de Huelva (PSOE) | — proponer `psoe-huelva` | 0 |
| 17 | `alhora` | Alhora | — proponer `alhora` | 0 |
| 18 | `arames` | Aramés–Front Ampli | — proponer `arames` | 0 |
| 19 | `eguzkilore` | Eguzkilore | — proponer `eguzkilore` | 0 |
| 20 | `fia` | Federación de los Independientes de Aragón | — proponer `fia` | 0 |
| 21 | `ipal` | Izquierda por Almería | — proponer `ipal` | 0 |
| 22 | `juex` | Juntos por Extremadura | — proponer `juex` | 0 |
| 23 | `liberacion-canaria` | Liberación Canaria | — proponer `liberacion-canaria` | 0 |
| 24 | `pancal` | PANCAL–URCI | — proponer `pancal` | 0 |
| 25 | `pcpc` | Partido Comunista del Pueblo Canario | — proponer `pcpc` | 0 |
| 26 | `pdsje` | Partido Demócrata Social Jubilados Europeos | — proponer `pdsje` | 0 |
| 27 | `prepal` | Partido Regionalista del País Leonés | — proponer `prepal` | 0 |
| 28 | `pcte` | PCTE | — proponer `pcte` | 0 |
| 29 | `alantre` | Proyecto Alantre | — proponer `alantre` | 0 |
| 30 | `renacer` | Renacer Renaixer | — proponer `renacer` | 0 |
| 31 | `tercera-edad` | Tercera Edad en Acción | — proponer `tercera-edad` | 0 |
| 32 | `upc` | Unidad del Pueblo Canario | — proponer `upc` | 0 |
| 33 | `valencia-unida` | Valencia Unida | — proponer `valencia-unida` | 0 |

## Registro de arranque

- **GPT:** reparto creado; su mitad está pendiente de ejecución bajo este acuerdo.
- **Claude:** pendiente de que el usuario le indique leer este documento y comenzar.
- **Integración:** centralizada en GPT; no hay investigación nueva integrada por la creación de este archivo.

Mensaje breve para Claude: «Lee `REPARTO_GPT_CLAUDE.md` en `main` de `letalicpeio/afinidad-electoral` y comienza exclusivamente tus 33 entidades. Guarda tus lotes normalizados en `evidence/claude/`; no edites los archivos compartidos de la web. Registra fuentes, antigüedad y huecos para que GPT integre sin colisiones».
