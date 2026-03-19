import { dispatchPage } from './shared.js';
export default {
  id:'notebook', name:'Notebook', type:'B', dot:'#8b9060', ownNav:false,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    c.style.background='#f4f0e4';
    const inner=dispatchPage(page,content,state);
    c.innerHTML=`<div style="background:#f4f0e4;min-height:100vh;background-image:repeating-linear-gradient(to bottom,transparent 0px,transparent 30px,rgba(100,140,200,0.12) 30px,rgba(100,140,200,0.12) 31px);padding:0">
      <div style="position:absolute;left:60px;top:0;bottom:0;width:1px;background:rgba(220,80,80,0.2);pointer-events:none"></div>
      <div style="max-width:720px;margin:0 auto;padding:3rem 3rem 3rem 4.5rem;position:relative">
        <div style="position:absolute;top:20px;right:2rem;font-family:cursive;font-size:11px;color:#8b6040;transform:rotate(2deg);opacity:0.6">March 2025 →</div>
        ${inner}
      </div>
      <div style="position:absolute;top:80px;right:2rem;max-width:120px;font-family:cursive;font-size:10px;color:#8b6040;line-height:1.8;opacity:0.5;transform:rotate(1.5deg)">
        note to self:<br>"stay in the image"
      </div>
    </div>`;
    c.querySelectorAll('.hd').forEach(h=>{h.style.fontFamily='cursive, Georgia, serif';h.style.color='#2a2010';});
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
};
