import { dispatchPage } from './shared.js';
export default {
  id:'casefile', name:'Case File', type:'A', dot:'#8b0000',
  css:`[data-env="casefile"]{--bg:#f0ece0;--bg2:#e4e0d4;--fg:#1a1814;--fg2:#3a3630;--fg3:#888070;--acc:#8b0000;--acc2:#1a1814;--acc3:#554433;--brd:rgba(26,24,20,0.12);--brd2:rgba(26,24,20,0.28);--fh:'Courier New',monospace;--fb:'Courier New',monospace;--fm:'Courier New',monospace;--hs:normal;--hw:700}`,
  mount(c,page,content,state){c.innerHTML=dispatchPage(page,content,state);},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
};
