import { dispatchPage } from './shared.js';
export default {
  id:'typewriter', name:'Typewriter', type:'B', dot:'#d4b896', ownNav:false,
  _timer: null,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    c.style.background='#f7f3e8';
    c.innerHTML=`<div style="background:#f7f3e8;min-height:100vh;padding:3rem 2.5rem;position:relative">
      <div style="position:absolute;left:72px;top:0;bottom:0;width:1px;background:rgba(220,80,80,0.2);pointer-events:none"></div>
      <div id="tw-out" style="font-family:'Courier New',monospace;font-size:14px;color:#1a1410;line-height:2.1;max-width:680px;margin:0 auto;padding-top:2rem"></div>
    </div>`;
    const raw = this._extractText(page, content, state);
    this._type(document.getElementById('tw-out'), raw);
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){if(this._timer){clearTimeout(this._timer);this._timer=null;}},
  _extractText(page,content,state){
    const [p,sub]=page.split('/');
    if(p==='post'&&sub){const e=content.essays.find(x=>x.id===sub);if(e)return [{t:'acc',s:'// '+e.title},{t:'dim',s:e.cat+' — '+e.date},{t:'',s:''},...e.body.replace(/<[^>]*>/g,'').split('. ').filter(Boolean).map(s=>({t:'',s:s.trim()+'.'}))];}
    if(p==='poetry'){return [{t:'acc',s:'// the collection'},{t:'',s:''},...content.poems.slice(0,2).flatMap(po=>[{t:'acc',s:'— '+po.title},{t:'',s:''},...po.lines.map(l=>({t:'poem',s:l||' '})),{t:'',s:''}])];}
    if(p==='about'){return [{t:'acc',s:'// M. Suheer Baig'},{t:'',s:''},{t:'',s:'Criminologist. Poet. Ghostwriter.'},{t:'',s:''},{t:'dim',s:'BSc Criminology, University of Karachi'},{t:'dim',s:'eBook Production Manager, Ariatech'},{t:'dim',s:'Former: Limegreen Media (Netflix, BBC, Sony...)'},{t:'',s:''},{t:'',s:'The contradiction is the autobiography.'}];}
    if(p==='hire'){return [{t:'acc',s:'// available for'},{t:'',s:''},...content.cv.services.map(s=>({t:'',s:'  '+s.name+' — '+s.desc.slice(0,60)+'...'}))];}
    return [{t:'acc',s:'// M. Suheer Baig'},{t:'',s:''},{t:'poem',s:"there's no map for this, thank you & thank you"},{t:'',s:''},{t:'dim',s:'poet · criminologist · ghost · karachi'}];
  },
  _type(out,lines){
    if(this._timer){clearTimeout(this._timer);this._timer=null;}
    out.innerHTML=''; let li=0,ci=0,cur=null;
    const tick=()=>{
      if(li>=lines.length)return;
      const line=lines[li];
      if(!cur){
        const row=document.createElement('div');
        row.style.display='flex';row.style.gap='0';row.style.minHeight='1.8em';
        const num=document.createElement('span');
        num.style.cssText='width:40px;text-align:right;color:#c0b898;font-size:11px;padding-right:14px;padding-top:3px;flex-shrink:0;font-family:Courier New,monospace';
        num.textContent=li+1;
        const txt=document.createElement('span');
        txt.style.flex='1';
        if(line.t==='acc')txt.style.color='#8b2020';
        else if(line.t==='dim')txt.style.color='#8a7e68';
        else if(line.t==='poem')txt.style.color='#3a5a3a';
        row.appendChild(num);row.appendChild(txt);
        out.appendChild(row);cur=txt;ci=0;
      }
      if(ci<line.s.length){
        cur.textContent=line.s.slice(0,ci+1);ci++;
        this._timer=setTimeout(tick,line.s[ci-1]===' '?25:line.t==='dim'?15:40);
      }else{li++;cur=null;this._timer=setTimeout(tick,line.s===''||line.s===' '?50:100);}
    };
    tick();
  },
};
