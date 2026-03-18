import { dispatchPage, foot } from './shared.js';
export default {
  id:'weatherstation', name:'Weather Stn', type:'B', dot:'#60a0c0', ownNav:false,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    if(page==='home'||page==='about'){
      c.style.background='#0a1520';
      const now=new Date();
      c.innerHTML=`<div style="background:#0a1520;min-height:100vh;padding:3rem 2.5rem;font-family:Space Mono,monospace;color:#80c0e0">
        <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#405060;margin-bottom:2rem">STATION MSB-KHI / ${now.toISOString().slice(0,10)} / ${now.toTimeString().slice(0,5)} PKT</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1px;background:#1a2530;border:1px solid #1a2530;margin-bottom:2.5rem">
          ${[['OUTPUT','28 poems','↑ active'],['PROJECTS','400+ delivered','stable'],['VOICES','∞ inhabited','ongoing'],['THESIS','1 unsubmitted','⚠ pending'],['CONTRADICTION','2.0 / scale','normal'],['MOOD','unsettled','→ writing']].map(([k,v,s])=>`<div style="background:#0a1520;padding:1.2rem"><div style="font-size:7px;letter-spacing:0.2em;color:#405060;margin-bottom:0.4rem">${k}</div><div style="font-size:1.4rem;color:#80c0e0;margin-bottom:0.2rem">${v}</div><div style="font-size:9px;color:#60a080">${s}</div></div>`).join('')}
        </div>
        <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#405060;margin-bottom:1rem">FORECAST</div>
        <div style="font-family:Cormorant Garamond,Georgia,serif;font-size:1.2rem;font-style:italic;color:#a0d0e8;line-height:1.85;max-width:500px">Continued writing. Probability of essay: high. Poetry front moving in from the east. Visibility: low. Conditions: productive.</div>
        <div style="margin-top:2.5rem;display:flex;gap:1rem;flex-wrap:wrap">
          ${['writing','poetry','about','hire'].map(p=>`<span style="font-size:0.52rem;letter-spacing:0.14em;text-transform:uppercase;color:#60a0c0;border:1px solid #1a3040;padding:4px 10px;cursor:pointer" onclick="window.APP.navigate('${p}')">${p} →</span>`).join('')}
        </div>
      </div>`;
    } else {
      c.style.background='#0a1520';
      c.innerHTML=`<div style="background:#0a1520;min-height:100vh;padding:3rem 2.5rem;font-family:Space Mono,monospace;color:#80c0e0">
        <div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#405060;margin-bottom:2rem;cursor:pointer" onclick="window.APP.navigate('home')">← STATION HOME</div>
        ${dispatchPage(page,content,state)}
      </div>`;
    }
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
};
