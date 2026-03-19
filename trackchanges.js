import { dispatchPage } from './shared.js';
export default {
  id:'marginalia', name:'Marginalia', type:'A', dot:'#b8914a',
  css:`
    [data-env="marginalia"]{--bg:#0d0c0a;--bg2:#1a1814;--fg:#f0ead8;--fg2:#c4baa8;--fg3:#7a7060;--acc:#b8914a;--acc2:#39e07a;--acc3:#d4735f;--brd:rgba(240,234,216,0.08);--brd2:rgba(240,234,216,0.18);--fh:'Cormorant Garamond',Georgia,serif;--fb:'EB Garamond',Georgia,serif;--fm:'Space Mono',monospace;--hs:italic;--hw:300}`,
  mount(c,page,content,state){c.innerHTML=dispatchPage(page,content,state);this._bind();},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  _bind(){
    document.querySelectorAll('.ftab').forEach(t=>t.addEventListener('click',()=>{
      document.querySelectorAll('.ftab').forEach(x=>x.classList.remove('on'));
      t.classList.add('on');
      const cat=t.dataset.cat;
      const out=document.getElementById('posts-out');
      if(out){const {CONTENT}=window.APP;const shown=cat==='all'?CONTENT.essays:CONTENT.essays.filter(e=>e.cat===cat);const{renderCard}=window._shared;out.innerHTML=shown.map(renderCard).join('');}
    }));
  }
};
