import { dispatchPage, foot } from './shared.js';
export default {
  id:'prison', name:'Intake Form', type:'B', dot:'#808080', ownNav:false,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    c.style.background='#e8e8e8';
    if(page==='home'||page==='about'){
      const cv=content.cv;
      c.innerHTML=`<div style="background:#e8e8e8;min-height:100vh;padding:3rem 2.5rem;font-family:Courier New,monospace">
        <div style="max-width:720px;margin:0 auto;background:#fff;border:2px solid #000;padding:0">
          <div style="background:#000;color:#fff;padding:8px 16px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;display:flex;justify-content:space-between">
            <span>INTAKE FORM / PERSONAL HISTORY</span><span>FORM MSB-001-A</span>
          </div>
          <div style="padding:1.5rem;border-bottom:1px solid #000">
            ${[['SURNAME','Baig'],['GIVEN NAME','Muhammad Suheer'],['PREFERRED','Suheer'],['CLASSIFICATION','Writer / Criminologist / Ghost'],['STATUS','Active'],['LOCATION','Remote / Worldwide'],['CONTACT','baigsuheer.s@gmail.com'],['RISK LEVEL','Low. High output.']].map(([k,v])=>`<div style="display:grid;grid-template-columns:180px 1fr;margin-bottom:8px;font-size:11px"><span style="font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.1em">${k}:</span><span style="border-bottom:1px solid #ddd;padding-bottom:2px">${v}</span></div>`).join('')}
          </div>
          <div style="padding:1.5rem;border-bottom:1px solid #000">
            <div style="font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.8rem">PRIOR ACTIVITIES (KNOWN)</div>
            ${cv.roles.map(r=>`<div style="font-size:10px;margin-bottom:6px;display:grid;grid-template-columns:100px 1fr;gap:8px"><span style="color:#666">${r.date}</span><span>${r.title} — ${r.org}</span></div>`).join('')}
          </div>
          <div style="padding:1.5rem;border-bottom:1px solid #000">
            <div style="font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.8rem">KNOWN OFFENSES</div>
            ${[['Writing in multiple voices simultaneously','Ongoing'],['Refusing disciplinary boundaries','Chronic'],['Holding contradictions without resolving them','Habitual'],['28 poems and counting','No remorse'],['One unsubmitted thesis','Pending']].map(([o,s])=>`<div style="font-size:10px;margin-bottom:4px;display:grid;grid-template-columns:1fr 80px"><span>${o}</span><span style="color:#cc0000;text-align:right">${s}</span></div>`).join('')}
          </div>
          <div style="padding:1rem;display:flex;gap:0.8rem;flex-wrap:wrap">
            ${['writing','poetry','hire'].map(p=>`<span style="font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#000;border:1px solid #000;padding:3px 10px;cursor:pointer" onclick="window.APP.navigate('${p}')">${p}</span>`).join('')}
          </div>
        </div>
      </div>`;
    } else {
      c.innerHTML=`<div style="background:#e8e8e8;min-height:100vh;padding:3rem 2.5rem;font-family:Courier New,monospace"><div style="font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#666;margin-bottom:2rem;cursor:pointer" onclick="window.APP.navigate('home')">← FORM INDEX</div><div style="max-width:680px;margin:0 auto;background:#fff;padding:2rem;border:2px solid #000">${dispatchPage(page,content,state)}</div></div>`;
    }
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
};
