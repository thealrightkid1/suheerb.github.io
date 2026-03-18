import { CONTENT } from './content.js';
import { ENV_REGISTRY, loadEnv, getEnvMeta } from './envs/loader.js';

// ── STATE ────────────────────────────────────────────────────────────
const STATE = {
  mode: 'personal',   // 'personal' | 'professional'
  page: 'home',
  env: 'marginalia',
  font: 'literary',
  size: 'medium',
  a11y: new Set(),    // 'high-contrast' | 'no-motion' | 'dyslexia' | 'underline-links'
};

// ── FONT CATALOGUE ────────────────────────────────────────────────────
const FONTS = [
  {
    id: 'literary',
    label: 'Literary',
    desc: 'Cormorant + EB Garamond',
    url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
    vars: { '--fh': "'Cormorant Garamond',Georgia,serif", '--fb': "'EB Garamond',Georgia,serif", '--fm': "'Space Mono',monospace", '--hs': 'italic', '--hw': '300' },
  },
  {
    id: 'modern',
    label: 'Modern',
    desc: 'Inter + Space Mono',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
    vars: { '--fh': "'Inter',system-ui,sans-serif", '--fb': "'Inter',system-ui,sans-serif", '--fm': "'Space Mono',monospace", '--hs': 'normal', '--hw': '600' },
  },
  {
    id: 'humanist',
    label: 'Humanist',
    desc: 'Lora + Source Sans',
    url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=Source+Sans+3:wght@300;400;600&family=Space+Mono:wght@400&display=swap',
    vars: { '--fh': "'Lora',Georgia,serif", '--fb': "'Source Sans 3',Georgia,sans-serif", '--fm': "'Space Mono',monospace", '--hs': 'italic', '--hw': '400' },
  },
  {
    id: 'geometric',
    label: 'Geometric',
    desc: 'DM Serif + DM Mono',
    url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap',
    vars: { '--fh': "'DM Serif Display',Georgia,serif", '--fb': "'DM Mono',monospace", '--fm': "'DM Mono',monospace", '--hs': 'italic', '--hw': '400' },
  },
  {
    id: 'editorial',
    label: 'Editorial',
    desc: 'Playfair + Libre Baskerville',
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400&display=swap',
    vars: { '--fh': "'Playfair Display',Georgia,serif", '--fb': "'Libre Baskerville',Georgia,serif", '--fm': "'Space Mono',monospace", '--hs': 'italic', '--hw': '700' },
  },
  {
    id: 'minimal',
    label: 'Minimal',
    desc: 'Outfit + JetBrains Mono',
    url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=JetBrains+Mono:ital,wght@0,300;0,400;1,300&display=swap',
    vars: { '--fh': "'Outfit',system-ui,sans-serif", '--fb': "'Outfit',system-ui,sans-serif", '--fm': "'JetBrains Mono',monospace", '--hs': 'normal', '--hw': '300' },
  },
  {
    id: 'dyslexia',
    label: 'OpenDyslexic',
    desc: 'Accessibility-optimised',
    url: 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600&display=swap',
    vars: { '--fh': "'Lexend',sans-serif", '--fb': "'Lexend',sans-serif", '--fm': "'Lexend',sans-serif", '--hs': 'normal', '--hw': '400' },
    dyslexia: true,
  },
];

// ── NAV CONFIGS ───────────────────────────────────────────────────────
const NAV_PERSONAL = [
  { label: 'Home', page: 'home' },
  { label: 'Writing', page: 'writing' },
  { label: 'Verse', page: 'poetry' },
  { label: 'About', page: 'about' },
  { label: 'Hire', page: 'hire' },
];
const NAV_PROFESSIONAL = [
  { label: 'Home', page: 'pro-home' },
  { label: 'Services', page: 'services' },
  { label: 'Credentials', page: 'pro-about' },
  { label: 'Contact', page: 'contact' },
];

