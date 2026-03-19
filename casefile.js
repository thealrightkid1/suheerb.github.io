import { dispatchPage } from './shared.js';
export default {
  id:'dossier', name:'Dossier', type:'B', dot:'#c8a040', ownNav:false,
  coldBoot(c,content,state){this._buildFolders(c,content,state);},
  mount(c,page,content,state){
    if(page==='home'){this._buildFolders(c,content,state);}
    else{
      c.style.background='#e8e0c8';
      c.innerHTML=`<div style="background:#e8e0c8;min-height:100vh;padding:3rem 2.5rem">
        <div style="font-family:Courier New,monospace;font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#8b6020;margin-bottom:2rem;cursor:pointer" onclick="window.APP.navigate('home')">← RETURN TO DOSSIER</div>
        <div style="max-width:680px;margin:0 auto;background:#f4f0e4;padding:2rem;border:1px solid #c8b890;box-shadow:3px 3px 0 rgba(0,0,0,0.1)">
          ${dispatchPage(page,content,state)}
        </div>
      </div>`;
    }
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  _buildFolders(c,content,state){
    c.style.background='#c8b890';
    const folders=[
      {id:'about',label:'SUBJECT PROFILE',stamp:'CLASSIFIED',color:'#e8c840',pages:['Criminologist. Poet. Ghost.','BSc Criminology, UoK','eBook Production Manager, Ariatech','Editorial credits: Netflix, BBC, Sony...']},
      {id:'writing',label:'FILED REPORTS',stamp:'ON RECORD',color:'#40a860',pages:content.essays.slice(0,3).map(e=>e.title)},
      {id:'poetry',label:'EXHIBIT A — VERSE',stamp:'EVIDENCE',color:'#4080c8',pages:content.poems.slice(0,3).map(p=>p.title)},
      {id:'hire',label:'SERVICES RENDERED',stamp:'ACTIVE',color:'#c84040',pages:content.cv.services.map(s=>s.name)},
    ];
    c.innerHTML=`<div style="background:#c8b890;min-height:calc(100vh - 55px);padding:3rem 2.5rem;background-image:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,0,0.02) 10px,rgba(0,0,0,0.02) 20px)">
      <div style="font-family:Courier New,monospace;font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#8b6020;margin-bottom:2.5rem">DOSSIER — M. SUHEER BAIG — EYES ONLY</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.5rem">
        ${folders.map(f=>`
        <div onclick="window.APP.navigate('${f.id}')" style="cursor:pointer;transform-origin:top center;transition:transform 0.2s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
          <div style="height:8px;background:${f.color};"></div>
          <div style="background:#f4f0e4;padding:1.2rem 1rem;border:1px solid #c8b890;border-top:none;box-shadow:2px 3px 0 rgba(0,0,0,0.15)">
            <div style="font-family:Courier New,monospace;font-size:7px;letter-spacing:0.2em;text-transform:uppercase;color:#8b6020;margin-bottom:0.8rem">${f.label}</div>
            <div style="display:inline-block;font-family:Courier New,monospace;font-size:10px;font-weight:700;color:${f.color};border:2px solid ${f.color};padding:2px 6px;letter-spacing:0.1em;margin-bottom:0.8rem;transform:rotate(-2deg)">${f.stamp}</div>
            <ul style="font-family:Courier New,monospace;font-size:10px;color:#554433;line-height:1.7;padding-left:1rem">
              ${f.pages.map(p=>`<li>${p}</li>`).join('')}
            </ul>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  },
};
