# Contraste con otras webs de afinidad (18/11/2026)

Objetivo: detectar picos e incoherencias de nuestras posiciones frente a otras campañas, **sin importar sus valores ni sus sesgos**. Las posiciones de otras webs se usan solo como alarma; cualquier cambio exige que sea coherente con nuestras propias fuentes.

## Fuentes consultadas
- afinidadpolitica.es: 59 afirmaciones y 15 partidos (posiciones por tema en `/temas/*`; marca las «estimadas»). Es la única con datos legibles sin ejecutar el test.
- afinidadelectoral.com (25 afirmaciones, 13 partidos), testelectoral.com (42/82/129), democrata.es y brujula de Ideal: sin posiciones accesibles en el HTML (o acceso denegado); solo se leyeron preguntas y método.

## Método
Se emparejaron 16 de nuestras 18 afirmaciones con la más cercana de afinidadpolitica.es (10 directas, 6 aproximadas o invertidas; Q16 indultos y Q18 empresas no tienen equivalente) y se comparó el valor 1–5 de los 14 partidos comunes.

## Resultado
- En las 10 preguntas directas, la diferencia media absoluta por partido va de 0,1 a 0,8 puntos y no hay sesgo sistemático (−0,4 a +0,1). El reparto de valores extremos (1/5) es casi idéntico.
- Solo cuatro diferencias de 2 o más puntos en preguntas directas; se corrigieron por coherencia interna:
  - ERC-5 y Junts-5: 4 → 3 (endurecimiento penal concreto sin subida general, igual que PSOE-5 = 3).
  - Podemos-12: 5 → 4 (nuevo tratado y más poder al Parlamento Europeo, sin pedir más poder general para la UE).
  - Junts-17: 2 → 3 (estimaciones externas contradictorias; confianza baja).
- No se tocó PSOE-13 (2): su programa 2026 solo habla de «eficiencia del gasto en defensa» y el documento prevalece sobre estimaciones externas.
- Las diferencias en preguntas aproximadas (fiscalidad, defensa vs. OTAN, monarquía vs. referéndum) no son comparables y no se tocaron.

## Sesgos detectados y no importados
- Posiciones «estimadas» sin documento (p. ej. varias de PP y PNV) y valores que tratan como intermedio lo que nuestros documentos sitúan en otro punto.
- Su cálculo penaliza cuadráticamente la distancia y pondera por convicción; el nuestro es lineal y se mantiene.
- Su brújula excluye territorial, lengua y UE, igual que la nuestra.
