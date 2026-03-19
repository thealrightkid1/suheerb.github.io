import { dispatchPage } from './shared.js';
export default {
  id:'receipt', name:'Receipt', type:'A', dot:'#555',
  css:`[data-env="receipt"]{--bg:#f7f5f0;--bg2:#eeeae4;--fg:#1a1a18;--fg2:#555;--fg3:#999;--acc:#1a1a18;--acc2:#999;--acc3:#777;--brd:rgba(0,0,0,0.1);--brd2:rgba(0,0,0,0.22);--fh:'Courier New',monospace;--fb:'Courier New',monospace;--fm:'Courier New',monospace;--hs:normal;--hw:700}`,
  mount(c,page,content,state){c.innerHTML=dispatchPage(page,content,state);},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
};
