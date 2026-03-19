import { dispatchPage } from './shared.js';
export default {
  id:'radio', name:'Radio', type:'B', dot:'#d4a855', ownNav:true,
  _static:null,
  coldBoot(c,content,state){this._build(c,content,state);},
  mount(c,page,content,state){this._build(c,content,state,page);},
  navigate(page,content,state){this._tuneToPage(page,content,state);},
  unmount(){if(this._static){clearInterval(this._static);this._static=null;}},
  _build(c,content,state,initialPage){
    const STATIONS=[
      {freq:'88.1',name:'POETRY FM',page:'poetry',color:'#b8914a'},
      {freq:'91.5',name:'CRIME WAVE',page:'writing',color:'#cc2200'},
      {freq:'95.3',name:'SYSTEMS',page:'home',color:'#39e07a'},
      {freq:'99.7',name:'THE GHOST',page:'hire',color:'#a0a0e0'},
      {freq:'103.1',name:'ABOUT MSB',page:'about',color:'#e0c870'},
    ];
    c.style.background='#1a1510';
    c.innerHTML=`<div style="background:#1a1510;min-height:calc(100vh - 55px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem">
      <div id="radio-body" style="background:#2a2010;border:2px solid #4a3820;padding:2rem;max-width:500px;width:100%;box-shadow:4px 4px 0 rgba(0,0,0,0.5)">
        <div style="background:#0a0f08;padding:1rem;margin-bottom:1.5rem;border:1px solid #3a2810;min-height:60px;display:flex;align-items:center;justify-content:center">
          <div id="radio-display" style="font-family:Space Mono,monospace;font-size:0.8rem;color:#d4a855;letter-spacing:0.1em;text-align:center"></div>
        </div>
        <div style="background:#0a0f08;height:6px;margin-bottom:1.5rem;position:relative;border:1px solid #3a2810;border-radius:3px" id="freq-bar">
          ${STATIONS.map(s=>`<div style="position:absolute;top:50%;transform:translate(-50%,-50%);width:2px;height:10px;background:#4a3820" title="${s.freq}" data-freq="${s.freq}" data-page="${s.page}" style="left:${(parseFloat(s.freq)-88)/(105-88)*100}%"></div>`).join('')}
          <div id="needle" style="position:absolute;top:50%;transform:translate(-50%,-50%);width:3px;height:14px;background:#d4a855;transition:left 0.4s ease;left:40%"></div>
        </div>
        <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">
          ${STATIONS.map(s=>`<button onclick="window._radioTune('${s.page}')" style="font-family:Space Mono,monospace;font-size:8px;letter-spacing:0.1em;text-transform:uppercase;padding:5px 10px;background:transparent;border:1px solid #4a3820;color:#a09070;cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='${s.color}';this.style.color='${s.color}'" onmouseout="this.style.borderColor='#4a3820';this.style.color='#a09070'">${s.freq}<br>${s.name}</button>`).join('')}
        </div>
      </div>
      <div id="radio-content" style="max-width:680px;width:100%;margin-top:2rem;color:#c8b890"></div>
    </div>`;
    window._radioTune=(page)=>this._tuneToPage(page,content,state);
    this._tuneToPage(initialPage||'home',content,state);
  },
  _tuneToPage(page,content,state){
    const STATIONS=[{freq:'88.1',page:'poetry'},{freq:'91.5',page:'writing'},{freq:'95.3',page:'home'},{freq:'99.7',page:'hire'},{freq:'103.1',page:'about'}];
    const [p]=page.split('/');
    const station=STATIONS.find(s=>s.page===p)||STATIONS[2];
    const pct=(parseFloat(station.freq)-88)/(105-88)*100;
    const needle=document.getElementById('needle');
    const display=document.getElementById('radio-display');
    const contentEl=document.getElementById('radio-content');
    if(needle)needle.style.left=pct+'%';
    if(display){display.textContent='';let i=0;const txt=station.freq+' MHz';const t=setInterval(()=>{if(i<txt.length){display.textContent+=txt[i++];}else clearInterval(t);},80);}
    if(contentEl){
      contentEl.innerHTML=`<div style="font-family:Space Mono,monospace;font-size:0.7rem;color:#d4a855;text-align:center;padding:1rem;letter-spacing:0.1em">. . . tuning . . .</div>`;
      setTimeout(()=>{if(contentEl)contentEl.innerHTML=`<div style="background:rgba(42,32,16,0.5);padding:2rem;border:1px solid #4a3820">${dispatchPage(page,content,state)}</div>`;},600);
    }
  },
};
