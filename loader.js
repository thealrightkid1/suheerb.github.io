export default {
  id:'terminal', name:'Terminal', type:'B', dot:'#39e07a', ownNav:true,
  _history: [], _histIdx: -1, _inp: null,

  coldBoot(c, content, state) { this._render(c, content, state, true); },
  mount(c, page, content, state) { this._render(c, content, state, false, page); },
  navigate(page, content, state) {
    const out = document.getElementById('term-out');
    if (out) this._printLines(out, this._pageLines(page, content, state));
  },
  unmount() {
    this._history = []; this._histIdx = -1;
  },

  _render(c, content, state, cold, initialPage) {
    const S = this;
    c.innerHTML = `
    <div id="term" style="background:#0a0f0a;padding:20px 24px;font-family:'Space Mono',monospace;font-size:13px;color:#39e07a;min-height:100vh;cursor:text">
      <div id="term-out" style="margin-bottom:12px;line-height:1.9"></div>
      <div style="display:flex;align-items:center;gap:6px">
        <span style="color:#1a5a2a;white-space:nowrap">msb@suheerb:~$</span>
        <input id="term-inp" style="background:transparent;border:none;outline:none;color:#39e07a;font-family:'Space Mono',monospace;font-size:13px;flex:1;caret-color:#39e07a" autocomplete="off" spellcheck="false">
      </div>
    </div>`;

    const out = document.getElementById('term-out');
    const inp = document.getElementById('term-inp');
    this._inp = inp;

    if (cold) {
      this._printLines(out, [
        '<span style="color:#1a5a2a">M. SUHEER BAIG — TERMINAL v2.0</span>',
        '<span style="color:#1a5a2a">────────────────────────────</span>',
        `type <span style="color:#b8e870">help</span> for commands.`,
        '',
      ]);
    } else if (initialPage) {
      this._printLines(out, this._pageLines(initialPage, content, state));
    }

    c.addEventListener('click', () => inp.focus());
    inp.focus();

    inp.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this._histIdx < this._history.length - 1) {
          this._histIdx++;
          inp.value = this._history[this._histIdx];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this._histIdx > 0) { this._histIdx--; inp.value = this._history[this._histIdx]; }
        else { this._histIdx = -1; inp.value = ''; }
      } else if (e.key === 'Enter') {
        const val = inp.value.trim();
        inp.value = '';
        this._histIdx = -1;
        if (!val) return;
        this._history.unshift(val);
        const echo = document.createElement('div');
        echo.style.color = '#1a5a2a';
        echo.textContent = 'msb@suheerb:~$ ' + val;
        out.appendChild(echo);
        this._handleCmd(val.toLowerCase(), out, content, state);
        out.scrollTop = out.scrollHeight;
      }
    });
  },

  _handleCmd(cmd, out, content, state) {
    const [base, ...args] = cmd.split(' ');
    const cmds = {
      help: () => [
        '<span style="color:#b8e870">available commands:</span>',
        '  <span style="color:#b8e870">about</span>         — who i am',
        '  <span style="color:#b8e870">poem</span>          — read a poem',
        '  <span style="color:#b8e870">poems</span>         — list all poems',
        '  <span style="color:#b8e870">essay [n]</span>     — read essay by number',
        '  <span style="color:#b8e870">essays</span>        — list all essays',
        '  <span style="color:#b8e870">hire</span>          — work with me',
        '  <span style="color:#b8e870">credits</span>       — editorial credits',
        '  <span style="color:#b8e870">cv</span>            — full career timeline',
        '  <span style="color:#b8e870">clear</span>         — clear terminal',
        '  <span style="color:#b8e870">theme [name]</span>  — switch environment',
      ],
      about: () => [
        '<span style="color:#b8e870">// M. Suheer Baig</span>',
        'Criminologist. Poet. Ghostwriter. Night shift.',
        'Interested in too many things to be useful to the algorithm.',
        '','degree: BSc Criminology, University of Karachi',
        'current: eBook Production Manager, Ariatech',
        '','The contradiction is the autobiography.',
        '','type <span style="color:#b8e870">hire</span> to work together.',
      ],
      credits: () => [
        '<span style="color:#b8e870">// editorial credits — Limegreen Media</span>',
        '  Netflix          QC, transcription, localization',
        '  Apple TV+        scripts, subtitles',
        '  BBC              editorial standards',
        '  Sony             localized content',
        '  Paramount        broadcast QC',
        '  Warner Bros.     zero-error delivery',
        '','400+ projects delivered.',
      ],
      cv: () => [
        '<span style="color:#b8e870">// career timeline</span>',
        ...content.cv.roles.map(r => [`  ${r.date.padEnd(12)} ${r.title}`,`               ${r.org}`]).flat(),
      ],
      hire: () => [
        '<span style="color:#b8e870">// available for:</span>',
        '  ghostwriting       — your voice, my sentences',
        '  developmental editing',
        '  line editing & proofreading',
        '  long-form content & SEO',
        '  ebook production (end-to-end)',
        '','contact: <span style="color:#b8e870">baigsuheer.s@gmail.com</span>',
        'response: within 24 hours.',
      ],
      poem: () => {
        const p = content.poems[Math.floor(Math.random() * content.poems.length)];
        return [`<span style="color:#b8e870">// ${p.title}</span>`,'', ...p.lines.map(l => l === '' ? '' : `<span style="color:#7acca0;font-style:italic">${l}</span>`)];
      },
      poems: () => [
        '<span style="color:#b8e870">// all poems — type poem [n] to read</span>',
        ...content.poems.map((p,i) => `  <span style="color:#b8e870">${i+1}</span>. ${p.title}`),
      ],
      essays: () => [
        '<span style="color:#b8e870">// all essays — type essay [n] to read</span>',
        ...content.essays.map((e,i) => `  <span style="color:#b8e870">${i+1}</span>. [${e.cat}] ${e.title}`),
      ],
      clear: () => { document.getElementById('term-out').innerHTML = ''; return []; },
    };

    if (base === 'essay') {
      const n = parseInt(args[0]);
      if (n >= 1 && n <= content.essays.length) {
        const e = content.essays[n-1];
        this._printLines(out, [
          `<span style="color:#b8e870">// ${e.title}</span>`,
          `<span style="color:#1a5a2a">[${e.cat}] ${e.date} · ${e.time} min</span>`,
          '',
          ...e.body.replace(/<[^>]*>/g,'').split('.').filter(s=>s.trim()).map(s=>s.trim()+'.'),
        ]);
      } else {
        this._printLines(out, [`<span style="color:#e07a39">usage: essay [1-${content.essays.length}]</span>`]);
      }
      return;
    }

    if (base === 'poem') {
      const n = parseInt(args[0]);
      const p = (n >= 1 && n <= content.poems.length) ? content.poems[n-1] : content.poems[Math.floor(Math.random()*content.poems.length)];
      this._printLines(out, [`<span style="color:#b8e870">// ${p.title}</span>`,'', ...p.lines.map(l => l===''?'': `<span style="color:#7acca0;font-style:italic">${l}</span>`)]);
      return;
    }

    if (base === 'theme') {
      const name = args.join(' ').toLowerCase();
      window.APP?.switchEnvByName(name);
      this._printLines(out, [`switching to: <span style="color:#b8e870">${name || '?'}</span>`]);
      return;
    }

    if (cmds[base]) {
      const result = cmds[base]();
      if (result && result.length) this._printLines(out, result);
    } else {
      this._printLines(out, [`<span style="color:#e07a39">command not found: ${base}. type help.</span>`]);
    }
  },

  _printLines(out, lines) {
    lines.forEach(l => {
      const d = document.createElement('div');
      d.innerHTML = l === '' ? '&nbsp;' : l;
      out.appendChild(d);
    });
  },

  _pageLines(page, content, state) {
    const [p, sub] = page.split('/');
    if (p === 'post' && sub) {
      const e = content.essays.find(x => x.id === sub);
      if (e) return [`<span style="color:#b8e870">// ${e.title}</span>`, `<span style="color:#1a5a2a">[${e.cat}] ${e.date}</span>`, '', ...e.body.replace(/<[^>]*>/g,'').split('. ').filter(s=>s.trim()).map(s=>s.trim()+'.')];
    }
    const map = {
      writing: ['<span style="color:#b8e870">// writing</span>','','type <span style="color:#b8e870">essays</span> to browse all.'],
      poetry: ['<span style="color:#b8e870">// verse</span>','','type <span style="color:#b8e870">poems</span> to browse all, or <span style="color:#b8e870">poem</span> for a random one.'],
      about: this._buildCmd('about', content, state),
      hire: this._buildCmd('hire', content, state),
    };
    return (map[p] || ['<span style="color:#b8e870">// home</span>', '', 'type <span style="color:#b8e870">help</span> for commands.']);
  },

  _buildCmd(cmd, content, state) {
    const cmds = { about: ['<span style="color:#b8e870">// about</span>','','M. Suheer Baig. Criminologist. Poet. Ghost.','','type <span style="color:#b8e870">cv</span> for full timeline.'], hire: ['<span style="color:#b8e870">// hire</span>','','ghostwriting · editing · content · production','','contact: baigsuheer.s@gmail.com'] };
    return cmds[cmd] || [];
  },
};