// ── ELEMENTS ──────────────────────────────────────────────────────────
const $entry    = document.getElementById('entry');
const $nav      = document.getElementById('nav');
const $app      = document.getElementById('app');
const $switcher = document.getElementById('switcher');
const $track    = document.getElementById('switcher-track');
const $navLinks = document.getElementById('nav-links');
const $wipe     = document.getElementById('wipe');
const $settings = document.getElementById('settings-panel');
const $settBtn  = document.getElementById('settings-btn');
const $settClose= document.getElementById('settings-close');
const $fontOpts = document.getElementById('font-options');
const $sideBtn  = document.getElementById('switch-side-btn');
const $fontLink = document.getElementById('font-link');

// ── CURRENT ENV HANDLE ─────────────────────────────────────────────────
let CURRENT_ENV = null;

// ── WIPE TRANSITION ───────────────────────────────────────────────────
function wipe(cb, color) {
  if (STATE.a11y.has('no-motion')) { cb(); return; }
  $wipe.style.background = color || (CURRENT_ENV?.dot || '#b8914a');
  $wipe.classList.add('on');
  setTimeout(() => { cb(); $wipe.classList.remove('on'); }, 280);
}

// ── ENTRY ─────────────────────────────────────────────────────────────
document.querySelectorAll('.door').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    $entry.classList.add('gone');
    STATE.mode = mode;
    const defaultEnv = mode === 'professional' ? 'prodbible' : 'marginalia';
    setTimeout(() => {
      $entry.style.display = 'none';
      showChrome();
      switchEnv(defaultEnv, true);
    }, 500);
  });
});

function showChrome() {
  $nav.removeAttribute('hidden');
  $switcher.removeAttribute('hidden');
  buildNavLinks();
  buildSwitcher();
  updateSideBtn();
}

// ── NAV ───────────────────────────────────────────────────────────────
function buildNavLinks() {
  const links = STATE.mode === 'professional' ? NAV_PROFESSIONAL : NAV_PERSONAL;
  $navLinks.innerHTML = links.map(l =>
    `<li><a href="#${l.page}" data-page="${l.page}">${l.label}</a></li>`
  ).join('');
  $navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      navigate(a.dataset.page);
    });
  });
  updateNavActive();
}

function updateNavActive() {
  $navLinks.querySelectorAll('a').forEach(a => {
    a.classList.toggle('on', a.dataset.page === STATE.page);
  });
}

// ── SWITCHER ──────────────────────────────────────────────────────────
function buildSwitcher() {
  const envs = STATE.mode === 'professional'
    ? ENV_REGISTRY.filter(e => e.default_mode === 'professional' || e.default_mode === 'both' || e.type === 'B')
    : ENV_REGISTRY;

  $track.innerHTML = envs.map(e =>
    `<button class="sw-btn${e.id === STATE.env ? ' on' : ''}" data-env="${e.id}">
      <span class="dot" style="background:${e.dot}"></span>${e.name}
    </button>`
  ).join('');

  $track.querySelectorAll('.sw-btn').forEach(btn => {
    btn.addEventListener('click', () => switchEnv(btn.dataset.env));
  });

  document.getElementById('switcher-back').addEventListener('click', () => {
    $track.scrollBy({ left: -200, behavior: 'smooth' });
  });
  document.getElementById('switcher-fwd').addEventListener('click', () => {
    $track.scrollBy({ left: 200, behavior: 'smooth' });
  });
}

function updateSwitcherActive() {
  $track.querySelectorAll('.sw-btn').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.env === STATE.env);
  });
}

// ── SETTINGS PANEL ────────────────────────────────────────────────────
$settBtn.addEventListener('click', () => {
  $settings.toggleAttribute('hidden');
});
$settClose.addEventListener('click', () => $settings.setAttribute('hidden', ''));

// Build font options
$fontOpts.innerHTML = FONTS.map(f =>
  `<button class="opt-btn${f.id === STATE.font ? ' on' : ''}" data-font="${f.id}" title="${f.desc}">${f.label}</button>`
).join('');

$fontOpts.querySelectorAll('[data-font]').forEach(btn => {
  btn.addEventListener('click', () => {
    setFont(btn.dataset.font);
    $fontOpts.querySelectorAll('[data-font]').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  });
});

// Size options
document.querySelectorAll('[data-action="size"]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-action="size"]').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    setSize(btn.dataset.val);
  });
});

