export function score(answers,weights,positions){
 let total=0,known=0,similarity=0,count=0;const details=[];
 for(const [id,a] of Object.entries(answers)){
  const w=weights[id];
  if(!Number.isInteger(a)||a<1||a>5)continue;
  if(!Number.isInteger(w)||w<1||w>5)throw Error('Peso no válido');
  total+=w;const p=positions[id];
  if(!p||!Number.isInteger(p.value)||p.value<1||p.value>5||!p.source||!p.locator)continue;
  const s=1-Math.abs(a-p.value)/4;known+=w;similarity+=w*s;count++;
  details.push({id,answer:a,weight:w,position:p.value,similarity:s*100,...p});
 }
 return {affinity:known?100*similarity/known:null,coverage:total?100*known/total:0,count,total,known,details};
}
export function sharedIds(answers,parties){return Object.keys(answers).filter(id=>Number.isInteger(answers[id])&&parties.every(p=>p.positions[id]));}
