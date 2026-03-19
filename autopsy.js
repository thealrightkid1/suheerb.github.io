import { dispatchPage } from './shared.js';
export default {
  id:'subtitle', name:'Subtitle', type:'A', dot:'#e0c870',
  css:`[data-env="subtitle"]{--bg:#000;--bg2:#0a0a0a;--fg:#fff;--fg2:#ccc;--fg3:#555;--acc:#e0c870;--acc2:#888;--acc3:#444;--brd:rgba(255,255,255,0.07);--brd2:rgba(255,255,255,0.14);--fh:'Space Mono',monospace;--fb:'Space Mono',monospace;--fm:'Space Mono',monospace;--hs:normal;--hw:400}
  [data-env="subtitle"] .lbl::before{content:'00:00:00,000 → '}
  [data-env="subtitle"] .card-meta::before{content:'TC '}`,
  mount(c,page,content,state){c.innerHTML=dispatchPage(page,content,state);},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
};