// A11y options
document.querySelectorAll('[data-action="a11y"]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('on');
    toggleA11y(btn.dataset.val);
  });
});

function setFont(id) {
  const font = FONTS.find(f => f.id === id);
  if (!font) return;
  STATE.font = id;
  // Load font URL
  $fontLink.href = font.url;
  // Apply CSS variables to :root
  const root = document.documentElement;
  if (!STATE.a11y.has('dyslexia') || font.dyslexia) {
    Object.entries(font.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }
  // Dyslexia font is also a11y toggle
  if (font.dyslexia) {
    document.body.classList.add('a11y-dyslexia');
    STATE.a11y.add('dyslexia');
    syncA11yBtns();
  }
  document.documentElement.dataset.font = id;
}

function setSize(sz) {
  STATE.size = sz;
  document.body.classList.remove('size-small', 'size-medium', 'size-large');
  if (sz !== 'medium') document.body.classList.add('size-' + sz);
}

function toggleA11y(val) {
  if (STATE.a11y.has(val)) {
    STATE.a11y.delete(val);
    document.body.classList.remove('a11y-' + val.replace('-','_').replace('high-contrast','contrast').replace('no-motion','no-motion').replace('underline-links','underline-links'));
    document.body.classList.remove('a11y-contrast', 'a11y-no-motion', 'a11y-dyslexia', 'a11y-underline-links');
    // Re-apply all remaining
    STATE.a11y.forEach(v => applyA11y(v));
    // If dyslexia was removed, restore current font vars
    if (val === 'dyslexia') {
      const font = FONTS.find(f => f.id === STATE.font);
      if (font && !font.dyslexia) {
        const root = document.documentElement;
        Object.entries(font.vars).forEach(([k, v]) => root.style.setProperty(k, v));
      }
    }
  } else {
    STATE.a11y.add(val);
    applyA11y(val);
    // Dyslexia: load Lexend
    if (val === 'dyslexia') {
      $fontLink.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600&display=swap';
    }
  }
}

function applyA11y(val) {
  const map = {
    'high-contrast': 'a11y-contrast',
    'no-motion': 'a11y-no-motion',
    'dyslexia': 'a11y-dyslexia',
    'underline-links': 'a11y-underline-links',
  };
  if (map[val]) document.body.classList.add(map[val]);
}

function syncA11yBtns() {
  document.querySelectorAll('[data-action="a11y"]').forEach(btn => {
    btn.classList.toggle('on', STATE.a11y.has(btn.dataset.val));
  });
}

// Side switcher button
function updateSideBtn() {
  $sideBtn.textContent = STATE.mode === 'personal' ? '→ Professional side' : '← Personal side';
}

$sideBtn.addEventListener('click', () => {
  switchSide();
  $settings.setAttribute('hidden', '');
});

// ── NAVIGATION ────────────────────────────────────────────────────────
function navigate(page) {
  if (!CURRENT_ENV) return;
  STATE.page = page;
  updateNavActive();

  const meta = getEnvMeta(STATE.env);
  if (meta?.type === 'B' && CURRENT_ENV.navigate) {
    CURRENT_ENV.navigate(page, CONTENT, STATE);
  } else {
    CURRENT_ENV.navigate(page, CONTENT, STATE);
  }

  // Bind filter tabs after render
  setTimeout(bindFilterTabs, 0);
}

function bindFilterTabs() {
  document.querySelectorAll('.ftab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.ftab').forEach(x => x.classList.remove('on'));
      t.classList.add('on');
      const cat = t.dataset.cat;
      const out = document.getElementById('posts-out');
      if (out) {
        const shown = cat === 'all' ? CONTENT.essays : CONTENT.essays.filter(e => e.cat === cat);
        out.innerHTML = shown.map(e => renderCard(e)).join('');
      }
    });
  });
}

function renderCard(essay) {
  const cc = essay.cat === 'criminology' ? 'c3' : essay.cat === 'stem' ? 'c2' : '';
  return `<button class="card" onclick="window.APP.navigate('post/${essay.id}')">
    <span class="card-cat ${cc}">${essay.cat === 'stem' ? 'STEM × Hum.' : essay.cat}</span>
    <h3 class="card-title">${essay.title}</h3>
    <p class="card-exc">${essay.exc}</p>
    <p class="card-meta">${essay.date} · ${essay.time} min</p>
  </button>`;
}

