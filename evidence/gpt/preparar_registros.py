"""Importa la línea base existente sin sobrescribir fichas de trabajo previas."""
import json,re,subprocess
from pathlib import Path
from urllib.parse import urlparse
root=Path(__file__).resolve().parents[2]
c=json.loads((root/'programas.json').read_text());d=json.loads((root/'data.json').read_text())
section=(root/'REPARTO_GPT_CLAUDE.md').read_text().split('### GPT — 33 entidades')[1].split('### CLAUDE')[0]
ids=re.findall(r'^\| \d+ \| `([^`]+)`',section,re.M)
assert len(ids)==len(set(ids))==33
base=subprocess.check_output(['git','rev-parse','origin/main'],cwd=root,text=True).strip()
for id in ids:
 out=root/'evidence/gpt'/f'{id}.json'
 if out.exists():continue
 e=next(x for x in c['parties'] if x['id']==id);a=next((x for x in d['parties'] if x['id']==e.get('dataId')),None)
 sources=[];lookup={};questions={}
 for i in range(1,19):
  pos=a and a['positions'].get(str(i))
  if not pos:
   questions[str(i)]={'status':'sin-evidencia','position':None,'sourceIds':[],'locator':None,'evidenceSummary':'No hay posición en la línea base. La búsqueda específica de esta pregunta está pendiente, no agotada.','reason':None,'confidence':'baja','reviewNeeded':True,'reviewNote':'Pendiente de investigación del agente GPT.','nextAction':'Consultar fuente oficial, archivo y fuente secundaria aplicable.','replaces':None}
   continue
  url=pos['source'];year=pos.get('sourceYear');host=urlparse(url).hostname or '';official=host.removeprefix('www.')==(urlparse(e.get('website','')).hostname or '').removeprefix('www.')
  if url not in lookup:
   sid=f'{id}-s{len(sources)+1:02}';lookup[url]=sid
   sources.append({'id':sid,'url':url,'publisher':e['name'] if official else host,'title':e['program'].get('title','Fuente importada: título pendiente de verificar') if url==e['program'].get('url') else 'Fuente de posición existente: título pendiente de verificar','published':None,'accessed':None,'election':f'Antecedente de {year}; convocatoria por verificar' if year else 'Convocatoria por verificar en metadatos importados','year':year,'kind':'programa' if '.pdf' in url.lower() else 'documento-politico','origin':'primaria' if official or '.pdf' in url.lower() or 'manifesto-project' in host else 'secundaria','hosting':'oficial' if official else ('copia-archivo' if '.pdf' in url.lower() or 'manifesto-project' in host else 'medio'),'historical':bool(pos.get('historical')),'documentVersion':None,'sha256':None,'notes':'Importado de data.json; clasificación provisional. No implica nueva consulta ni verificación de metadatos. '+pos.get('sourceNote','')})
  questions[str(i)]={'status':'en-revision' if pos.get('scoreable') is False else 'documentada','position':pos['value'] if pos.get('scoreable') is not False else None,'sourceIds':[lookup[url]],'locator':pos['locator'],'evidenceSummary':pos['reason'],'reason':pos['reason'],'confidence':'media','reviewNeeded':True,'reviewNote':'Registro existente importado; pendiente de revisión de metadatos y correspondencia exacta. '+pos.get('reviewNote',''),'nextAction':'Revisar texto original y completar metadatos; buscar actualización de 2026 si es histórico.','replaces':None,'baselinePosition':pos}
 obj={'schemaVersion':'1.0','catalogId':id,'dataId':e.get('dataId',id),'agent':'gpt','baseCommit':base,'reviewed':None,'prepared':'2026-11-15','status':'en-curso','sources':sources,'questions':questions,'searchLog':[{'date':'2026-11-15','urlOrQuery':f'git:{base}:data.json','outcome':'Importación de línea base existente, sin nuevas búsquedas declaradas.'}],'integration':{'status':'pendiente','commit':None}}
 out.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
print('33 registros con 18 decisiones iniciales; huecos y metadatos pendientes explícitos.')
