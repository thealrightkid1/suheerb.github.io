import { dispatchPage } from './shared.js';
export default {
  id:'filmreel', name:'Film Reel', type:'B', dot:'#888', ownNav:true,
  coldBoot(c,content,state){this._build(c,content,state);},
  mount(c,page,content,state){
    if(page==='home'){this._build(c,content,state);}
    else{
      c.style.background='#0a0a0a';
      c.innerHTML=`<div style="background:#0a0a0a;min-height:100vh;padding:3rem 2.5rem;color:#e0e0e0">
        <div style="font-family:Space Mono,monospace;font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#666;margin-bottom:2rem;cursor:pointer" onclick="window.APP.navigate('home')">← REEL INDEX</div>
        ${dispatchPage(page,content,state)}
      </div>`;
    }
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  _build(c,content,state){
    c.style.background='#0a0a0a';
    const frames=[
      {id:'home',num:'00',label:'TITLE CARD',sub:'M. SUHEER BAIG'},
      {id:'about',num:'01',label:'SUBJECT',sub:'BIOGRAPHY'},
      ...content.essays.slice(0,5).map((e,i)=>({id:`post/${e.id}`,num:String(i+2).padStart(2,'0'),label:e.cat.toUpperCase(),sub:e.title.slice(0,30)})),
      {id:'poetry',num:'08',label:'VERSE',sub:'28 POEMS'},
      {id:'hire',num:'09',label:'END CREDITS',sub:'AVAILABLE FOR HIRE'},
    ];
    c.innerHTML=`<div style="background:#0a0a0a;min-height:calc(100vh - 55px);overflow-x:auto;overflow-y:hidden;display:flex;align-items:center;padding:0">
      <div style="display:flex;gap:0;flex-shrink:0;padding:2rem 3rem">
        ${frames.map(f=>`
        <div onclick="window.APP.navigate('${f.id}')" style="cursor:pointer;flex-shrink:0;width:180px;position:relative;transition:filter 0.2s" onmouseover="this.style.filter='brightness(1.3)'" onmouseout="this.style.filter='none'">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px">${Array(8).fill(0).map(()=>`<div style="width:14px;height:10px;background:#1a1a1a;border:1px solid #333"></div>`).join('')}</div>
          <div style="background:#1a1a1a;height:120px;border:2px solid #333;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0.8rem">
            <div style="font-family:Space Mono,monospace;font-size:8px;letter-spacing:0.1em;color:#555;margin-bottom:4px">${f.num}</div>
            <div style="font-family:Space Mono,monospace;font-size:8px;letter-spacing:0.15em;text-transform:uppercase;color:#e0c870;margin-bottom:6px">${f.label}</div>
            <div style="font-family:Cormorant Garamond,Georgia,serif;font-size:13px;font-style:italic;color:#e0e0e0;text-align:center;line-height:1.3">${f.sub}</div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:2px">${Array(8).fill(0).map(()=>`<div style="width:14px;height:10px;background:#1a1a1a;border:1px solid #333"></div>`).join('')}</div>
          <div style="font-family:Space Mono,monospace;font-size:7px;color:#444;text-align:center;margin-top:4px;letter-spacing:0.1em">${f.num}/09 ↗</div>
        </div>`).join('')}
      </div>
    </div>`;
  },
};
