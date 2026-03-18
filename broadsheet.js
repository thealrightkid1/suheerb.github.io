import { dispatchPage } from './shared.js';
export default {
  id:'broadsheet', name:'Broadsheet', type:'A', dot:'#c8a040',
  css:`[data-env="broadsheet"]{--bg:#111008;--bg2:#1a1810;--fg:#f0e8c8;--fg2:#c8c0a0;--fg3:#7a7050;--acc:#c8a040;--acc2:#7a9a50;--acc3:#9a7040;--brd:rgba(240,232,200,0.09);--brd2:rgba(240,232,200,0.2);--fh:'Times New Roman',Georgia,serif;--fb:'Times New Roman',Georgia,serif;--fm:'Space Mono',monospace;--hs:normal;--hw:700}`,
  mount(c,page,content,state){c.innerHTML=dispatchPage(page,content,state);},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
};
