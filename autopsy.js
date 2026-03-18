import { dispatchPage, foot } from './shared.js';
export default {
  id:'autopsy', name:'Autopsy', type:'B', dot:'#aaaaaa', ownNav:false,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    c.style.background='#f5f5f5';
    if(page==='home'||page==='about'){
      const cv=content.cv;
      c.innerHTML=`<div style="background:#f5f5f5;min-height:100vh;padding:3rem 2.5rem;font-family:Courier New,monospace">
        <div style="max-width:720px;margin:0 auto;background:#fff;padding:2.5rem;border:1px solid #ccc">
          <div style="text-align:center;border-bottom:2px solid #000;padding-bottom:1rem;margin-bottom:1.5rem">
            <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#666;margin-bottom:4px">OFFICE OF THE MEDICAL EXAMINER — LITERARY DIVISION</div>
            <div style="font-size:18px;font-weight:700;letter-spacing:0.06em">CASE REPORT / SUBJECT EXAMINATION</div>
            <div style="font-size:9px;color:#666;margin-top:4px">CASE NO. MSB-2025-001 / STATUS: ONGOING / CAUSE: EXCESSIVE CURIOSITY</div>
          </div>
          <table style="width:100%;font-size:11px;border-collapse:collapse;margin-bottom:1.5rem">
            ${[['SUBJECT NAME','M. Suheer Baig'],['DATE OF EXAMINATION',new Date().toLocaleDateString()],['OCCUPATION','Writer · Editor · Ghostwriter · Criminologist'],['KNOWN ALIASES','The Ghost, The Night Shift, The Contradiction'],['LAST KNOWN LOCATION','Third Floor, Zamzama, Karachi'],['CAUSE OF CONDITION','Unresolved curiosity; excessive field breadth'],['PROGNOSIS','Ongoing. No cure anticipated.']].map(([k,v])=>`<tr><td style="padding:6px 8px;border:1px solid #ddd;color:#666;width:35%;font-weight:700">${k}</td><td style="padding:6px 8px;border:1px solid #ddd">${v}</td></tr>`).join('')}
          </table>
          <div style="font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;border-bottom:1px solid #000;padding-bottom:4px;margin-bottom:0.8rem">FINDINGS</div>
          ${[['Poems recovered',`${content.poems.length} specimens. Ranging from elegy to theology. All intact.`],['Editorial credits','Netflix, Apple TV+, BBC, Sony, Paramount, Warner Bros. 400+ cases.'],['Contradictions identified','Humanities-STEM dual orientation. No signs of resolution.'],['Unresolved items','One criminology thesis. Status: pending. Duration: unknown.'],['Voice samples','Ghostwriting: multiple. Own voice: one. Quality: high.']].map(([k,v])=>`<div style="display:grid;grid-template-columns:200px 1fr;gap:8px;font-size:11px;margin-bottom:8px"><span style="font-weight:700">${k}:</span><span style="color:#333">${v}</span></div>`).join('')}
          <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid #000;font-size:10px;color:#666">EXAMINER'S NOTE: Subject continues to write in the margins of every discipline. No containment expected. Recommend: continued observation. — Contact: baigsuheer.s@gmail.com</div>
        </div>
        <div style="margin-top:1.5rem;display:flex;gap:0.8rem;flex-wrap:wrap">
          ${['writing','poetry','hire'].map(p=>`<span style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#666;border:1px solid #ccc;padding:4px 10px;cursor:pointer" onclick="window.APP.navigate('${p}')">${p} →</span>`).join('')}
        </div>
      </div>`;
    } else {
      c.innerHTML=`<div style="background:#f5f5f5;min-height:100vh;padding:3rem 2.5rem;font-family:Courier New,monospace"><div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#666;margin-bottom:2rem;cursor:pointer" onclick="window.APP.navigate('home')">← CASE FILE INDEX</div><div style="max-width:680px;margin:0 auto;background:#fff;padding:2rem;border:1px solid #ccc">${dispatchPage(page,content,state)}</div></div>`;
    }
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
};
