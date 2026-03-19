import { dispatchPage } from './shared.js';
export default {
  id:'ledger', name:'Ledger', type:'A', dot:'#8b2020',
  css:`[data-env="ledger"]{--bg:#f4f0e4;--bg2:#e8e4d8;--fg:#2a2418;--fg2:#554433;--fg3:#887766;--acc:#8b2020;--acc2:#556644;--acc3:#776655;--brd:rgba(42,36,24,0.13);--brd2:rgba(42,36,24,0.28);--fh:'Cormorant Garamond',Georgia,serif;--fb:'EB Garamond',Georgia,serif;--fm:'Courier New',monospace;--hs:italic;--hw:400}
  [data-env="ledger"] #app{background-image:repeating-linear-gradient(to bottom,transparent 0px,transparent 27px,rgba(42,36,24,0.05) 27px,rgba(42,36,24,0.05) 28px)}`,
  mount(c,page,content,state){c.innerHTML=dispatchPage(page,content,state);},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
};
