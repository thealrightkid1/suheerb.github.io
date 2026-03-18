import { dispatchPage } from './shared.js';
export default {
  id:'chalkboard', name:'Chalkboard', type:'B', dot:'#d4d4b0', ownNav:false,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    c.style.background='#1a2018';
    c.innerHTML=`<div style="background:#1a2018;min-height:100vh;padding:3rem 2.5rem;background-image:repeating-linear-gradient(to right,rgba(255,255,255,0.01) 0px,rgba(255,255,255,0.01) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(to bottom,rgba(255,255,255,0.01) 0px,rgba(255,255,255,0.01) 1px,transparent 1px,transparent 40px)">
      <div id="chalk-inner" style="max-width:800px;margin:0 auto;color:#e8e8d4;opacity:0.9">
        ${dispatchPage(page,content,state)}
      </div>
    </div>`;
    const inner=document.getElementById('chalk-inner');
    if(inner){
      inner.querySelectorAll('.hd').forEach(h=>{h.style.fontFamily='cursive,Georgia,serif';h.style.textShadow='1px 1px 0 rgba(255,255,255,0.08)';});
      inner.querySelectorAll('.card-title').forEach(h=>{h.style.fontFamily='cursive,Georgia,serif';});
      inner.querySelectorAll('.plines').forEach(h=>{h.style.fontFamily='cursive,Georgia,serif';});
      inner.querySelectorAll('p').forEach(p=>{p.style.textShadow='0.5px 0.5px 0 rgba(255,255,255,0.05)';});
    }
    ['--fg','--fg2','--fg3','--acc','--acc2'].forEach(v=>{});
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
};
