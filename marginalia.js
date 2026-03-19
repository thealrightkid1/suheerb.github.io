import { dispatchPage } from './shared.js';
export default {
  id:'seance', name:'Séance', type:'B', dot:'#9060a0', ownNav:false,
  _timer:null,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    c.style.background='#0a0510';
    const raw=dispatchPage(page,content,state);
    c.innerHTML=`<div style="background:#0a0510;min-height:100vh;padding:3rem 2.5rem">
      <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(140,80,180,0.08) 0%,transparent 70%);pointer-events:none;z-index:0;animation:pulse 4s ease-in-out infinite"></div>
      <style>@keyframes pulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.5}50%{transform:translate(-50%,-50%) scale(1.3);opacity:0.9}}</style>
      <div id="seance-inner" style="max-width:680px;margin:0 auto;position:relative;z-index:1;opacity:0;transition:opacity 2s ease" >${raw}</div>
    </div>`;
    c.querySelectorAll('.hd').forEach(h=>{h.style.color='#c090e0';});
    c.querySelectorAll('.lbl').forEach(l=>{l.style.color='#9060a0';});
    c.querySelectorAll('.acc,.ac').forEach(a=>{a.style.color='#c090e0';});
    this._timer=setTimeout(()=>{const inner=document.getElementById('seance-inner');if(inner)inner.style.opacity='1';},300);
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){if(this._timer){clearTimeout(this._timer);this._timer=null;}},
};
