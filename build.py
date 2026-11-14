import json
from pathlib import Path
root=Path(__file__).parent
# Explicit statements replace the unrecovered answer options. Values are degree of agreement.
rows=[
('Fiscalidad','Reducir los impuestos sobre las rentas del trabajo.'),
('Vivienda','Regular los precios del alquiler en zonas tensionadas.'),
('Inmigración','Permitir regularizaciones por arraigo de personas en situación irregular.'),
('Sanidad pública y privada','Ampliar la colaboración con centros privados financiada con fondos públicos.'),
('Seguridad y delincuencia','Endurecer las penas de prisión para combatir la delincuencia.'),
('Educación','Mantener la financiación de colegios concertados donde exista demanda.'),
('Modelo territorial','Transferir más competencias del Estado a las comunidades autónomas.'),
('Mercado laboral','Reducir la jornada laboral máxima legal sin reducir el salario.'),
('Clima y energía','Mantener la energía nuclear dentro del sistema eléctrico.'),
('Pensiones','Actualizar las pensiones públicas conforme al IPC.'),
('Igualdad','Mantener legislación específica contra la violencia de género.'),
('Unión Europea','Avanzar hacia una mayor integración política de la Unión Europea.'),
('Defensa','Aumentar el gasto público en defensa.'),
('Jefatura del Estado','Sustituir la monarquía parlamentaria por una república.'),
('Derechos individuales','Mantener el derecho legal al aborto.'),
('Corrupción','Prohibir los indultos a personas condenadas por corrupción.'),
('Ayudas sociales','Permitir que residentes extranjeros accedan a prestaciones con los mismos requisitos económicos que los españoles.'),
('Economía y empresas','Reducir las obligaciones administrativas de las empresas.')]
qs=[dict(id=str(i+1),topic=t,text=q) for i,(t,q) in enumerate(rows)]
pp='https://www.pp.es/wp-content/uploads/2026/11/PROGRAMA-ELECTORAL-PP-LA-RECONSTRUCCION-NACIONAL.pdf'
vox='https://www.voxespana.es/abascal/es-sentido-comun-estas-son-las-medidas-de-vox-para-el-29n-20261112'
def point(value,source,locator,reason):return dict(value=value,source=source,locator=locator,reason=reason,reviewed='2026-11-14',coding='Interpretación editorial provisional')
p={};v={}
for n,val,loc,reason in [(1,5,'Medidas 177–183','Rebajas fiscales.'),(3,1,'Medida 42','Arraigo excepcional; prohíbe regularizaciones masivas.'),(5,5,'Medidas 23–30','Ampliación de penas.'),(6,5,'Medida 212','Preserva conciertos con demanda.'),(9,5,'Medida 228','Extensión de centrales.'),(11,5,'Medida 28','Refuerzo del Pacto de Estado y VioGen.'),(18,5,'Medidas 186–187','Simplificación empresarial.')]:p[str(n)]=point(val,pp,loc,reason)
for n,val,loc,reason in [(1,5,'Área 2','Reducción de impuestos.'),(2,1,'Área 5','Derogación de la Ley de Vivienda.'),(3,1,'Área 3','Supresión del arraigo.'),(5,5,'Área 10','Ampliación de prisión permanente revisable.'),(6,5,'Área 9','Libre elección de centro; codificación pendiente de mayor detalle sobre conciertos.'),(9,5,'Área 2','Recuperación del plan nuclear.'),(11,1,'Área 6','Sustitución de leyes ideológicas por protección de mujeres víctimas.'),(13,5,'Área 10','Más inversión en defensa.'),(16,5,'Área 12','Prohibición de indultos por corrupción.'),(17,1,'Área 4','Prioridad nacional en prestaciones.'),(18,5,'Área 6','Desregulación administrativa.')]:v[str(n)]=point(val,vox,loc,reason)
# Omit inference that free school choice necessarily implies public funding.
del v['6']
data=dict(version='0.1.0',date='2026-11-14',election='Congreso · 29 de noviembre de 2026',questions=qs,parties=[dict(id='pp',name='Partido Popular',match='PARTIDO POPULAR',positions=p),dict(id='vox',name='VOX',match='VOX',positions=v)],candidateSource='https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23103',limitations='Catálogo inicial: solo PP y VOX parcialmente codificados. Las demás candidaturas figuran sin analizar. No permite determinar la máxima afinidad entre todos los partidos. No se reutilizan programas de 2023 como si fueran de 2026.')
(root/'data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
