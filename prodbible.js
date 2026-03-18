import { dispatchPage } from './shared.js';
export default {
  id:'prodbible', name:'Prod. Bible', type:'A', dot:'#e84040',
  css:`[data-env="prodbible"]{--bg:#0a0a0f;--bg2:#111118;--fg:#e8e0f0;--fg2:#a09ab0;--fg3:#555;--acc:#e84040;--acc2:#e84040;--acc3:#a08080;--brd:rgba(232,224,240,0.07);--brd2:rgba(232,224,240,0.15);--fh:'Space Mono',monospace;--fb:'Space Mono',monospace;--fm:'Space Mono',monospace;--hs:normal;--hw:700}
  [data-env="prodbible"] .lbl::before{content:'INT. '}
  [data-env="prodbible"] .hd{letter-spacing:0.04em}`,
  mount(c,page,content,state){c.innerHTML=dispatchPage(page,content,state);},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
};
