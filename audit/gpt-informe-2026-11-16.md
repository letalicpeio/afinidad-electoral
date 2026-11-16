# Auditoría independiente de codificación política · 16 de noviembre de 2026

**Repositorio y corte:** `letalicpeio/afinidad-electoral`, `main` en `b1cdac77cc5ee2cf2c1aeb96d55fe6b1dd70b643`. Rama de entrega: `audit/gpt-2026-11-16`. El informe evalúa ese corte, no los cambios que pudieran publicarse después. Auditor: GPT, una sola lectura independiente, sin subagentes.

## a) Resumen y alcance

Se intentaron las **198 filas documentadas** y se evaluaron las **135 inferidas**. En la fase ciega, **163** filas tuvieron texto legible: **125** recibieron valor numérico y **38** quedaron como `sin-posicion`. Las otras **35** fueron `no-verificable`. No se rellenó un desconocido con 3.

| Indicador Tarea 1 | Resultado | Denominador |
| --- | --- | --- |
| Acuerdo exacto entre todas las lecturas verificables | 109/163 = 66,9 % | Incluye como desacuerdo los 38 casos sin posición frente a cifra |
| Acuerdo dentro de tolerancia de un punto | 124/163 = 76,1 % | Mismo universo; desacuerdos categóricos fuera de tolerancia |
| Acuerdo exacto solo entre pares numéricos | 109/125 = 87,2 % | Excluye los casos sin posición y no verificables |
| Diferencia numérica ≤1 solo entre pares numéricos | 124/125 = 99,2 % | No asigna una distancia artificial a sin posición |
| Acuerdo exacto sobre las 198 filas intentadas | 109/198 = 55,1 % | Los fallos de acceso no se cuentan como acuerdos |
| Discrepancias numéricas críticas | 1 | Una: pp-3, 2 asignado frente a 4 del auditor |
| Discrepancias numéricas de un punto | 15 | 9 medias por partido grande; 6 leves |
| Sin posición frente a valor asignado | 38 | Discrepancias categóricas, sin distancia numérica |
| No verificables en la fase ciega | 35 | No implican error de codificación ni enlace universalmente roto |


**Resultado adicional de Tarea 2:** se recuperó texto suficiente para 20 inferencias: 10 conservan cifra y 10 difieren; entre estas hay **5 diferencias críticas** y 5 de un punto. Otras 21 razones se consideran plausibles, 36 discutibles y 58 no sostenibles. En esas 115 no se da por acreditado un valor puntuable con lo encontrado; se recomienda `sin-posicion` hasta disponer del texto preciso. Estos resultados no se mezclan con el porcentaje ciego.

**Tarea 3:** muestra de 40 posiciones: 10 oficiales, las 8 de prensa disponibles, 10 antecedentes, 10 de riesgo y 2 oficiales adicionales. No existen diez filas de prensa en la entrada. Se verificaron los enlaces `#page` de 20 posiciones (19 destinos distintos); el enlace restante quedó bloqueado en Comuns. Hay dos localizadores incorrectos, seis parciales, dos ambiguos sobre numeración y uno no verificable; el resto se localiza correctamente.

### Conservación del ciego y lectura del CSV

Primero se trabajaron las 125 filas con `partido_grande=sí`, después las 73 restantes. Se cerraron las 198 lecturas antes de abrir `data.json` e `audit/inferidas.csv`; tampoco se abrió `evidence/` ni el contenido del README durante esa fase. El cierre quedó registrado a las **2026-11-15T23:14:36.429945+00:00**, UTC, con SHA-256 del registro de lectura **`6c2ed57c9bc50c72f89e0714e9c862c099f0625c5cd2df90f24a1a36ac54bc77`**. La comparación posterior solo añadió valor asignado, diferencia y severidad. Las comprobaciones posteriores de páginas y las fuentes nuevas se separan expresamente en T2/T3: no se recodificó el ciego para mejorar el acuerdo.

El CSV contiene una fila por ID de la entrada ciega. Las citas son fragmentos literales deliberadamente muy breves; se conservan en el idioma de la fuente. Las tablas de este informe remiten a la celda `cita` de ese mismo ID cuando no la repiten. Las páginas del CSV son las disponibles al cierre ciego: `PDF N` significa índice físico, contado desde 1; `impresa N` significa número dibujado en el documento. Cuando solo se pudo leer texto indexado, se señala que el índice físico no fue verificable. HTML no tiene paginación: se identifica apartado y párrafo.

`no-verificable` conserva vacíos cita y página; también se deja vacío `localizador_ok`, porque no se puede afirmar si está bien o mal. `diferencia` solo se calcula entre dos cifras; nunca se transforma sin posición en 3. La severidad queda vacía para acuerdos y fallos de acceso. Se aplica literalmente la regla pedida a discrepancias: crítica con distancia ≥2 o signo contrario; media con distancia 1 y partido grande; leve al resto. Por eso los 38 desacuerdos categóricos aparecen como leves: esa etiqueta formal **no** significa que puntuar sin evidencia sea irrelevante.

## b) Discrepancias numéricas

La tabla distingue fallos de lectura/localización de elecciones discutibles de criterio. La columna de lectura asignada reproduce el razonamiento de los datos comparados; no es un juicio sobre intenciones del equipo. La cita completa breve y su localización constan en la fila homónima del CSV.