// ── ENV SWITCHING ─────────────────────────────────────────────────────
async function switchEnv(id, cold = false) {
  const meta = getEnvMeta(id);
  const env = await loadEnv(id);

  wipe(async () => {
    // Unmount current
    if (CURRENT_ENV?.unmount) CURRENT_ENV.unmount();

    // Inject env CSS if Type A
    const styleEl = document.getElementById('env-style') || (() => {
      const s = document.createElement('style');
      s.id = 'env-style';
      document.head.appendChild(s);
      return s;
    })();

    if (meta?.type === 'A' && env.css) {
      styleEl.textContent = env.css;
      document.documentElement.dataset.env = id;
    } else {
      styleEl.textContent = '';
      document.documentElement.dataset.env = id;
    }

    // Show/hide standard nav for Type B own-nav
    if (meta?.ownNav) {
      $nav.classList.add('own-nav');
    } else {
      $nav.classList.remove('own-nav');
    }

    CURRENT_ENV = env;
    STATE.env = id;

    // Decide page for this mode
    if (cold || STATE.page === 'home') {
      const defaultPage = STATE.mode === 'professional' ? 'pro-home' : 'home';
      STATE.page = defaultPage;
      if (cold && env.coldBoot) {
        env.coldBoot($app, CONTENT, STATE);
      } else {
        env.mount($app, STATE.page, CONTENT, STATE);
      }
    } else {
      env.mount($app, STATE.page, CONTENT, STATE);
    }

    updateSwitcherActive();
    updateNavActive();
    setTimeout(bindFilterTabs, 50);
  }, meta?.dot);
}

function switchEnvByName(name) {
  const match = ENV_REGISTRY.find(e =>
    e.name.toLowerCase().includes(name) || e.id.includes(name)
  );
  if (match) switchEnv(match.id);
}

// ── SIDE SWITCH ───────────────────────────────────────────────────────
function switchSide() {
  STATE.mode = STATE.mode === 'personal' ? 'professional' : 'personal';
  const defaultPage = STATE.mode === 'professional' ? 'pro-home' : 'home';
  STATE.page = defaultPage;
  buildNavLinks();
  updateSideBtn();
  buildSwitcher();

  const defaultEnv = STATE.mode === 'professional' ? 'prodbible' : 'marginalia';
  switchEnv(defaultEnv, true);
}

// ── HASH ROUTING ──────────────────────────────────────────────────────
window.addEventListener('hashchange', () => {
  const page = location.hash.slice(1);
  if (page && CURRENT_ENV) navigate(page);
});

// ── GLOBAL APP API ────────────────────────────────────────────────────
window.APP = {
  navigate,
  switchEnv,
  switchEnvByName,
  switchSide,
  CONTENT,
  STATE,
};

// ── PERSIST PREFERENCES ────────────────────────────────────────────────
function savePrefs() {
  try {
    localStorage.setItem('suheer_prefs', JSON.stringify({
      font: STATE.font,
      size: STATE.size,
      a11y: [...STATE.a11y],
    }));
  } catch(e) {}
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem('suheer_prefs');
    if (!raw) return;
    const p = JSON.parse(raw);
    if (p.font) setFont(p.font);
    if (p.size) setSize(p.size);
    if (p.a11y) p.a11y.forEach(v => { STATE.a11y.add(v); applyA11y(v); });
    syncA11yBtns();
    // Sync font btns
    document.querySelectorAll('[data-font]').forEach(b => b.classList.toggle('on', b.dataset.font === STATE.font));
    // Sync size btns
    document.querySelectorAll('[data-action="size"]').forEach(b => b.classList.toggle('on', b.dataset.val === STATE.size));
  } catch(e) {}
}

// Save on any preference change
['click'].forEach(ev => {
  document.querySelectorAll('[data-font],[data-action]').forEach(el => {
    el.addEventListener(ev, savePrefs, { passive: true });
  });
});

// ── INIT ──────────────────────────────────────────────────────────────
loadPrefs();
