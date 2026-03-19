// Registry of all environments
export const ENV_REGISTRY = [
  // ── TYPE A: SKINS ──────────────────────────────────────────────────
  { id:'marginalia',    name:'Marginalia',    type:'A', dot:'#b8914a', default_mode:'personal'   },
  { id:'casefile',      name:'Case File',     type:'A', dot:'#8b0000', default_mode:'both'        },
  { id:'broadsheet',    name:'Broadsheet',   type:'A', dot:'#c8a040', default_mode:'personal'   },
  { id:'receipt',       name:'Receipt',      type:'A', dot:'#555555', default_mode:'personal'   },
  { id:'ledger',        name:'Ledger',       type:'A', dot:'#8b2020', default_mode:'both'        },
  { id:'telegram',      name:'Telegram',     type:'A', dot:'#554433', default_mode:'personal'   },
  { id:'prodbible',     name:'Prod. Bible',  type:'A', dot:'#e84040', default_mode:'professional'},
  { id:'subtitle',      name:'Subtitle',     type:'A', dot:'#e0c870', default_mode:'professional'},

  // ── TYPE B: WORLDS ─────────────────────────────────────────────────
  { id:'terminal',      name:'Terminal',     type:'B', dot:'#39e07a', ownNav:true  },
  { id:'crimeboard',    name:'Crime Board',  type:'B', dot:'#cc2200', ownNav:false },
  { id:'typewriter',    name:'Typewriter',   type:'B', dot:'#d4b896', ownNav:false },
  { id:'particles',     name:'Particles',   type:'B', dot:'#b8914a', ownNav:true  },
  { id:'dossier',       name:'Dossier',     type:'B', dot:'#c8a040', ownNav:false },
  { id:'observatory',   name:'Observatory', type:'B', dot:'#7aa8e0', ownNav:true  },
  { id:'notebook',      name:'Notebook',    type:'B', dot:'#8b9060', ownNav:false },
  { id:'radio',         name:'Radio',       type:'B', dot:'#d4a855', ownNav:true  },
  { id:'autopsy',       name:'Autopsy',     type:'B', dot:'#aaaaaa', ownNav:false },
  { id:'filmreel',      name:'Film Reel',   type:'B', dot:'#888888', ownNav:true  },
  { id:'letter',        name:'Letter',      type:'B', dot:'#c4aa80', ownNav:false },
  { id:'chalkboard',    name:'Chalkboard',  type:'B', dot:'#d4d4b0', ownNav:false },
  { id:'seance',        name:'Séance',      type:'B', dot:'#9060a0', ownNav:false },
  { id:'weatherstation',name:'Weather Stn', type:'B', dot:'#60a0c0', ownNav:false },
  { id:'trackchanges',  name:'Track Changes',type:'B',dot:'#cc4444', ownNav:false },
  { id:'prison',        name:'Intake Form', type:'B', dot:'#808080', ownNav:false },
];

const _cache = new Map();

export async function loadEnv(id) {
  if (_cache.has(id)) return _cache.get(id);
  try {
    const mod = await import(`./envs/${id}.js`);
    _cache.set(id, mod.default);
    return mod.default;
  } catch(e) {
    console.error(`Failed to load env: ${id}`, e);
    // Return stub so the app doesn't crash
    return {
      id, name: id, type: 'A',
      css: '',
      mount(c, page, content, state) { renderStub(c, id, page, content, state); },
      navigate(page, content, state) { renderStub(document.getElementById('app'), id, page, content, state); },
      unmount() {},
      coldBoot(c, content, state) { renderStub(c, id, 'home', content, state); },
    };
  }
}

function renderStub(c, id, page, content, state) {
  c.innerHTML = `<div style="padding:4rem 2.5rem;font-family:var(--fm);color:var(--fg3);font-size:0.7rem;letter-spacing:0.1em">
    <p style="color:var(--acc);margin-bottom:1rem">${id} — loading environment</p>
    <p>This environment is being built. Using default rendering.</p>
  </div>`;
}

export function getEnvMeta(id) {
  return ENV_REGISTRY.find(e => e.id === id);
}