| ID | Asignado → auditor | Distancia | Severidad | Cita y página | Naturaleza | Dos lecturas |
| --- | --- | --- | --- | --- | --- | --- |
| pp-3 | 2 → 4 | 2 | crítica | «excepcional…»; impresa 19; índice PDF no verificable; [D01](#d01); cita íntegra: CSV pp-3 | criterio discutible | Web: Oposición con matices: no elimina el arraigo, lo restringe a casos excepcionales. Auditor: Permite arraigo individual excepcional: apoyo restringido a permitirlo, aunque rechace regularizaciones generales. |
| pp-1 | 5 → 4 | 1 | media | «medias…»; impresa 47; índice PDF no verificable; [D01](#d01); cita íntegra: CSV pp-1 | criterio discutible | Web: Rebajas fiscales. Auditor: Rebaja explícitamente dirigida a rentas medias/bajas y jóvenes; no a toda renta laboral. |
| pp-5 | 4 → 5 | 1 | media | «elevaremos…»; impresa 16-17; índice PDF no verificable; [D01](#d01); cita íntegra: CSV pp-5 | criterio discutible | Web: Endurecimiento explícito pero formulado por delitos concretos, sin una subida general de penas de prisión. Auditor: Aumenta penas por disturbios y otras conductas, sin reserva frente al endurecimiento. |
| pnv-11 | 4 → 5 | 1 | media | «iniciativas…»; PDF 26; impresa 26; contexto PDF 7-8; [D04](#d04); cita íntegra: CSV pnv-11 | lectura/localización | Web: Apoyo con matices: respalda las políticas y el Pacto de Estado sin detallar la legislación específica. Auditor: Compromiso explícito con iniciativas legislativas específicas; el localizador inicial solo aporta parte del fundamento. |
| pacma-18 | 5 → 4 | 1 | leve | «creación…»; PDF 69; impresa 68; [D11](#d11); cita íntegra: CSV pacma-18 | criterio discutible | Web: Propone eliminar trabas burocráticas para crear empresas e iniciar actividades. Auditor: Simplifica trámites al crear empresas e iniciar actividades; apoyo limitado a ese ámbito. |
| fo-7 | 1 → 2 | 1 | leve | «determinadas…»; PDF 56; impresa 56; [D14](#d14); cita íntegra: CSV fo-7 | criterio discutible | Web: Oposición clara a transferir más competencias. Auditor: Recentraliza sanidad, educación y emergencias; rechazo con alcance material explícito. |
| adelante-5 | 2 → 1 | 1 | media | «populismo…»; PDF 94; impresa 94; [D15](#d15); cita íntegra: CSV adelante-5 | criterio discutible | Web: Oposición con matices, centrada en pequeños hurtos. Auditor: Deroga endurecimiento de hurtos y rechaza elevar penas como remedio a la delincuencia. |
| salf-17 | 1 → 2 | 1 | leve | «cinco…»; impresa 19; índice PDF no verificable; [D18](#d18); cita íntegra: CSV salf-17 | criterio discutible | Web: Oposición clara a igualar el acceso de los extranjeros al de los españoles. Auditor: Requisito adicional de residencia y cotización para prestaciones no contributivas, vivienda y alquiler; rechazo limitado a esas prestaciones. |
| salf-18 | 5 → 4 | 1 | leve | «licencia…»; HTML; Compromiso 08, tercer punto; [D17](#d17); cita íntegra: CSV salf-18 | criterio discutible | Web: Licencia de actividad por declaración responsable. Auditor: Licencia en 24 horas por declaración responsable para inicio de actividad. |
| iustitia-12 | 1 → 2 | 1 | leve | «MENOS…»; HTML; apartado 5, título y tercer punto; [D20](#d20); cita íntegra: CSV iustitia-12 | criterio discutible | Web: Propone recuperar soberanía y consultar una eventual salida de la UE. Auditor: Pide menos UE y consulta sobre salida; el resultado se somete a referéndum. |
| d21-12 | 4 → 5 | 1 | leve | «supervisión…»; HTML; medida 01, segundo párrafo; medidas 02-03; [D23](#d23); cita íntegra: CSV d21-12 | criterio discutible | Web: Propone supervisión europea vinculante del Estado de Derecho, mercado de capitales y defensa común; apoyo matizado a reforzar instituciones europeas, sin compromiso federal explícito. Auditor: Mecanismo europeo con supervisión vinculante amplía gobernanza supranacional. |
| frente-amplio-10 | 4 → 5 | 1 | media | «consolidar…»; HTML; apartado Consolidar lo conseguido; párrafo único; [D27](#d27); cita íntegra: CSV frente-amplio-10 | lectura del compromiso de consolidación | Web: Apoya mantener la revalorización con el IPC como logro a consolidar, pero la nota no la formula como propuesta. Auditor: Propone consolidar expresamente la revalorización con el IPC. |
| junts-1 | 4 → 5 | 1 | media | «moderar…»; PDF 57-58; impresas no visibles en extracción; [D37](#d37); cita íntegra: CSV junts-1 | criterio discutible | Web: Propone moderar los impuestos al trabajo y aliviar la presión sobre rentas medias; lo vincula a una reforma fiscal redistributiva. Auditor: Modera fiscalidad del trabajo, revisa tipos excesivos y deflacta escalas. |
| junts-6 | 4 → 5 | 1 | media | «costos…»; PDF 114; impresa no visible; [D37](#d37); cita íntegra: CSV junts-6 | criterio discutible | Web: Acepta y quiere actualizar los conciertos; no propone mantener la financiación «donde exista demanda» con esas palabras. Auditor: Actualiza financiación de módulos concertados a costes reales. |
| junts-11 | 4 → 5 | 1 | media | «legislació…»; PDF 111; impresa no visible; [D37](#d37); cita íntegra: CSV junts-11 | lectura y alcance legislativo | Web: Apoyo a reforzar la actuación específica contra la violencia machista; no habla de mantener la ley integral. Auditor: Introduce una regla procesal específica para violencia machista; localizador 110 remite sobre todo a introducción. |
| junts-18 | 5 → 4 | 1 | media | «simplificació…»; PDF 83; impresa no visible; [D37](#d37); cita íntegra: CSV junts-18 | criterio discutible | Web: Propone simplificar permisos y trámites empresariales y potenciar la declaración responsable. Auditor: Rebaja dirigida expresamente a pymes y autónomos; localizador 84 desplaza el comienzo del pasaje. |


**pp-3, explicación de la crítica:** la afirmación pregunta si se permite el arraigo. Mi 4 interpreta que la vía individual excepcional sigue permitida, con una limitación expresa. El 2 asignado evalúa la restricción respecto al régimen actual. Ambas lecturas tienen lógica; responden a bases de comparación distintas. Es una discrepancia crítica de signo según la escala, **no una prueba de falsedad del documento ni un error inequívoco de lectura**. En T3 se confirmó físicamente la página 19, medida 42.

En educación, Junts-6 también admite discusión: actualizar los módulos de conciertos acredita financiación, pero el texto no replica la cláusula de demanda. Mi lectura ciega lo consideró apoyo; un umbral todavía más literal podría dejarlo sin posición. En prisión se aplicó el mismo criterio a PP y ERC: seleccionar tipos delictivos no equivale automáticamente a expresar reservas ante el endurecimiento. Se hace explícito este criterio para que el revisor pueda discrepar.

## c) Sin posición frente a cifras asignadas

En estos 38 casos la cita localizada no basta para responder a la afirmación exacta, o no se admite atribuirla al sujeto electoral evaluado. `Sin-posicion` se refiere a **la evidencia auditada**, no a que el partido carezca de cualquier posición en todas sus publicaciones. No se transforma la afinidad temática en neutralidad. Las citas literales se encuentran en el CSV bajo el ID indicado.

| ID / cita en CSV | Asignado | Fuente y página | Motivo de la diferencia |
| --- | --- | --- | --- |
| pp-7 | 2 | [D01](#d01); impresa 15 y 25; índice PDF no verificable | Rechaza cesiones exclusivas por investidura y evalúa transferencias por igualdad; no formula una posición general sobre transferir más competencias. |
| pp-11 | 5 | [D01](#d01); impresa 17; índice PDF no verificable | El pasaje garantiza medios, dispositivos y coordinación; no declara mantener legislación específica. |
| pp-12 | 4 | [D01](#d01); impresa 55-56; índice PDF no verificable | Refuerzo de influencia, mercado y cooperación; no concreta mayor integración política ni cesión institucional. |
| pp-13 | 5 | [D01](#d01); impresa 21-22; índice PDF no verificable | Más efectivos y modernización pueden aumentar partidas, pero no declaran aumentar el gasto público total en defensa. |
| pp-17 | 2 | [D01](#d01); impresa 19; índice PDF no verificable | Condición de ayudas no urgentes y de residencia; no responde a igualdad de requisitos económicos para residentes extranjeros. |
| vox-2 | 1 | [D02](#d02); HTML; área 5 | Derogar la Ley de Vivienda no explicita aquí una posición sobre regulación de precios en zonas tensionadas. |
| vox-6 | 4 | [D03](#d03); impresa 41-42; índice PDF no verificable | Libre elección sin barreras económicas; no declara financiación de conciertos por demanda. |
| vox-11 | 1 | [D02](#d02); HTML; área 6 | No identifica qué legislación específica se sustituye: calificarla por reputación sería inferir. |
| vox-13 | 4 | [D03](#d03); impresa 45; índice PDF no verificable | Dotación suficiente en 79/83 no equivale a aumentar gasto total de defensa; la subida de 84 es policial. |
| vox-15 | 1 | [D03](#d03); impresa 52; índice PDF no verificable | Defensa de la vida desde la concepción y objeción de conciencia; no formula mantenimiento o derogación del derecho legal al aborto. |
| pnv-3 | 4 | [D04](#d04); PDF 34; impresa 34 | Exime del proceso de arraigo con contrato; no declara permitir regularización por esa vía para los demás. |
| bng-3 | 5 | [D06](#d06); PDF 22-23; impresas 22-23 | Regularización genérica y facilitación de procedimientos; no especifica el arraigo. |
| cc-10 | 5 | [D08](#d08); HTML; 26/02/2026; párrafos 1 y 6 | La declaración apoya revalorización pero es de CC, no de la coalición Municipalistas-CC; se aplica la regla de no herencia. |
| cc-11 | 5 | [D07](#d07); medida 17; página física e impresa no recuperadas | Financia Pacto de Estado y prevención; no declara mantenimiento de legislación específica. |
| erc-3 | 4 | [D10](#d10); PDF 41; impresa 40 | Nuevas vías y regularización extraordinaria; no especifica la vía de arraigo. |
| pacma-9 | 1 | [D11](#d11); PDF 34; impresa 33 | Crítica al modelo fósil-nuclear; no declara aquí cierre ni mantenimiento de la nuclear en el sistema. |
| mj-3 | 5 | [D12](#d12); PDF 30 y 52; impresas 30 y 52 | Regularización de quienes viven y trabajan; no especifica regularización por arraigo. |
| mj-4 | 1 | [D12](#d12); PDF 37-38; impresas 37-38 | Refuerza universalidad e inversión pública, sin pronunciarse sobre ampliar colaboración privada. |
| mj-10 | 4 | [D12](#d12); PDF 24; impresa 24 | Protege poder adquisitivo sin fijar el IPC como mecanismo de actualización. |
| mj-17 | 4 | [D12](#d12); PDF 52; impresa 52 | Acceso a servicios sociales y otros derechos, sin explicitar igualdad de requisitos económicos de prestaciones. |
| fejons-1 | 5 | [D13](#d13); impresa 26-27; índice PDF no verificable | Rebaja a empresas/autónomos e impuestos sobre bienes; no formula rebaja sobre rentas del trabajo asalariado. |
| fo-11 | 1 | [D14](#d14); PDF 32; impresa 32; contexto PDF 31 | Deroga parcial o totalmente leyes de discriminación positiva; no identifica la ley específica contra violencia de género. |
| adelante-3 | 5 | [D15](#d15); PDF 28 y 106; impresas 28 y 106 | Regularización extraordinaria y nueva ley; no explicita la vía de arraigo. |
| geroabai-11 | 4 | [D16](#d16); HTML indexado; La pluralidad como eje de la convivencia; segundo párrafo | Protege mujeres víctimas de violencia machista, sin declarar mantenimiento de legislación específica. |
| salf-12 | 2 | [D17](#d17); HTML; Compromiso 10, primer punto | Renegociación y referéndum de salida condicionado no fijan por sí mismos postura sobre mayor integración política. |
| salf-13 | 4 | [D18](#d18); impresa 37-38; índice PDF no verificable | Nuevos efectivos y salarios se financian dentro del 2% del PIB; no promete subir el gasto total. |
| humanista-3 | 5 | [D19](#d19); sección 7, propuesta 2; página física no recuperada | Regularización extraordinaria inmediata, sin precisar mantenimiento o reforma de la vía de arraigo. |
| d21-11 | 5 | [D22](#d22); HTML; medida 01, segundo párrafo | Evita desmantelar red de protección; no declara mantener legislación específica de violencia de género. |
| podemos-3 | 5 | [D29](#d29); HTML; cuerpo, párrafo inicial | Regularización extraordinaria no acredita por sí sola postura sobre la vía de arraigo. |
| compromis-6 | 2 | [D34](#d34); PDF 2; impresa 1 | Programa de otra composición electoral de 2023; no se atribuye automáticamente a Compromís-Front Valencià de 2026. |
| junts-10 | 4 | [D37](#d37); PDF 100; impresa no visible | Protege poder adquisitivo y propone variable territorial de coste de vida; no especifica actualización conforme al IPC. |
| ehbildu-11 | 4 | [D40](#d40); PDF 10; impresa no visible | Defiende avances y lucha contra violencia machista, sin mencionar legislación específica. |
| ehbildu-17 | 4 | [D40](#d40); PDF 11; impresa no visible | Acceso a servicios básicos no equivale a prestaciones económicas con iguales requisitos. |
| pcte-13 | 1 | [D41](#d41); PDF 18-19; impresa no visible | Describe subida del gasto, salida OTAN y fin de misiones; no exige aumentar ni reducir presupuesto total. |
| comuns-2 | 5 | [D42](#d42); PDF 81; impresa 81; identificación PDF 84 | Texto de En Comú Podem-Sumar 2023; no se traslada a Comuns-Front Ampli 2026 sin adopción propia. |
| comuns-6 | 1 | [D42](#d42); PDF 84; impresa 84 | El propio pasaje se atribuye a En Comú Podem-Sumar, entidad distinta de la candidatura auditada. |
| comuns-8 | 5 | [D42](#d42); PDF 30; impresa 30; identificación PDF 84 | La jornada máxima está en PDF 30, no 19; además no hay adopción por la coalición 2026. |
| comuns-12 | 5 | [D42](#d42); PDF 160-161; impresa 160-161; identificación PDF 84 | Antecedente de otra coalición; no se hereda posición por continuidad de marcas. |


**Sentido inverso:** no se observaron cifras ciegas frente a valores asignados sin posición porque las 198 filas seleccionadas ya tenían cifra puntuable. El archivo ciego no permite estimar ese error inverso. En el corte hay 336 posiciones almacenadas, 333 puntuables, 3 excluidas con `scoreable:false` y 96 casillas sin posición almacenada entre 24 partidos × 18 temas. Las tres exclusiones —mj-15, salf-3 y pacma-6— no forman parte de esta doble codificación. No se presentan como validaciones a ciegas.

### Las 35 filas no verificables al cierre ciego

| Fuente | IDs | N.º | Límite de acceso y comprobaciones posteriores |
| --- | --- | --- | --- |
| [D09](#d09) | erc-1, erc-4, erc-7, erc-8, erc-10, erc-11, erc-12, erc-14, erc-18 | 9 | Apertura de la URL original: HTTP 403; no se leyó el documento de esa URL. En T2 se recuperó otra copia de programa de ERC 2026; no se trasladó retrospectivamente a la lectura de esta URL. |
| [D25](#d25) | frente-amplio-2, frente-amplio-6, frente-amplio-8, frente-amplio-11, frente-amplio-12, frente-amplio-15, frente-amplio-18 | 7 | URL original no accesible; la búsqueda recupera otro nombre de archivo, sin poder acreditar identidad binaria. |
| [D30](#d30) | podemos-4, podemos-8, podemos-9, podemos-10, podemos-11, podemos-12 | 6 | URL original no accesible; se encontró copia en Podemos pero no se acreditó identidad del archivo enlazado. |
| [D32](#d32) | podemos-15 | 1 | HTTP 403 en apertura; sin lectura del contenido de la página. |
| [D35](#d35) | compromis-8 | 1 | URL no accesible; búsqueda exacta sin pasaje recuperado. |
| [D39](#d39) | psoe-1, psoe-2, psoe-4, psoe-8, psoe-9, psoe-10, psoe-11, psoe-12, psoe-13, psoe-15, psoe-18 | 11 | URL original no accesible; la búsqueda devuelve PROGRAMAPSOE29N26.pdf, otra URL cuya identidad no se ha comprobado. En T3 Chrome abrió la URL original y su página 49 para psoe-1; se mantiene el estado ciego del CSV. |


No se considera que un PDF de otro nombre sea idéntico sin comprobarlo. Los errores de tamaño, 403 y fallos del extractor describen este acceso, no demuestran inexistencia del documento. En Podemos y Frente Amplio se encontraron alternativas, pero no se estableció identidad binaria con la URL pedida en T1.

## d) Tarea 2 · Las 135 inferidas, por partido

Se revisaron documentos propios actuales, antecedentes y declaraciones, buscando el objeto de cada afirmación. Cuando la fuente encontrada responde, `documentada` significa que hay base para sustituir la inferencia **en una revisión futura de datos**; aquí solo se informa. Se conservan año y ámbito de antecedentes. Una declaración del propio partido en 2026 se identifica como tal, sin presentarla como programa electoral. Las pistas de terceros y fragmentos de índice que no se pudieron leer íntegramente no se cuentan como evidencia cerrada.

Para las restantes filas, el dictamen juzga la razón de la inferencia, no demuestra que no exista una fuente en ningún lugar. `Plausible` reconoce una dirección compatible con los indicios; `discutible` identifica un salto relevante; `no sostenible` señala que la premisa no responde, introduce un 3 desconocido o hereda una posición prohibida. En esta aplicación estricta, ninguna de esas tres etiquetas autoriza por sí sola puntuar sin el texto concreto. `∅` significa que no se obtuvo una cita propia suficiente: el motivo es evaluación lógica de la razón recibida, **no evidencia documental de una posición contraria**.

| Dictamen | Filas | Cifra alternativa cerrada | Recomiendo sin posición |
| --- | --- | --- | --- |
| documentada | 20 | 20 | 0 |
| plausible | 21 | 0 | 21 |
| discutible | 36 | 0 | 36 |
| no sostenible | 58 | 0 | 58 |


**Cinco críticas adicionales, separadas de T1:** `erc-5` (1 → 5, Δ4), `fejons-18` (2 → 4, Δ2), `adelante-18` (2 → 4, Δ2), `compromis-18` (2 → 4, Δ2), `ehbildu-18` (2 → 4, Δ2). La discrepancia sobre trámites de vivienda de Falange depende de aceptar un apoyo sectorial como respuesta, igual que en cc-18; no se presenta como contradicción empresarial universal. Las de Compromís y EH Bildu sí hablan expresamente de pymes, actividad económica y trámites.

### Partido Popular · 4 filas

Programa 2026 [D01](#d01); programa propio 2023 y declaración de Bravo de 2025. Se revisaron sanidad, jornada, jefatura del Estado y aborto.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| pp-4 | 4 | plausible | sin-posicion | sí | ∅; Sanidad, pp. impresas 52–53; revisión textual, no prueba de ausencia; [D01](#d01) | La práctica autonómica invocada hace plausible la dirección, pero no acredita una propuesta estatal de AMPLIAR conciertos; tampoco justifica el matiz 4. No se localizó un compromiso propio suficiente en los textos revisados. |
| pp-8 | 2 | documentada | 2 | no | «gradualidad, flexibilidad y compensaciones»; HTML, 10/09/2025, lista de declaraciones: párrafo sobre el Consejo Económico y Social; [N01](#n01) | La declaración propia rechaza esta reducción por ley y propone una vía negociada, gradual y con compensaciones. Sustituye la inferencia por antecedente de 2025; matiz expreso. |
| pp-14 | 1 | documentada | 1 | no | «monarquía»; PDF 8, introducción; [D01](#d01) | La introducción reivindica positivamente el orden institucional que incluye la monarquía y llama a recuperarlo, sin proponer sustituirlo. Lectura contextual de apoyo a su continuidad, de confianza media, no una frase literal contra la república. |
| pp-15 | 4 | documentada | 4 | no | «INTRODUCIREMOS»; impresa 45, medida 129; índice físico no verificado; [N02](#n02) | El programa de 2023 propone modificar el consentimiento para menores dentro de la legislación de interrupción del embarazo: continuidad con una restricción explícita. No se presenta como compromiso nuevo de 2026. |



### VOX · 5 filas

Programa y resumen oficiales 2026 [D03](#d03) y [D02](#d02); declaración propia de jornada de 2025. Se distinguieron competencias, presupuesto, IPC y protección de símbolos.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| vox-7 | 1 | plausible | sin-posicion | sí | ∅; revisión de economía, educación y marco institucional; [D03](#d03) | El rechazo al modelo autonómico sería pertinente si se aportara la medida concreta. La razón remite genéricamente a dos programas; las medidas temáticas revisadas no bastan para verificar una recuperación general de competencias. No se valida por reputación. |
| vox-8 | 2 | documentada | 1 | no | «trampa»; HTML, 10/09/2025, párrafos del proyecto y pymes; [N03](#n03) | La comunicación propia defiende devolver la ley y la rechaza sin formular una reducción legal alternativa ni un matiz favorable a la afirmación. La mera existencia de convenios más cortos no justifica 2. Antecedente 2025. |
| vox-10 | 4 | no sostenible | sin-posicion | sí | ∅; impresas 10–11, medida 7; [D03](#d03) | Garantizar sostenibilidad de las pensiones no determina indexarlas al IPC. La propia razón admite que falta ese texto; no existe base para 4. |
| vox-12 | 1 | discutible | sin-posicion | sí | ∅; HTML, apartado 7, sector primario; [D02](#d02) | Rechazar obligaciones sectoriales de Bruselas no responde por sí solo a ampliar poderes políticos comunes. No se verificó en lo leído la recuperación general de competencias alegada. |
| vox-14 | 1 | plausible | sin-posicion | sí | «Corona»; impresa 56, medida 105; [D03](#d03) | Proteger penalmente la Corona hace plausible la continuidad monárquica, pero la medida protege símbolos y no declara la alternativa institucional preguntada. Con el umbral literal solicitado no doy por acreditado el 1. |



### EAJ-PNV · 12 filas

Programa 2026 [D05](#d05) y antecedente 2023 [D04](#d04); búsqueda parlamentaria de jornada. Fiscalidad, vivienda, sanidad, educación, reincidencia, energía, Europa y prestaciones no se equipararon por proximidad.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| pnv-1 | 3 | no sostenible | sin-posicion | sí | ∅; Fiscalidad, PDF 20–21; [D05](#d05) | Ser de centro y defender la fiscalidad foral no es una posición intermedia declarada sobre bajar impuestos al trabajo. |
| pnv-2 | 3 | no sostenible | sin-posicion | sí | ∅; Vivienda, PDF 6–7; [D05](#d05) | Regular modalidades de alquiler no declara un punto medio sobre topar precios. La razón reconoce esa diferencia de objeto. |
| pnv-4 | 3 | no sostenible | sin-posicion | sí | ∅; Sanidad, revisión del apartado; [D05](#d05) | Aceptar un modelo mixto no responde a ampliarlo y no acredita una posición intermedia explícita. Falta evidencia específica. |
| pnv-5 | 3 | no sostenible | sin-posicion | sí | «proporcionada»; PDF 24, medida 05 de respuesta a reincidencia; [D05](#d05) | Respuesta judicial ágil y proporcionada no fija duración de prisión ni un término medio declarado. El 3 rellena una falta de información. |
| pnv-6 | 4 | plausible | sin-posicion | sí | ∅; Educación; búsqueda de conciertos y concertada; [D05](#d05) | La defensa alegada de ambas redes es compatible con mantener conciertos, pero no se encontró en el programa actual la regla de financiación según demanda ni el matiz de 4. |
| pnv-8 | 4 | plausible | sin-posicion | sí | ∅; búsqueda de jornada y debate del 10/09/2025; [D05](#d05) | La dirección es plausible. Se localizaron referencias a su apoyo parlamentario de 2025 y una entrevista sobre adaptación de pequeños negocios, pero no se pudo leer el debate primario completo que permita verificar también salario y matiz. No se cuenta como evidencia cerrada. |
| pnv-9 | 2 | no sostenible | sin-posicion | sí | ∅; Transición energética; búsqueda de nuclear; [D05](#d05) | Apoyar renovables y no promover prórrogas no expresa oposición matizada a mantener nuclear. No se halló el pronunciamiento específico. |
| pnv-12 | 4 | discutible | sin-posicion | sí | ∅; PDF 40–41, apartado 5.5; [D05](#d05) | La representación vasca en Europa y una UE más social no especifican transferir más poder político común. Europeísmo genérico no justifica 4. |
| pnv-13 | 4 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Apoyar Ucrania o capacidades europeas no implica aumentar el total del presupuesto español de defensa ni determina un 4. No se recuperó la condición presupuestaria concreta. |
| pnv-14 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Reformar delitos contra la Corona no equivale a sustituir la jefatura del Estado por una república; tampoco neutralidad institucional autoriza 2. |
| pnv-16 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Más controles anticorrupción no responde a prohibir específicamente los indultos. No se encontró esa prohibición propia. |
| pnv-17 | 4 | no sostenible | sin-posicion | sí | ∅; PDF 5, introducción sobre IMV; [D04](#d04) | La administración vasca del IMV no determina la igualdad de requisitos económicos entre nacionalidades. Son dos decisiones diferentes. |



### BNG · 8 filas

Programa 2026 [D06](#d06): educación, política energética, feminismo, inmigración, fiscalidad y ciencia. La pista parlamentaria sobre aborto no llegó a lectura íntegra.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| bng-6 | 2 | documentada | 1 | no | «supresión»; PDF 35, educación; [D06](#d06) | El texto propio va más allá de priorizar la pública: propone suprimir conciertos en todos los niveles. El 2 reduce una oposición explícita sin que se exprese una excepción de mantenimiento. |
| bng-9 | 1 | discutible | sin-posicion | sí | ∅; apartado energético, PDF 53–58; [D06](#d06) | Oponerse a un almacén de residuos y apoyar renovables no permite deducir el cierre o exclusión de todas las centrales. No se halló una formulación suficiente sobre el mix. |
| bng-12 | 2 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Soberanía gallega y crítica a políticas de la UE no determinan rechazar mayor integración política. El matiz 2 no está explicitado en la razón. |
| bng-14 | 5 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | República de Galiza y crítica a corrupción monárquica no son automáticamente una propuesta de sustituir la monarquía española. Falta el compromiso exacto, sin presuponerlo por republicanismo territorial. |
| bng-15 | 5 | plausible | sin-posicion | sí | ∅; apartado 2.6; búsqueda de aborto e interrupción; [D06](#d06) | La dirección es plausible, pero políticas feministas y derecho a decidir genérico no bastan. Se encontró una pista de intervención parlamentaria de abril de 2026, sin lectura completa del original ni comprobación de página; no se usa como prueba. |
| bng-16 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Reforzar controles anticorrupción no declara prohibición de indultos a condenados por corrupción. |
| bng-17 | 4 | discutible | sin-posicion | sí | ∅; PDF 22–23, migración; [D06](#d06) | Garantías generales de derechos y no discriminación no especifican las condiciones económicas de prestaciones para residentes extranjeros. |
| bng-18 | 2 | no sostenible | sin-posicion | sí | ∅; PDF 53, ciencia; PDF 15, relaciones laborales; [D06](#d06) | La protección laboral no implica oponerse a reducir trámites empresariales. La propuesta de simplificar burocracia científica tampoco responde a empresas en general. No se acredita 2. |



### Municipalistas Primero Canarias–Coalición Canaria · 13 filas

Programa conjunto 2026 [D07](#d07); la introducción identifica a ambas formaciones. La página europea propia de CC sirve para contrastar una premisa sobre el PPE; no para heredar ideología al conjunto.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| cc-2 | 2 | no sostenible | sin-posicion | sí | ∅; PDF 11, medida 24; [D07](#d07) | Protección estable de arrendadores e inquilinos no dice si se regulan precios. La razón admite el vacío; no justifica un 2. |
| cc-3 | 3 | no sostenible | sin-posicion | sí | ∅; medidas competenciales; sin pasaje específico; [D07](#d07) | Autorizaciones de trabajo y competencias estatutarias no fijan regularización por arraigo ni una posición intermedia. |
| cc-4 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Etiqueta de centro-derecha y aceptación de un modelo mixto no acreditan ampliarlo con fondos públicos; además no deben heredarse a la coalición. |
| cc-5 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Políticas de seguridad convencionales y etiqueta ideológica no prueban endurecimiento de prisión ni un matiz explícito. |
| cc-6 | 4 | plausible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Aceptar concertada es compatible con mantenerla, pero no se aportó texto de la coalición sobre demanda ni el matiz 4. No basta el perfil ideológico. |
| cc-8 | 2 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | La preferencia negociadora se afirma sin pasaje propio. No se leyó una posición de la coalición que responda al máximo legal sin rebaja salarial. |
| cc-9 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Ausencia de centrales en Canarias y apoyo renovable no fijan su posición sobre el sistema eléctrico español. |
| cc-12 | 4 | no sostenible | sin-posicion | sí | «Partido Demócrata Europeo»; HTML, apartado CEUS, párrafo final; modificación 18/12/2024; [N04](#n04) | La premisa sobre el PPE no se sostiene: la web propia de CC identifica el PDE. Aun corrigiendo esa premisa, pertenecer a una familia europea no determina este valor ni se transfiere a la coalición. |
| cc-13 | 4 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Compromiso con OTAN no equivale a aumentar presupuesto y la razón no ofrece una declaración de la coalición ni su condición para 4. |
| cc-14 | 1 | plausible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | La continuidad de la Corona es plausible en CC, pero no se halló una declaración de la coalición actual que responda a sustituir el régimen. No se hereda del miembro. |
| cc-15 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | No proponer derogación no prueba apoyar el mantenimiento del derecho, y mucho menos el matiz 4. |
| cc-16 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Más control de corrupción no es prohibir indultos para ese delito. |
| cc-17 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Presión migratoria y quién gestiona ayudas no determinan igualdad de requisitos económicos de residentes legales frente a españoles. |



### Esquerra Republicana de Catalunya · 5 filas

Programa 2026, copia alojada en betevé [N05](#n05); programa 2023 [D10](#d10) y búsquedas parlamentarias. Se conserva la diferencia entre regularización general, arraigo y prestaciones.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| erc-5 | 1 | documentada | 5 | no | «incrementar-ne les penes»; PDF e impresa 43, propuesta 243; [N05](#n05) | La propuesta 243 pide aumentar penas para delitos con armas y robo de cable. Contradice la inferencia de oposición total. Se codifica la dirección del endurecimiento; seleccionar tipos delictivos no constituye por sí solo una reserva al principio. |
| erc-6 | 2 | discutible | sin-posicion | sí | ∅; apartado educativo; revisión textual; [N05](#n05) | Una escuela pública, laica y gratuita no expresa suprimir financiación concertada donde exista demanda ni el grado de oposición 2. |
| erc-9 | 1 | plausible | sin-posicion | sí | ∅; búsqueda de nuclear y de cierre; [N05](#n05) | La pista sobre transición y cierre es pertinente, pero no se encontró en el programa recuperado la formulación nuclear específica. Apareció un antecedente parlamentario de 2018 cuya versión completa no se leyó; no se acredita el 1. |
| erc-16 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Sanciones y controles anticorrupción no prueban prohibición de indultos por corrupción. |
| erc-17 | 4 | discutible | sin-posicion | sí | ∅; PDF 41–45, migración; [D10](#d10) | Empadronamiento y derechos generales no resuelven igualdad de los requisitos económicos de cada prestación frente a españoles. |



### Falange Española de las JONS · 2 filas

Programa 2026 [D13](#d13): vivienda y justicia. T2 permitió confirmar visualmente PDF 15 / impresa 13.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| fejons-16 | 4 | discutible | sin-posicion | sí | «revisión»; capítulo de justicia, punto sobre indulto; página física no cerrada; [D13](#d13) | Revisar el derecho de indulto y criticar su uso no equivale a prohibirlo específicamente por corrupción. No hay fundamento para el 4. |
| fejons-18 | 2 | documentada | 4 | no | «agilización»; PDF 15, impresa 13, punto 2.10; [D13](#d13) | Propone agilizar trámites de vivienda. Es apoyo sectorial, no rechazo por intervencionismo. Uso el mismo criterio sectorial aplicado a CC-18. Si se exige mención literal a empresas, este pasaje sería insuficiente; la discrepancia es de alcance, además del error de inferir por ideología. |



### Frente Obrero · 6 filas

Programa propio [D14](#d14): vivienda, juventud/narcotráfico, pensiones, natalidad y economía. Se distingue pena alta de aumento respecto a la vigente.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| fo-2 | 4 | discutible | sin-posicion | sí | ∅; apartado de vivienda; [D14](#d14) | Más parque público y combatir especulación no fijan topes de alquiler en zonas tensionadas. |
| fo-5 | 4 | discutible | sin-posicion | sí | «altas penas»; PDF 29, impresa 29; también PDF 53, medida 2; [D14](#d14) | Pide penas de cárcel altas contra narcotráfico y tráfico de personas, pero no afirma aumentarlas respecto de las vigentes. Con el umbral comparativo usado también en defensa no cierro una cifra. Si se leyera como compromiso de endurecimiento, la dirección sería favorable, sin reserva que justifique 4. |
| fo-8 | 4 | discutible | sin-posicion | sí | «flexibles parcialmente»; PDF 35, medida 3 de natalidad; [D14](#d14) | La reducción para conciliar con hijos no determina reducir el máximo legal general sin rebaja salarial. |
| fo-10 | 4 | no sostenible | sin-posicion | sí | ∅; apartado de pensiones; [D14](#d14) | Subir mínimas y cambiar la edad de jubilación no acredita indexación al IPC ni el matiz 4. |
| fo-15 | 1 | no sostenible | sin-posicion | sí | ∅; PDF 34–35, natalidad; [D14](#d14) | Defender natalidad y no mencionar aborto no permite atribuir oposición a su derecho legal. |
| fo-18 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Control público y crítica al capitalismo no expresan oposición a simplificar obligaciones administrativas empresariales. |



### Adelante Andalucía · 5 filas

Programa 2026 [D15](#d15): energía, migración, campo y derechos. La simplificación de pequeñas explotaciones se comprobó en PDF 68.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| adelante-9 | 1 | discutible | sin-posicion | sí | ∅; apartado energético, revisión de referencias nucleares; [D15](#d15) | No se verificó una propuesta de excluir la nuclear del mix. Suprimir ayudas a nucleares o financiar renovables no basta para el 1. |
| adelante-12 | 3 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Europeísmo crítico no es una posición intermedia declarada sobre mayor integración política; el 3 se usa sin evidencia suficiente. |
| adelante-14 | 5 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | La razón atribuye ideología de Podemos e IU a otra candidatura. Incumple la prohibición de heredar posiciones; no se verificó compromiso propio sobre sustituir la monarquía española. |
| adelante-17 | 5 | discutible | sin-posicion | sí | ∅; apartado de migración; [D15](#d15) | Derogar extranjería y regularizar no resuelve por sí solo los requisitos económicos de prestaciones de residentes extranjeros. |
| adelante-18 | 2 | documentada | 4 | no | «Venta directa»; PDF e impresa 68, propuestas 324 y 326; [D15](#d15) | La propuesta 324 simplifica venta directa y transformación para pequeñas explotaciones; 326 reduce burocracia agroecológica. Es apoyo sectorial explícito, compatible con su intervención económica. El 2 deducido de supermercados públicos invierte esa dirección. |



### Frente Amplio · 9 filas

Web de campaña y página de propuestas [N06](#n06). Se siguió su enlace a programa completo: anunciaba PDF pendiente. No se asumió que el programa de Sumar 2023 hubiera sido adoptado por la coalición actual.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| frente-amplio-1 | 4 | no sostenible | sin-posicion | sí | ∅; HTML, Impuestos; PDF anunciado como no disponible; [N06](#n06) | La razón descansa en un programa 2023 de otra coalición. Las propuestas actuales propias localizadas gravan grandes patrimonios y sociedades; no establecen bajar impuestos al trabajo. |
| frente-amplio-3 | 5 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Su espacio no es una atribución válida a la coalición; además regularización extraordinaria no es arraigo individual. No se recuperó compromiso propio sobre esa vía. |
| frente-amplio-4 | 1 | no sostenible | sin-posicion | sí | ∅; medidas publicadas; [N06](#n06) | El programa histórico de Sumar no se hereda a Frente Amplio; no se localizó adopción explícita ni texto actual suficiente sobre ampliar conciertos. |
| frente-amplio-5 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Priorizar reinserción y derogar PPR serían pertinentes, pero se atribuyen desde otro programa de coalición de 2023 sin adopción probada. |
| frente-amplio-7 | 4 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Plurinacionalidad y financiación no dicen qué competencias transferir ni justifican el matiz 4. Falta posición directa propia. |
| frente-amplio-13 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Autonomía europea no subordinada a industria de armamento no determina el total del gasto, y procede de otra coalición histórica. |
| frente-amplio-14 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | La ideología de partidos miembros no se atribuye automáticamente a la coalición. La razón admite que no es compromiso de programa. |
| frente-amplio-16 | 3 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Nueva ley de indultos por interés público no declara un término medio ante la prohibición por corrupción; además hay atribución histórica no probada. |
| frente-amplio-17 | 5 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Una ayuda a familias irregulares con hijos no equivale a igualdad de requisitos para todos los residentes; tampoco se hereda el programa Sumar 2023. |



### Podemos · 8 filas

Programa propio europeo de 2024 [N07](#n07), catálogo de medidas y búsquedas de documento político estatal. No se usaron una federación territorial, otra coalición ni páginas comparadoras como sustituto de texto estatal propio.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| podemos-1 | 4 | plausible | sin-posicion | sí | ∅; Europeas 2024; búsqueda de fiscalidad; [N07](#n07) | La redistribución alegada es compatible con aliviar rentas bajas, pero no se localizó en el documento propio revisado una rebaja específica de impuestos al trabajo con el matiz asignado. |
| podemos-5 | 1 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | La oposición a PPR es un antecedente plausible, pero no se consiguió texto propio completo y fechado que responda al conjunto de la afirmación. No se valida por tradición política. |
| podemos-6 | 1 | discutible | sin-posicion | sí | ∅; Europeas 2024, apartado educativo; [N07](#n07) | Las propuestas propias localizadas contra conciertos se refieren a centros segregadores; no equivalen a abolir toda concertada donde exista demanda. El 1 requiere evidencia más amplia. |
| podemos-7 | 5 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Plurinacionalidad y autodeterminación no determinan por sí solas más transferencias dentro del modelo autonómico. No se leyó el documento político 2025 completo al que remiten fuentes secundarias. |
| podemos-14 | 5 | plausible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Se encontraron indicios explícitos de republicanismo en una federación territorial, excluida por la regla de no herencia. La búsqueda estatal no produjo un texto completo y localizado que se use aquí como prueba; no se certifica 5. |
| podemos-16 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Sanciones e incompatibilidades por corrupción no declaran prohibir indultos por corrupción. |
| podemos-17 | 5 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Igualdad general de derechos y el lema invocado no explicitan igualdad de requisitos económicos en prestaciones concretas. |
| podemos-18 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Intervención y regulación económica no implican oponerse a eliminar trámites. Falta respuesta a la carga administrativa empresarial. |



### Compromís: Front Valencià · 14 filas

Se encontró programa inequívoco de la coalición actual [N08](#n08), distinto del documento de 2023 de la entrada ciega. Se verificaron en Chrome las páginas 9, 18, 21, 30, 59, 62 y 63. Los hallazgos no reabren compromis-6 de T1.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| compromis-1 | 4 | documentada | 4 | no | «Deflactarem»; PDF 18, Fiscalitat; [N08](#n08) | Deflacta IRPF para rentas inferiores a 30.000 euros: alivio limitado expresamente a rentas bajas. Sustituye la deducción ideológica y conserva el valor. |
| compromis-3 | 5 | discutible | sin-posicion | sí | «Regularitzarem»; PDF 64, Solidaritat global i migració; [N08](#n08) | El programa actual pide vías de regularización y documentación, pero no identifica arraigo individual. No convierto la regularización genérica en respuesta exacta. |
| compromis-4 | 1 | documentada | 1 | no | «impedirem la mercantilització»; PDF 9, Sanitat; [N08](#n08) | El programa de la coalición impide mercantilización y privatización de gestión sanitaria; propone derogar su habilitación. Responde directamente a ampliar colaboración privada con fondos públicos. |
| compromis-5 | 2 | discutible | sin-posicion | sí | «resposta penal proporcionada»; apartado Violències masclistes, pp. 53–54 según índice; posición del pasaje no cerrada; [N08](#n08) | Respuesta penal proporcionada a violencia machista no establece oposición general a penas mayores, ni una posición 2 sobre la afirmación. |
| compromis-7 | 5 | documentada | 5 | no | «traspàs»; PDF 59–60, Model d’Estat; [N08](#n08) | Propone transferencias enumeradas a la Generalitat, con medios económicos y humanos; esa dotación no constituye una reserva a ampliar competencias. |
| compromis-9 | 1 | documentada | 1 | no | «cap nova pròrroga»; PDF 30, energía; [N08](#n08) | El programa mantiene calendario de cierre nuclear y rechaza nuevas prórrogas: oposición explícita a su mantenimiento en el sistema a largo plazo. |
| compromis-10 | 5 | discutible | sin-posicion | sí | «cost de la vida»; Pensions, impresa/índice 8; índice físico no comprobado en esta búsqueda; [N08](#n08) | Garantiza revalorizar según coste de vida, sin nombrar IPC ni su mecanismo. El 5 es defendible si se equiparan ambos, pero esa equivalencia no se acredita bajo lectura estricta. |
| compromis-11 | 5 | plausible | sin-posicion | sí | «jutjats»; Violències masclistes, pp. de índice 53–54; localización física no cerrada; [N08](#n08) | Refuerza juzgados y respuesta contra violencia machista, pero no se recuperó una declaración explícita sobre mantener legislación específica. Las medidas operativas no resuelven esa distinción. |
| compromis-12 | 4 | documentada | 5 | no | «més poder»; PDF 63, Unió Europea; [N08](#n08) | Pide reformar tratados para dar poder al Parlamento Europeo y superar unanimidad en política exterior y fiscal. Mayor integración política explícita; crítica a austeridad no es reserva al principio preguntado. |
| compromis-13 | 1 | documentada | 2 | no | «a costa de»; PDF 62, Política exterior i defensa; [N08](#n08) | Rechaza aumentos cuando recorten servicios e infraestructuras; no declara rechazar todo aumento. La restricción está expresada y permite una oposición condicionada 2, frente al 1 absoluto. |
| compromis-14 | 4 | plausible | sin-posicion | sí | ∅; PDF 59–60, Model d’Estat; [N08](#n08) | Orientación republicana no equivale a compromiso verificable de sustituir la monarquía española. El apartado actual de modelo de Estado trata plurinacionalidad, transferencias y representación. |
| compromis-16 | 4 | no sostenible | sin-posicion | sí | ∅; Anticorrupció i qualitat democràtica, índice p. 40; [N08](#n08) | Los controles anticorrupción no declaran una prohibición de indultos. No se encontró el compromiso específico en el texto actual. |
| compromis-17 | 5 | discutible | sin-posicion | sí | ∅; Servicios sociales y migración, pp. de índice 11 y 64; [N08](#n08) | Universalidad sanitaria, servicios sociales y regularización no definen igualdad de requisitos económicos en prestaciones para residentes extranjeros. |
| compromis-18 | 2 | documentada | 4 | no | «reduirem burocràcia»; PDF 21, Indústria i empresa; también sección de autónomos; [N08](#n08) | Reduce trámites de micropymes y autónomos y simplifica relaciones con pymes; simultáneamente amplía informes de sostenibilidad. Hay apoyo explícito y matizado, opuesto a la deducción ideológica del 2. |



### Junts per Catalunya · 11 filas

Programa propio 2023 [D37](#d37) y enmienda propia de devolución de la ley de jornada (2025). Se revisaron vivienda, sanidad, energía, justicia y derechos.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| junts-2 | 2 | discutible | sin-posicion | sí | ∅; PDF 94–96, vivienda; [D37](#d37) | Ampliar oferta y reclamar competencia no declara oponerse a límites de precios. El 2 requiere una reserva expresada sobre esa medida. |
| junts-3 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Control de inmigración y titularidad competencial no resuelven permitir regularización por arraigo. |
| junts-4 | 4 | plausible | sin-posicion | sí | ∅; apartado sanitario, PDF 108–110; [D37](#d37) | Modelo mixto y colaboración privada en otros servicios no prueban AMPLIAR centros sanitarios privados financiados públicamente. No se halló una medida suficientemente específica. |
| junts-5 | 4 | plausible | sin-posicion | sí | ∅; Justicia y seguridad; búsqueda de penas; [D37](#d37) | La pista de multirreincidencia puede ser pertinente, pero agilización procesal o reformas genéricas no determinan duración de prisión. No se recuperó en lo leído la proposición concreta que justifique 4. |
| junts-8 | 2 | documentada | 2 | no | «flexibilidad»; impresa 2, enmienda 1, último párrafo; PDF indexado sin índice físico comprobado; [N09](#n09) | Enmienda propia de devolución de 2025; rechaza imposición rígida y propone otra reforma gradual, flexible y negociada. Matiz explícito: conserva valor y pasa a antecedente documentado. |
| junts-9 | 4 | documentada | 5 | no | «contractes a llarg termini»; PDF 88, subasta eléctrica; [D37](#d37) | El programa 2023 mantiene nuclear en contratos eléctricos a largo plazo; el motivo aportado de neutralidad tecnológica era insuficiente, pero aparece texto nuclear propio. No leo una reserva al mantenimiento por cambiar el mercado donde se remunera. |
| junts-13 | 3 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Rechazar 5% del PIB no equivale a una posición intermedia declarada sobre cualquier incremento. El 3 no se obtiene de combinar dos indicios distintos. |
| junts-14 | 4 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | República catalana y crítica a monarquía no son automáticamente sustituir la monarquía española por una república. No heredo ni traduzco el objeto territorial. |
| junts-15 | 4 | plausible | sin-posicion | sí | ∅; búsqueda de derechos reproductivos y aborto; [D37](#d37) | Liberalismo civil y ausencia de derogación no acreditan positivamente el mantenimiento legal ni una restricción explícita para 4. No se halló el pasaje propio suficiente. |
| junts-16 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Sanciones y controles anticorrupción no declaran prohibición de indultos por corrupción. |
| junts-17 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Quién administra inmigración y prestaciones no determina discriminación por nacionalidad en requisitos económicos. |



### PSOE · 7 filas

Programa 2026 de otra URL [N11](#n11), página propia sobre migración y búsqueda de antecedentes. El año de la página de migración no se cerró; la interpretación de LOMLOE no se certificó como sustituto de una posición del partido.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| psoe-3 | 5 | plausible | sin-posicion | sí | ∅; HTML, política migratoria; fecha no cerrada; [N10](#n10) | Se encontró una página propia sobre arraigo, pero sin año identificado en la lectura. La reforma gubernamental citada y su atribución al partido requieren el texto concreto. No se registra una sustitución documental fechada con esta búsqueda. |
| psoe-5 | 2 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Oponerse a PPR sería un antecedente pertinente, pero no se recuperó texto propio completo y fechado que establezca el grado 2. Priorizar reinserción no excluye todo endurecimiento. |
| psoe-6 | 2 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | La razón atribuye efectos a la LOMLOE sin aportar intervención o programa propio que responda a mantener financiación donde exista demanda. No se da por verificada aquí una interpretación jurídica de la ley. |
| psoe-7 | 3 | no sostenible | sin-posicion | sí | «ni fragmentar»; impresa 92, apartado territorial; [N11](#n11) | No recentralizar ni fragmentar no declara congelar competencias: se puede transferir sin fragmentar el Estado. No es una posición intermedia explícita. |
| psoe-14 | 1 | plausible | sin-posicion | sí | ∅; apartado constitucional, revisión textual; [N11](#n11) | Defensa genérica del orden constitucional hace plausible continuidad, pero no se encontró un compromiso propio específico sobre la alternativa preguntada. No se valida por reputación. |
| psoe-16 | 2 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Conceder indultos por otros delitos no responde a prohibirlos por corrupción; tampoco reformar la ley implica la oposición matizada 2. |
| psoe-17 | 4 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Defender IMV para residentes legales no prueba mismos requisitos económicos que a españoles; hace falta especificar condiciones y colectivos. El 4 carece de matiz verificable. |



### EH Bildu · 12 filas

Compromiso 2023 [D40](#d40); declaraciones propias 2026 sobre pensiones y simplificación; voto nuclear 2025 identificado por el Parlamento de Navarra. El discurso de gasto militar solo se recuperó parcialmente en el índice.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| ehbildu-1 | 4 | discutible | sin-posicion | sí | ∅; propuesta fiscal 2026 publicada en octubre de 2025; no pasaje específico; [N12](#n12) | El documento fiscal localizado trata ITP y vivienda, no rebaja de impuestos a las rentas del trabajo. No confirma la razón específica. |
| ehbildu-3 | 5 | discutible | sin-posicion | sí | ∅; programa 2023, revisión migración; [D40](#d40) | Derogar extranjería y regularización general no especifican la vía individual de arraigo. |
| ehbildu-5 | 1 | plausible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | La pista de PPR es pertinente, pero no se recuperó declaración propia completa y localizada. No se infiere oposición penal total de su perfil político. |
| ehbildu-6 | 2 | discutible | sin-posicion | sí | ∅; PDF 11, educación; [D40](#d40) | Una red pública como eje no prueba oposición a financiación concertada donde exista demanda. |
| ehbildu-9 | 1 | documentada | 1 | no | «votos en contra»; HTML, 22/05/2025, párrafos 1 y puntos segundo–cuarto de la moción; [N13](#n13) | Su voto contra mantener la nuclear en planificación a medio y largo plazo queda identificado por una fuente parlamentaria primaria. Es antecedente de 2025 y no posición tomada de Geroa Bai u otros aliados. |
| ehbildu-10 | 5 | documentada | 5 | no | «se revaloricen según el IPC»; HTML, 17/10/2026, párrafo que comienza En los últimos años; [N14](#n14) | Declaración propia de 2026 reivindica la revalorización por IPC como logro y compromiso. Sustituye una razón que solo hablaba de pensiones mínimas y edad de retiro. |
| ehbildu-12 | 2 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Criticar instituciones y defender soberanía no determina cuánta integración política europea apoyar. No aparece el matiz de 2. |
| ehbildu-13 | 1 | plausible | sin-posicion | sí | ∅; no verificable; discurso localizado solo por índice; [N15](#n15) | Se localizó en el índice del Congreso una intervención propia de 07/05/2025 que rechaza todo aumento, pero tanto HTML como PDF completo devolvieron 403. Es una pista que podría documentar 1, no una lectura íntegra ni una página comprobada. |
| ehbildu-14 | 5 | discutible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | La República Vasca no es idéntica a sustituir la forma de Estado española. No basta la etiqueta republicana para puntuar 5 en esta afirmación. |
| ehbildu-15 | 5 | plausible | sin-posicion | sí | ∅; PDF 10, derechos de las mujeres; [D40](#d40) | Decidir sobre el cuerpo es compatible con defender aborto legal, pero el texto de 2023 no nombra expresamente el derecho preguntado. No lo doy por demostrado bajo lectura estricta. |
| ehbildu-16 | 4 | no sostenible | sin-posicion | sí | ∅; sin pasaje propio localizado; — | Reforzar controles anticorrupción no es prohibir indultos por ese delito. |
| ehbildu-18 | 2 | documentada | 4 | no | «agilizar la burocracia»; HTML, 27/10/2026, primer bloque de declaraciones tras la introducción; [N16](#n16) | Su declaración propia apoya agilizar burocracia empresarial manteniendo garantías ambientales y municipales. Es matiz favorable explícito, en sentido contrario al 2 derivado de intervencionismo. |



### Comuns–Front Ampli · 14 filas

Catálogos propios de programas y documentos políticos y presentación actual de candidatura. El PDF de 2023 [D42](#d42) identifica a En Comú Podem–Sumar. Sin adopción expresa no se heredan sus posiciones a la coalición 2026.

| ID | Asignado | Dictamen | Valor del auditor | Sin posición | Cita propia, página y fuente | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| comuns-1 | 4 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | El texto 2023 pertenece a En Comú Podem–Sumar; no se verificó adopción por la coalición 2026. Igualar tributación trabajo/capital tampoco exige bajar la del trabajo. |
| comuns-3 | 5 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | El antecedente pertenece a otra coalición y habla de regularización genérica, no de arraigo. Doble salto de atribución y de objeto. |
| comuns-4 | 1 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | La dirección es plausible, pero el programa 2023 de otra coalición no acredita una posición propia actual sin adopción expresa. |
| comuns-5 | 1 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | No se recuperó texto propio de la coalición actual; una tradición favorable a reinserción no basta para oposición penal total. |
| comuns-7 | 4 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | República federal plurinacional es un modelo de Estado, no una medida concreta de traspasos; además procede de otro sujeto electoral. |
| comuns-9 | 1 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | Impuesto nuclear y fondo territorial no implican cerrar o excluir centrales; tampoco se hereda el programa histórico de otra coalición. |
| comuns-10 | 5 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | La razón describe una propuesta específica potencialmente pertinente, pero se atribuye desde otro sujeto electoral sin adopción demostrada. |
| comuns-11 | 5 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | La afirmación genérica sobre marco legal no viene acompañada de texto propio de Comuns–Front Ampli. No se hereda de Comuns o de la coalición de 2023. |
| comuns-13 | 1 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | No se localizó declaración propia de la coalición actual que rechace todo aumento. La ideología de sus integrantes no acredita el 1. |
| comuns-14 | 5 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | La frase de 2023 sí trata de una república federal, pero pertenece a En Comú Podem–Sumar. Sin adopción de la coalición 2026 no permite atribuir 5. |
| comuns-15 | 5 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | Derechos reproductivos serían pertinentes con un pasaje específico, pero no se verificó la atribución a la coalición 2026 ni el derecho exacto en un texto propio. |
| comuns-16 | 4 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | Control anticorrupción no equivale a prohibición de indultos; tampoco se hereda de miembros de la coalición. |
| comuns-17 | 5 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | Igualdad general de derechos no especifica requisitos económicos de prestaciones; falta también fuente propia de la coalición actual. |
| comuns-18 | 2 | no sostenible | sin-posicion | sí | ∅; catálogo propio: Generals 2023; documento histórico identificado como En Comú Podem–Sumar, PDF 84; no adopción localizada; [N17](#n17) | Regulación y protección laboral no implican oponerse a reducir trámites; falta respuesta propia al objeto administrativo. |



## e) Tarea 3 · Verificación de 40 citas y enlaces

La selección de riesgo fue intencional: diferencias de signo, pasajes que parecen responder solo a un tema próximo, ambigüedad de página y fallos de acceso. No es una muestra aleatoria para estimar la tasa global de enlaces erróneos. Las ocho filas de prensa se incluyeron completas; bng-8 y mj-6 sustituyen las dos plazas imposibles de cubrir con prensa.

Se contrastaron tres cosas separadas: presencia del pasaje, correspondencia entre página impresa y física, y apertura real del destino con fragmento. Se leyó la construcción de enlaces del corte (`app.mjs`, `sourceHref`, líneas 154–159, y `programas.mjs`, líneas 150/159) sin modificar archivos. Los resultados añaden `#page=N` solo si el localizador tiene la forma `PDF p. N`, el origen acaba en `.pdf` y no figura como impreso; URLs del PNV sin esa extensión no reciben fragmento. El comparador enlaza la URL base incluso cuando muestra una página en su etiqueta. Se verificó también ese href en la página pública para mj-10.

De los 40 casos, **21** generan fragmento en resultados; **20** posiciones comparten 19 destinos que abrieron el número indicado en el visor Chrome y **1** quedó bloqueada por la verificación automática de Comuns. Veinte posiciones con apertura correcta de número no significan veinte evidencias suficientes: por ejemplo, ERC-15 abre 44 correctamente, pero el pasaje está en 47. pp-3 y pp-17 comparten el mismo destino 19 y se comprobaron con una sola apertura. Los otros 19 no tienen fragmento: en HTML no aplica, y en PDF no se certifica un salto que la interfaz no genera. Las comprobaciones visuales posteriores no se atribuyen a la fase ciega.

| Grupo de muestra | Filas |
| --- | --- |
| oficial | 10 |
| prensa | 8 |
| antecedente | 10 |
| riesgo | 10 |
| sustitucion-prensa | 2 |


| ID | Grupo | Localizador recibido | Página/pasaje verificado | Resultado de apertura | Juicio y discrepancia |
| --- | --- | --- | --- | --- | --- |
| bng-1 | oficial | PDF p. 43; apartado 4.1 «Por unha nova fiscalidade» | PDF 43 / impresa 43 | #page=43 abre PDF 43 (Chrome) | correcto.  |
| bng-2 | oficial | PDF p. 12; apartado de vivienda | PDF 12 / impresa 12 | #page=12 abre PDF 12 (Chrome) | correcto.  |
| pacma-4 | oficial | Sección 3.2.1, pág. 55 | PDF 56 / impresa 55 | sin #page; no se promete salto | ambiguo. La página 55 es correcta como numeración impresa, no como índice físico. El localizador no distingue ambas. |
| mj-8 | oficial | pág. 29, medida 02 | PDF 29 / impresa 29 | sin #page; no se promete salto | correcto.  |
| mj-10 | oficial | PDF p. 24; eje 06, medida 01 | PDF 24 / impresa 24 | #page=24 abre PDF 24 (Chrome) | correcto. El pasaje se encuentra; que pruebe IPC es otra cuestión, tratada en T1. |
| adelante-5 | oficial | PDF p. 94; propuesta 495 | PDF 94 / impresa 94, propuestas 495–496 | #page=94 abre PDF 94 (Chrome) | correcto.  |
| fejons-13 | oficial | punto 16.5, pág. 41 del PDF | impresa 39, punto 16.5; índice físico 41 no verificado visualmente | sin #page; no se promete salto | parcial. La extracción solo daba numeración impresa. En T2 se observó PDF 15 = impresa 13, compatible con el desfase +2; no se extrapola como verificación de PDF 41. |
| cc-18 | oficial | Programa 2026 · PDF p.11 · medida 28 | PDF 11, medida 28 | #page=11 abre PDF 11 (Chrome) | correcto. Cierra en T3 la incertidumbre de página que quedaba en la extracción ciega. |
| pnv-7 | oficial | pág. 38, medidas 01–02 | PDF 38 / impresa 38 | sin #page; URL sin extensión .pdf | correcto. La función de resultados no añade fragmento a esta URL aunque sirva un PDF. |
| salf-18 | oficial | Compromiso 08 · Empleo | Compromiso 08, punto tercero | HTML; #page no aplicable | correcto.  |
| frente-amplio-9 | prensa | 09/11/2026 · debate electoral de sostenibilidad · intervención de Mar González | apartado NOSTALGIA, párrafo Frente Amplio | HTML; #page no aplicable | correcto.  |
| podemos-2 | prensa | Europa Press · 17/09/2026 · primer punto de la moción | párrafo de votación del primer punto | HTML; #page no aplicable | correcto.  |
| podemos-3 | prensa | elDiario.es 26/01/2026 · pacto de regularización extraordinaria | primer párrafo de cuerpo | HTML; #page no aplicable | correcto. El pasaje trata regularización extraordinaria; no demuestra arraigo, según T1. |
| podemos-13 | prensa | 06/11/2026 · desayuno informativo de Irene Montero | párrafo posterior al titular | HTML; #page no aplicable | correcto.  |
| compromis-2 | prensa | Moncloa.com 15/11/2026 · acto de Xàtiva | apartado de alquiler, HTML no paginado | lectura indexada; enlace no abierto íntegramente | parcial. La versión indexada con barra final permitió leer el texto; apertura directa bloqueada por la herramienta. No se certifica navegador. |
| compromis-8 | prensa | Moncloa.com 15/11/2026 · economía y laboral | — | URL no legible en la auditoría | no verificable. No se obtuvo el artículo; no se deduce ni que esté roto para todos ni que el localizador sea incorrecto. |
| compromis-15 | prensa | EFE · 09/11/2026 · ejes programáticos | párrafo de principales medidas | HTML; #page no aplicable | correcto.  |
| junts-7 | prensa | Europa Press · 06/11/2026 · condiciones de negociación | segundo párrafo de cuerpo | HTML; #page no aplicable | correcto.  |
| pnv-3 | antecedente | Histórico 2023 · PDF p. 34; trabajadores migrantes | PDF 34 / impresa 34 | sin #page; URL sin extensión .pdf | correcto.  |
| pnv-10 | antecedente | Histórico 2023 · PDF p. 33; pensiones | PDF 33 / impresa 33 | sin #page; URL sin extensión .pdf | correcto.  |
| pnv-11 | antecedente | Histórico 2023 · PDF p. 6 y 8; igualdad | PDF 26 / impresa 26 para iniciativas legislativas | sin #page; URL sin extensión .pdf | parcial. Las pp. 6 y 8 son contexto general de igualdad; el compromiso legislativo específico está en 26, no a ±1 de las páginas dadas. |
| erc-2 | antecedente | Histórico 2023 · PDF p. 52; vivienda | PDF 52 / impresa 51 | #page=52 abre PDF 52 (Chrome) | correcto.  |
| erc-3 | antecedente | Histórico 2023 · PDF p. 41; regularización de trabajo y residencia | PDF 41 / impresa 40 | #page=41 abre PDF 41 (Chrome) | correcto.  |
| erc-13 | antecedente | Histórico 2023 · PDF p. 28; cooperación, gasto militar | PDF 28 / impresa 27 | #page=28 abre PDF 28 (Chrome) | correcto.  |
| erc-15 | antecedente | Histórico 2023 · PDF p. 44; igualdad | pasaje PDF 47 / impresa 46 | #page=44 abre 44, no el pasaje | incorrecto. La página 44 mostrada trata migración. La referencia sobre aborto está en 47: desfase de tres páginas físicas. |
| junts-11 | antecedente | Histórico 2023 · PDF p. 110 | PDF 110–111 | #page=110 abre 110, contexto; compromiso en 111 | parcial. El apartado de igualdad comienza al final de 110; las reformas procesales concretas siguen en 111. Desfase de +1 para la evidencia legislativa. |
| comuns-8 | antecedente | Histórico 2023 · PDF p. 19; empleo | pasaje PDF 30 / impresa 30, según extracción | #page=19 no verificable: control Robot Challenge | incorrecto. El empleo de la página 19 no corresponde a la jornada localizada en 30. La comprobación del fragmento en navegador quedó bloqueada por el sitio; no se intentó resolver la verificación. |
| pcte-8 | antecedente | Histórico 2023 · PDF p. 6; 11 | PDF 6 y 11 | #page=6 abre PDF 6 (Chrome) | parcial. El localizador enumera ambas páginas, pero el primer salto muestra la aspiración a 35 horas; la garantía salarial explícita queda en 11. |
| pp-3 | riesgo | PDF p. 19; medida 42 | PDF 19 / impresa 19, medida 42 | #page=19 abre PDF 19 (Chrome) | correcto. Cierra la incertidumbre física de T1; mantiene la lectura ciega y la discrepancia de criterio sobre arraigo. |
| pp-7 | riesgo | PDF p. 15; 25; medida 16 y 59 | PDF 15 y 25 / impresas 15 y 25 | #page=15 abre la primera de las dos páginas | parcial. La función añade solo la primera página del localizador. Medida 16 en 15; el segundo pasaje citado queda en 25. |
| pp-13 | riesgo | Programa 2026 · medidas 52–55 · España tendrá medios para su defensa | impresas 21–22, medidas 52–55 | sin #page; localizador por medidas | correcto. La localización textual está verificada; la vista de apertura no se comprobó como salto, porque no existe fragmento. |
| pp-17 | riesgo | PDF p. 19; medida 42–44 | PDF 19 / impresa 19, medidas 42–44 | #page=19 abre PDF 19 (misma URL probada para pp-3) | correcto.  |
| vox-4 | riesgo | PDF p. 37; punto 62 | PDF 37 / impresa 37, punto 62 | #page=37 abre PDF 37 (Chrome) | correcto.  |
| vox-13 | riesgo | PDF p. 45; punto 79 y 83 | PDF 45 / impresa 45, puntos 79 y 83 | #page=45 abre PDF 45 (Chrome) | correcto.  |
| vox-15 | riesgo | PDF p. 52; punto 98 | PDF 52 / impresa 52, punto 98 | #page=52 abre PDF 52 (Chrome) | correcto.  |
| psoe-1 | riesgo | PDF p. 49; medida 134 (y p. 37; medida 88) | PDF 49, medida 134 | #page=49 abre PDF 49 (Chrome) | correcto. La URL original -1.pdf sí fue legible en Chrome después de cerrar T1. No se incorpora retrospectivamente a su acuerdo ciego; es verificación posterior del enlace y del pasaje. |
| mj-18 | riesgo | PDF p. 34; eje de empresas | PDF 34 / impresa 34, medida 01 | #page=34 abre PDF 34 (Chrome) | correcto.  |
| pacma-11 | riesgo | Sección 3.10.1, págs. 75–76 | impresas 75–76 = PDF 76–77 | sin #page; no se promete salto | ambiguo. La evidencia legal concreta está en impresa 76 / PDF 77; el rango original es coherente como páginas impresas. |
| bng-8 | sustitucion-prensa | Sección 2.2, pág. 15 | PDF 15 / impresa 15 | sin #page; no se promete salto | correcto.  |
| mj-6 | sustitucion-prensa | PDF p. 45; eje de educación | PDF 45 / impresa 45 | #page=45 abre PDF 45 (Chrome) | correcto.  |


**Discrepancias de localización:** ERC-15 (44 frente a 47) y Comuns-8 (19 frente a 30) son las dos referencias incorrectas. PNV-11 lleva a contexto general y no al compromiso legislativo de 26; Junts-11 empieza el apartado en 110 y desarrolla la prueba en 111; PCTE-8 y PP-7 requieren una segunda página ya citada. PACMA-4 y PACMA-11 son correctas como páginas impresas, pero ambiguas si el usuario interpreta índices físicos. Falange-13 quedó pendiente de comprobación física de su página 41, aunque el pasaje impreso 39 está localizado. Compromís-2 solo pudo leerse indexado y Compromís-8 no se pudo leer.

Comuns presentó un control Robot Challenge; no se resolvió ni se eludió. Es un límite de este navegador, no una afirmación de que el usuario tampoco pueda abrirlo. Información sobre esa limitación: [cuando un sitio bloquea la tarea](https://help.openai.com/articles/20001280-using-cloud-browser-in-chatgpt#when-a-website-blocks-the-task).

## f) Patrones sistemáticos y observaciones de criterio

**El mayor desacuerdo es de suficiencia, no de distancia numérica.** Hay 38 lecturas de pasaje insuficiente frente a 16 cambios numéricos. Los saltos que se repiten son: regularización extraordinaria → arraigo; salud o servicios universales → igualdad de requisitos económicos de ayudas; recursos adecuados para defensa → aumento del presupuesto; poder adquisitivo → mecanismo IPC; actuación contra violencia machista → legislación específica. La dirección política puede ser plausible y aun así no responder a la frase.

**Los matices no siguen una única regla estable.** En los pares numéricos se observan 7 cambios de 4 a 5, 4 de 5 a 4, 3 de 1 a 2, 1 de 2 a 1 y 1 de 2 a 4. Esto no permite afirmar un sesgo uniforme de toda la escala. Sí aparecen 4 justificados por falta de precisión del documento, donde mi lectura no ve una condición explícita, y 5 en ayudas o trámites sectoriales donde sí leo alcance restringido. En T2 hay 9 valores 3 cuyas razones no expresan una posición intermedia declarada: `pnv-1`, `pnv-2`, `pnv-4`, `pnv-5`, `cc-3`, `adelante-12`, `frente-amplio-16`, `junts-13`, `psoe-7`.

**Intervencionismo no determina burocracia.** Los textos recuperados de Compromís, Adelante y EH Bildu permiten apoyar protección laboral o gestión pública y, a la vez, reducir trámites. La razón ideológica no basta para un 2. El caso sectorial de Falange requiere el criterio de alcance explicado junto a su fila.

**La atribución importa.** Los antecedentes de coaliciones se pueden localizar perfectamente y, aun así, no ser atribuibles a la candidatura actual conforme a la regla de esta auditoría. En particular, se separaron Sumar 2023 y Frente Amplio 2026, y En Comú Podem–Sumar 2023 y Comuns–Front Ampli 2026. La continuidad política podría ser defendible editorialmente, pero no es la regla autorizada. El programa nuevo de Compromís recuperado en T2 ofrece texto de la candidatura exacta sin recurrir a herencia.

**Los bloqueos de acceso se concentran y sesgan la cobertura.** PSOE tiene las once lecturas ciegas no verificables; ERC nueve, Frente Amplio siete, Podemos siete y Compromís una. No puede compararse su tasa de errores como si sus documentos hubieran sido leídos con la misma cobertura. Junts concentra cuatro de los quince desacuerdos de un punto sobre seis pares numéricos, por diferencias de lectura de matices; su base es pequeña y usa antecedentes 2023.

| Partido | Intentadas | Pares numéricos | Exactas | Δ1 | Δ≥2 | Sin posición | No verificables |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Partido Popular | 14 | 9 | 6 | 2 | 1 | 5 | 0 |
| VOX | 13 | 8 | 8 | 0 | 0 | 5 | 0 |
| EAJ-PNV | 6 | 5 | 4 | 1 | 0 | 1 | 0 |
| BNG | 10 | 9 | 9 | 0 | 0 | 1 | 0 |
| Municipalistas Primero Canarias–Coalición Canaria | 5 | 3 | 3 | 0 | 0 | 2 | 0 |
| Esquerra Republicana de Catalunya | 13 | 3 | 3 | 0 | 0 | 1 | 9 |
| PACMA | 4 | 3 | 2 | 1 | 0 | 1 | 0 |
| Por un Mundo Más Justo | 11 | 7 | 7 | 0 | 0 | 4 | 0 |
| Falange Española de las JONS | 13 | 12 | 12 | 0 | 0 | 1 | 0 |
| Frente Obrero | 10 | 9 | 8 | 1 | 0 | 1 | 0 |
| Adelante Andalucía | 13 | 12 | 11 | 1 | 0 | 1 | 0 |
| Geroa Bai | 2 | 1 | 1 | 0 | 0 | 1 | 0 |
| Se Acabó La Fiesta | 10 | 8 | 6 | 2 | 0 | 2 | 0 |
| Partido Humanista | 9 | 8 | 8 | 0 | 0 | 1 | 0 |
| Iustitia Europa | 2 | 2 | 1 | 1 | 0 | 0 | 0 |
| Democracia para el Siglo 21 | 5 | 4 | 3 | 1 | 0 | 1 | 0 |
| Frente Amplio | 9 | 2 | 1 | 1 | 0 | 0 | 7 |
| Podemos | 10 | 2 | 2 | 0 | 0 | 1 | 7 |
| Compromís: Front Valencià | 4 | 2 | 2 | 0 | 0 | 1 | 1 |
| Junts per Catalunya | 7 | 6 | 2 | 4 | 0 | 1 | 0 |
| PSOE | 11 | 0 | 0 | 0 | 0 | 0 | 11 |
| EH Bildu | 6 | 4 | 4 | 0 | 0 | 2 | 0 |
| PCTE | 7 | 6 | 6 | 0 | 0 | 1 | 0 |
| Comuns–Front Ampli | 4 | 0 | 0 | 0 | 0 | 4 | 0 |


**Posibles revisiones de criterio para el equipo, sin aplicar cambios:** fijar una base de comparación común —permitir una vía frente a ampliarla respecto al estado actual—; distinguir una condición explícita de un mero ámbito sectorial; separar atribución de coaliciones de localización documental; y diferenciar página impresa, índice físico y comportamiento de cada pantalla. Son observaciones metodológicas de este apartado, no instrucciones implementadas en la web.

## g) Limitaciones

La auditoría es una segunda interpretación, no una verdad única ni una medición estadística de fiabilidad poblacional. El acuerdo se calcula sobre las filas suministradas, con el criterio literal pedido; no se extrapola a candidaturas ausentes ni a las 96 casillas no almacenadas. No se calculó kappa ni se alteró el sistema de puntuación.

En varios PDF grandes el lector directo falló por tamaño. Se recuperó texto indexado de la misma URL y se marcaron sus límites de página física. La posterior inspección en Chrome verificó solo los destinos y pasajes enumerados en T3 y los hallazgos de T2 señalados, no todas las páginas de todos los documentos. No se acredita identidad binaria entre espejos o variantes de nombre. Las URLs y páginas pueden cambiar después del corte.

La búsqueda de inferidas no es exhaustiva en todos los canales del partido ni en todas las votaciones históricas. En especial, no se cerraron fuentes primarias completas sobre varias posiciones de Podemos, PNV, BNG y EH Bildu; se identifican las pistas y las lecturas que faltan. Que una búsqueda no encuentre el pasaje **no demuestra que no exista**. Las 115 propuestas de sin posición en T2 son un juicio sobre suficiencia verificable en este trabajo, no una lista probada de desconocimiento político de los partidos.

No siempre fue posible la página exacta: en esos casos se consigna apartado o numeración impresa y se declara la limitación. Esas filas no cuentan como páginas físicas verificadas. Para artículos HTML, exigir página numérica produciría un dato inventado; se usa el párrafo. Los extractos mínimos facilitan una entrega compacta, pero deben leerse junto al pasaje completo y al razonamiento, no como palabras aisladas que prueben por sí solas la puntuación.

Solo se entregan el CSV y este informe. La rama conserva los datos, evidencias, README, pruebas y código del corte base; no se abre PR ni se hace merge.

## Anexo · Registro de fuentes y trazabilidad por ID

Cada ID de T1 se une por su campo `id` con `audit/ciego-documentadas.csv`, que contiene la afirmación, partido, URL y localizador. Los códigos siguientes evitan repetir enlaces largos; no sustituyen la cita literal del CSV. N identifica fuentes o copias recuperadas en T2. Las referencias marcadas como no legibles no se usan para inventar evidencia.

### D01

Partido Popular · oficial 2026. [Abrir fuente](https://www.pp.es/wp-content/uploads/2026/11/PROGRAMA-ELECTORAL-PP-2026-RECONSTRUCCION-NACIONAL.pdf)

IDs de entrada: `pp-1`, `pp-2`, `pp-3`, `pp-5`, `pp-6`, `pp-7`, `pp-9`, `pp-10`, `pp-11`, `pp-12`, `pp-13`, `pp-16`, `pp-17`, `pp-18`.

### D02

VOX · oficial 2026. [Abrir fuente](https://www.voxespana.es/abascal/es-sentido-comun-estas-son-las-medidas-de-vox-para-el-29n-20261112)

IDs de entrada: `vox-1`, `vox-2`, `vox-3`, `vox-5`, `vox-9`, `vox-11`, `vox-16`, `vox-17`, `vox-18`.

### D03

VOX · oficial 2026. [Abrir fuente](https://www.voxespana.es/wp-content/uploads/2026/11/Programa-completo-A5-1.pdf)

IDs de entrada: `vox-4`, `vox-6`, `vox-13`, `vox-15`.

### D04

EAJ-PNV · antecedente 2023. [Abrir fuente](https://www.eaj-pnv.eus/es/adjuntos-documentos/20945/pdf/con-voz-propia-programa-electoral-23-j)

IDs de entrada: `pnv-3`, `pnv-10`, `pnv-11`.

### D05

EAJ-PNV · oficial 2026. [Abrir fuente](https://www.eaj-pnv.eus/es/adjuntos-documentos/21765/pdf/programa-electoral-29n)

IDs de entrada: `pnv-7`, `pnv-15`, `pnv-18`.

### D06

BNG · oficial 2026. [Abrir fuente](https://www.bng.gal/media/bnggaliza/files/2026/11/12/26_bng_xerais_documentos_programa_electoral.pdf)

IDs de entrada: `bng-1`, `bng-2`, `bng-3`, `bng-4`, `bng-5`, `bng-7`, `bng-8`, `bng-10`, `bng-11`, `bng-13`.

### D07

Municipalistas Primero Canarias–Coalición Canaria · oficial 2026. [Abrir fuente](https://coalicioncanaria.org/wp-content/uploads/2026/11/CCA-26-Programa_Electoral-29NOV.pdf)

IDs de entrada: `cc-1`, `cc-7`, `cc-11`, `cc-18`.

### D08

Municipalistas Primero Canarias–Coalición Canaria · oficial 2026. [Abrir fuente](https://coalicioncanaria.org/valido-reclama-al-estado-una-subida-mayor-para-las-pensiones-no-contributivas/)

IDs de entrada: `cc-10`.

### D09

Esquerra Republicana de Catalunya · oficial 2026. [Abrir fuente](https://esquerrarepublicana.cat/documents/e2026-programa.pdf)

IDs de entrada: `erc-1`, `erc-4`, `erc-7`, `erc-8`, `erc-10`, `erc-11`, `erc-12`, `erc-14`, `erc-18`.

### D10

Esquerra Republicana de Catalunya · antecedente 2023. [Abrir fuente](https://static.esquerra.cat/uploads/20230905/e2023-programa.pdf)

IDs de entrada: `erc-2`, `erc-3`, `erc-13`, `erc-15`.

### D11

PACMA · oficial 2026. [Abrir fuente](https://pacma.es/wp-content/uploads/2026/11/PE_GENERALES_29N26.pdf)

IDs de entrada: `pacma-4`, `pacma-9`, `pacma-11`, `pacma-18`.

### D12

Por un Mundo Más Justo · oficial 2026. [Abrir fuente](https://www.porunmundomasjusto.es/wp-content/uploads/2026/11/Castellano.pdf)

IDs de entrada: `mj-2`, `mj-3`, `mj-4`, `mj-6`, `mj-8`, `mj-10`, `mj-11`, `mj-13`, `mj-16`, `mj-17`, `mj-18`.

### D13

Falange Española de las JONS · oficial 2026. [Abrir fuente](https://falange.es/wp-content/uploads/2026/11/FEDELASJONS_ProgramaElectoral_29NGenerales2026.pdf)

IDs de entrada: `fejons-1`, `fejons-2`, `fejons-3`, `fejons-4`, `fejons-5`, `fejons-7`, `fejons-9`, `fejons-11`, `fejons-12`, `fejons-13`, `fejons-14`, `fejons-15`, `fejons-17`.

### D14

Frente Obrero · oficial 2026. [Abrir fuente](https://frenteobrero.es/documentos/programa-frente-obrero.pdf)

IDs de entrada: `fo-1`, `fo-3`, `fo-4`, `fo-7`, `fo-9`, `fo-11`, `fo-12`, `fo-14`, `fo-16`, `fo-17`.

### D15

Adelante Andalucía · oficial 2026. [Abrir fuente](https://programa.adelanteandalucia.org/programa-29n-adelante-andalucia.pdf)

IDs de entrada: `adelante-1`, `adelante-2`, `adelante-3`, `adelante-4`, `adelante-5`, `adelante-6`, `adelante-7`, `adelante-8`, `adelante-10`, `adelante-11`, `adelante-13`, `adelante-15`, `adelante-16`.

### D16

Geroa Bai · oficial 2026. [Abrir fuente](https://geroabai.eus/es/actualidad/geroa-bai-presenta-sus-bases-politicas-para-las-elecciones-generales-con-la-defensa-de-navarra-el-autogobierno-y-el-estado-del-bienestar-como-ejes-centrales)

IDs de entrada: `geroabai-7`, `geroabai-11`.

### D17

Se Acabó La Fiesta · oficial 2026. [Abrir fuente](https://www.seacabolafiesta.com/)

IDs de entrada: `salf-1`, `salf-5`, `salf-6`, `salf-10`, `salf-12`, `salf-16`, `salf-18`.

### D18

Se Acabó La Fiesta · oficial 2026. [Abrir fuente](https://www.seacabolafiesta.com/SALF_Contrato_Electoral_29N.pdf)

IDs de entrada: `salf-4`, `salf-13`, `salf-17`.

### D19

Partido Humanista · oficial 2026. [Abrir fuente](https://www.partidohumanista.es/Documentos/Programas/Programa%20Generales%202026.pdf)

IDs de entrada: `humanista-2`, `humanista-3`, `humanista-4`, `humanista-6`, `humanista-8`, `humanista-13`, `humanista-14`, `humanista-15`, `humanista-17`.

### D20

Iustitia Europa · oficial 2026. [Abrir fuente](https://iustitiaeuropa.es/contrato-electoral/)

IDs de entrada: `iustitia-9`, `iustitia-12`.

### D21

Democracia para el Siglo 21 · oficial 2026. [Abrir fuente](https://mi.democracia21.es/programa/vivienda)

IDs de entrada: `d21-2`.

### D22

Democracia para el Siglo 21 · oficial 2026. [Abrir fuente](https://mi.democracia21.es/programa/derechos-sociales)

IDs de entrada: `d21-11`, `d21-15`.

### D23

Democracia para el Siglo 21 · oficial 2026. [Abrir fuente](https://mi.democracia21.es/programa/union-europea)

IDs de entrada: `d21-12`.

### D24

Democracia para el Siglo 21 · oficial 2026. [Abrir fuente](https://mi.democracia21.es/programa/menos-normas)

IDs de entrada: `d21-18`.

### D25

Frente Amplio · antecedente 2023. [Abrir fuente](https://verdesequo.es/wp-content/uploads/2023/07/Un-programa-para-ti.pdf)

IDs de entrada: `frente-amplio-2`, `frente-amplio-6`, `frente-amplio-8`, `frente-amplio-11`, `frente-amplio-12`, `frente-amplio-15`, `frente-amplio-18`.

### D26

Frente Amplio · prensa 2026. [Abrir fuente](https://www.servimedia.es/noticias/pp-vox-defienden-alargar-vida-util-centrales-nucleares/1413569593)

IDs de entrada: `frente-amplio-9`.

### D27

Frente Amplio · oficial 2026. [Abrir fuente](https://frenteamplio.info/noticias/frente-amplio-propone-ninguna-pension-este-debajo-salario-minimo-recuperar/)

IDs de entrada: `frente-amplio-10`.

### D28

Podemos · prensa 2026. [Abrir fuente](https://www.idealista.com/news/inmobiliario/vivienda/2026/09/17/914567-el-congreso-rechaza-el-plan-de-podemos-para-topar-los-alquileres-y-expropiar)

IDs de entrada: `podemos-2`.

### D29

Podemos · prensa 2026. [Abrir fuente](https://www.eldiario.es/politica/anuncia-pacto-gobierno-regularizacion-extraordinaria-migrantes_1_12937083.html)

IDs de entrada: `podemos-3`.

### D30

Podemos · antecedente 2024. [Abrir fuente](https://www.rtve.es/contenidos/documentos/elecciones_europeas_2024/programa_electoral_podemos.pdf)

IDs de entrada: `podemos-4`, `podemos-8`, `podemos-9`, `podemos-10`, `podemos-11`, `podemos-12`.

### D31

Podemos · prensa 2026. [Abrir fuente](https://www.europapress.es/videos/video-montero-plantea-dedicar-gasto-militar-nacionalizar-repsol-contratar-sanitarios-20261106103830.html)

IDs de entrada: `podemos-13`.

### D32

Podemos · antecedente 2024. [Abrir fuente](https://podemos.info/europeas-2024/)

IDs de entrada: `podemos-15`.

### D33

Compromís: Front Valencià · prensa 2026. [Abrir fuente](https://www.moncloa.com/2026/11/15/compromis-vivienda-alquiler-rodalia-3468406)

IDs de entrada: `compromis-2`.

### D34

Compromís: Front Valencià · antecedente 2023. [Abrir fuente](https://media.valenciaplaza.com/public/Attachment/2023/7/programa-electoral-compromis-23j-2023.pdf)

IDs de entrada: `compromis-6`.

### D35

Compromís: Front Valencià · prensa 2026. [Abrir fuente](https://www.moncloa.com/2026/11/15/compromis-fondo-nivelacion-financiacion-autonomica-3468188)

IDs de entrada: `compromis-8`.

### D36

Compromís: Front Valencià · prensa 2026. [Abrir fuente](https://valenciaplaza.com/valenciaplaza/comunitat-valenciana1/compromis-front-valencia-hara-una-campana-coral-con-inicio-en-alicante-y-final-en-valencia)

IDs de entrada: `compromis-15`.

### D37

Junts per Catalunya · antecedente 2023. [Abrir fuente](https://img.beteve.cat/wp-content/uploads/2023/07/programa-junts-per-catalunya-eleccions-generals-2023.pdf)

IDs de entrada: `junts-1`, `junts-6`, `junts-10`, `junts-11`, `junts-12`, `junts-18`.

### D38

Junts per Catalunya · prensa 2026. [Abrir fuente](https://www.europapress.es/catalunya/noticia-nogueras-junts-abre-hablar-psoe-29n-si-catalunya-centro-20261106111810.html)

IDs de entrada: `junts-7`.

### D39

PSOE · oficial 2026. [Abrir fuente](https://www.psoe.es/media-content/2026/11/PROGRAMAPSOE29N26-1.pdf)

IDs de entrada: `psoe-1`, `psoe-2`, `psoe-4`, `psoe-8`, `psoe-9`, `psoe-10`, `psoe-11`, `psoe-12`, `psoe-13`, `psoe-15`, `psoe-18`.

### D40

EH Bildu · antecedente 2023. [Abrir fuente](https://www.elnacional.cat/uploads/s1/42/81/42/33/programa-electoral-eh-bildu-eleccions-generals-2023.pdf)

IDs de entrada: `ehbildu-2`, `ehbildu-4`, `ehbildu-7`, `ehbildu-8`, `ehbildu-11`, `ehbildu-17`.

### D41

PCTE · antecedente 2023. [Abrir fuente](https://www.pcte.es/wp-content/uploads/2023/07/PROGRAMA%20DE%20LUCHA%202023-2027.pdf)

IDs de entrada: `pcte-2`, `pcte-4`, `pcte-6`, `pcte-8`, `pcte-12`, `pcte-13`, `pcte-15`.

### D42

Comuns–Front Ampli · antecedente 2023. [Abrir fuente](https://comuns.cat/wp-content/uploads/2025/07/sumarECP-programa-generales-2023.pdf)

IDs de entrada: `comuns-2`, `comuns-6`, `comuns-8`, `comuns-12`.

### N01

Partido Popular · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://www.pp.es/actualidad/articulos/bravo-denuncia-que-la-ley-de-reduccion-laboral-del-gobierno-esta-invadida-de-ideologia-y-supondria-un-duro-golpe-al-tejido-productivo/)

### N02

Partido Popular · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://www.pp.es/sites/default/files/documentos/programa_electoral_pp_23j_feijoo_2023.pdf)

### N03

VOX · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://www.voxespana.es/grupo_parlamentario/actividad-parlamentaria/jornada-laboral-figaredo-califica-de-engano-a-los-trabajadores-la-medida-del-gobierno-y-advierte-de-la-ruina-que-supondra-para-las-pymes-20250910)

### N04

Municipalistas Primero Canarias–Coalición Canaria · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://coalicioncanaria.org/internacional-partido-democrata-europeo-pde/)

### N05

Esquerra Republicana de Catalunya · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://img.beteve.cat/wp-content/uploads/2026/11/ERC-programa-electoral-29-N-2026-2026-11-12.pdf)

### N06

Frente Amplio · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://frenteamplio.info/programa/)

### N07

Podemos · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://podemos.info/wp-content/uploads/2024/05/Programa-PODEMOS-elecciones-europeas-2024.pdf)

### N08

Compromís: Front Valencià · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://frontvalencia.org/programa-compromis-front-valencia.pdf)

### N09

Junts per Catalunya · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://www.congreso.es/public_oficiales/L15/CONG/BOCG/A/BOCG-15-A-58-2.PDF)

### N10

PSOE · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://www.psoe.es/programa-electoral/estado-social/politica-migratoria/)

### N11

PSOE · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://www.psoe.es/media-content/2026/11/PROGRAMAPSOE29N26.pdf)

### N12

EH Bildu · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://ehbildu.eus/media/dokumentuak/albisteak/es-1761140894.pdf)

### N13

EH Bildu · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://parlamentodenavarra.es/es/node/191238)

### N14

EH Bildu · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://ehbildu.eus/herriak/araba/es/noticias/eva-lopez-de-arroyabe-eh-bildu-es-el-unico-frente-amplio-con-capacidad-de-hacer-frente-al-bloque-reaccionario-y-lograr-diputados-y-senadores-en-araba-bizkaia-gipuzkoa-y-nafarroa)

### N15

EH Bildu · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-112.PDF)

### N16

EH Bildu · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://ehbildu.eus/herriak/legebiltzarra/es/noticias/eh-bildu-alerta-de-las-graves-consecuencias-de-la-ley-que-impulsan-pnv-y-pse-para-promover-actividad-economica)

### N17

Comuns–Front Ampli · fuente consultada en T2; alcance y año en cada fila. [Abrir fuente](https://comuns.cat/transparencia/programes-electorals/)
