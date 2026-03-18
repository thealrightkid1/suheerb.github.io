import { dispatchPage } from './shared.js';
export default {
  id:'telegram', name:'Telegram', type:'A', dot:'#554433',
  css:`[data-env="telegram"]{--bg:#f5f0e4;--bg2:#ece8dc;--fg:#2a2418;--fg2:#554433;--fg3:#998877;--acc:#2a2418;--acc2:#554433;--acc3:#998877;--brd:rgba(42,36,24,0.13);--brd2:rgba(42,36,24,0.25);--fh:'Courier New',monospace;--fb:'Courier New',monospace;--fm:'Courier New',monospace;--hs:normal;--hw:700}
  [data-env="telegram"] .hd{text-transform:uppercase;letter-spacing:0.06em}
  [data-env="telegram"] .lbl::after{content:' STOP';opacity:0.5}
  [data-env="telegram"] .tag::after{content:' STOP';font-size:0.45em;opacity:0.4}`,
  mount(c,page,content,state){c.innerHTML=dispatchPage(page,content,state);},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
};
