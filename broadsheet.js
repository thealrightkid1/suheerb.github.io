// Shared rendering utilities
// Each env can use these or render entirely in its own way

export function renderHome(content, state, onNav) {
  const nav = (p) => `onclick="window.APP.navigate('${p}')"`;
  return `
  <div class="hero">
    <span class="hero-eye">∞ &nbsp;polymathic &nbsp;/&nbsp; contradictory &nbsp;/&nbsp; relentless</span>
    <h1 class="hero-name">M. <span class="ac">Suheer</span><br>Baig<span class="cursor-blink"></span></h1>
    <p class="hero-sub">Writing at the margins where criminology meets cosmology — where a verse can hold a variable, and where contradiction is the only honest autobiography.</p>
    <div class="tags">
      <span class="tag ta">Poet</span><span class="tag tb">STEM</span>
      <span class="tag tc">Criminologist</span><span class="tag">Essayist</span>
      <span class="tag ta">Ghostwriter</span><span class="tag tc">Night Shift</span>
      <span class="tag">Karachi</span><span class="tag tb">Systems</span>
    </div>
  </div>
  <div style="border-bottom:1px solid var(--brd)">
    <div class="content-narrow" style="padding-bottom:3rem">
      <span class="lbl">// featured verse</span>
      <div class="poem-block" style="border-bottom:none;padding-bottom:0;margin:0">
        <div class="plines" style="font-size:1.5rem;text-align:center">
          <p>there's no map for this, thank you &amp; thank you</p>
        </div>
        <p style="font-family:var(--fm);font-size:0.5rem;color:var(--fg3);letter-spacing:0.15em;margin-top:1.5rem;text-transform:uppercase;text-align:center">
          — M. Suheer Baig &nbsp;<span style="color:var(--acc);cursor:pointer" ${nav('poetry')}>/ full collection →</span>
        </p>
      </div>
    </div>
  </div>
  <div class="content-wrap">
    <span class="lbl">// latest writing</span>
    <h2 class="hd" style="font-size:clamp(1.8rem,4vw,3.2rem);margin-bottom:1.4rem">From the <span class="ac">notebook.</span></h2>
    <div class="content-grid">${content.essays.slice(0,3).map(e => renderCard(e)).join('')}</div>
    <div style="margin-top:1.2rem;text-align:right">
      <span style="font-family:var(--fm);font-size:0.56rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--acc);cursor:pointer" ${nav('writing')}>All writing →</span>
    </div>
  </div>
  ${foot(state)}`;
}

export function renderProHome(content, state) {
  return `
  <div class="hero">
    <span class="hero-eye">Ghostwriter · Editor · Content Strategist</span>
    <h1 class="hero-name">M. <span class="ac">Suheer</span><br>Baig<span class="cursor-blink"></span></h1>
    <p class="hero-sub" style="font-style:normal">Editorial QC for Netflix, Apple TV+, BBC, Sony, Paramount, and Warner Bros. 400+ projects. Available for ghostwriting, developmental editing, and long-form content.</p>
    <div class="tags">
      <span class="tag ta">Ghostwriting</span><span class="tag">Dev. Editing</span>
      <span class="tag ta">Line Editing</span><span class="tag">eBook Production</span>
      <span class="tag tb">Remote</span><span class="tag ta">Worldwide</span>
    </div>
    <span style="font-family:var(--fm);font-size:0.58rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--acc);border:1px solid var(--acc);padding:0.45rem 1.1rem;cursor:pointer" onclick="window.APP.navigate('contact')">Available for projects →</span>
  </div>
  <div class="content-wrap" style="padding-top:3rem">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1px;background:var(--brd2);border:1px solid var(--brd2)">
      <div style="background:var(--bg);padding:1.4rem"><p style="font-family:var(--fm);font-size:0.52rem;color:var(--fg3);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:0.5rem">Editorial Credits</p><p style="font-family:var(--fh);font-style:var(--hs);font-size:1rem;color:var(--fg)">Netflix · Apple TV+<br>BBC · Sony · Paramount<br>Warner Bros.</p></div>
      <div style="background:var(--bg);padding:1.4rem"><p style="font-family:var(--fm);font-size:0.52rem;color:var(--fg3);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:0.5rem">Delivered</p><p style="font-family:var(--fh);font-size:2.4rem;font-weight:var(--hw);color:var(--acc)">400+</p></div>
      <div style="background:var(--bg);padding:1.4rem"><p style="font-family:var(--fm);font-size:0.52rem;color:var(--fg3);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:0.5rem">Current Role</p><p style="font-family:var(--fh);font-style:var(--hs);font-size:1rem;color:var(--fg)">eBook Production<br>Manager · Ariatech</p></div>
      <div style="background:var(--bg);padding:1.4rem"><p style="font-family:var(--fm);font-size:0.52rem;color:var(--fg3);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:0.5rem">Location</p><p style="font-family:var(--fh);font-style:var(--hs);font-size:1rem;color:var(--acc)">Remote · Worldwide</p></div>
    </div>
  </div>
  ${foot(state)}`;
}

export function renderWriting(content, state, filter = 'all') {
  const cats = ['all','criminology','stem','essay'];
  const shown = filter === 'all' ? content.essays : content.essays.filter(e => e.cat === filter);
  return `
  <div class="content-wrap">
    <span class="lbl">// 002 — writing</span>
    <h1 class="hd">From the <span class="ac">notebook.</span></h1>
    <div class="ftabs" id="ftabs">
      ${cats.map(c => `<button class="ftab${c===filter?' on':''}" data-cat="${c}">${c==='all'?'All':c==='stem'?'STEM × Hum.':cap(c)}</button>`).join('')}
    </div>
    <div class="content-grid" id="posts-out">${shown.map(e => renderCard(e)).join('')}</div>
  </div>
  ${foot(state)}`;
}

export function renderPost(essay, state) {
  const back = state.mode === 'professional' ? 'services' : 'writing';
  return `
  <div class="content-narrow">
    <span class="post-back" onclick="window.APP.navigate('${back}')">← ${state.mode === 'professional' ? 'Services' : 'Writing'}</span>
    <span class="lbl">${essay.cat === 'stem' ? 'STEM × Humanities' : essay.cat}</span>
    <h1 class="hd" style="font-size:clamp(1.8rem,5vw,3.6rem);margin-bottom:0.8rem">${essay.title}</h1>
    <p style="font-family:var(--fm);font-size:0.54rem;color:var(--fg3);letter-spacing:0.1em;margin-bottom:2.8rem;text-transform:uppercase">${essay.date} &nbsp;·&nbsp; ${essay.time} min read</p>
    <div class="post-body">${essay.body}</div>
  </div>
  ${foot(state)}`;
}

export function renderPoetry(content, state) {
  return `
  <div class="content-narrow">
    <span class="lbl">// 003 — verse</span>
    <h1 class="hd"><span class="ac">The</span> collection.</h1>
    <p style="font-family:var(--fb);font-style:italic;color:var(--fg3);max-width:440px;margin-bottom:3.2rem;font-size:0.95rem;line-height:1.75">28 poems. The sequence opens on a backseat. It closes on a hill.</p>
    ${content.poems.map(p => `
    <div class="poem-block">
      <span class="ptitle">${p.title}</span>
      <div class="plines">${p.lines.map(l => l === '' ? '<br>' : `<p>${l}</p>`).join('')}</div>
    </div>`).join('')}
  </div>
  ${foot(state)}`;
}

export function renderAbout(content, state) {
  const cv = content.cv;
  return `
  <div class="content-wrap">
    <span class="lbl">// 001 — who</span>
    <h1 class="hd">The <span class="ac">contradiction</span><br>is the point.</h1>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start">
      <div>
        <p style="font-family:var(--fb);font-size:1rem;color:var(--fg2);margin-bottom:1rem;line-height:1.85">I'm <strong style="color:var(--fg)">M. Suheer Baig</strong> — a criminology graduate who reads neuroscience for pleasure, a poet who finds something true in probability, a writer who refuses to stay in one lane.</p>
        <p style="font-family:var(--fb);font-size:1rem;color:var(--fg2);margin-bottom:1rem;line-height:1.85">By night I run eBook production at Ariatech — ghostwriting memoirs, developmental-editing business books, managing the distance between someone else's voice and your own.</p>
        <p style="font-family:var(--fb);font-size:1rem;color:var(--fg2);margin-bottom:1rem;line-height:1.85">Before that: editorial quality control for <strong style="color:var(--fg)">Netflix, Apple TV+, BBC, Sony, Paramount,</strong> and <strong style="color:var(--fg)">Warner Bros.</strong> Four hundred-plus titles. Zero-error delivery.</p>
        <p style="font-family:var(--fb);font-size:1rem;color:var(--fg2);margin-bottom:2rem;line-height:1.85">The writing here is mine. All of it. Which makes it the strangest, most serious thing I do.</p>
        <span style="font-family:var(--fm);font-size:0.58rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--acc);cursor:pointer" onclick="window.APP.navigate('hire')">Available for hire →</span>
      </div>
      <div>
        ${cv.roles.map(r => `
        <div class="tl-item">
          <span class="tl-date">${r.date}</span>
          <div><p class="tl-h">${r.title}</p><p class="tl-p">${r.org}. ${r.desc}</p></div>
        </div>`).join('')}
      </div>
    </div>
  </div>
  ${foot(state)}`;
}

export function renderProAbout(content, state) {
  const cv = content.cv;
  return `
  <div class="content-wrap">
    <span class="lbl">// credentials</span>
    <h1 class="hd">The <span class="ac">record.</span></h1>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start">
      <div>
        <p style="font-family:var(--fb);font-size:1rem;color:var(--fg2);margin-bottom:1rem;line-height:1.85">I'm <strong style="color:var(--fg)">M. Suheer Baig</strong> — a writer and editor with a background in high-volume editorial production for some of the world's largest entertainment clients.</p>
        <p style="font-family:var(--fb);font-size:1rem;color:var(--fg2);margin-bottom:1rem;line-height:1.85">My work has contributed to productions for <strong style="color:var(--fg)">Netflix, Apple TV+, BBC, Sony, Paramount,</strong> and <strong style="color:var(--fg)">Warner Bros.</strong> Zero-error delivery under tight broadcast deadlines.</p>
        <p style="font-family:var(--fb);font-size:1rem;color:var(--fg2);margin-bottom:2rem;line-height:1.85">I hold a degree in Criminology — it taught me how to read a body of evidence carefully, hold competing accounts, and write about difficult material without flinching.</p>
        <span style="font-family:var(--fm);font-size:0.58rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--acc);cursor:pointer" onclick="window.APP.navigate('contact')">Get in touch →</span>
      </div>
      <div>${cv.roles.map(r => `
        <div class="tl-item">
          <span class="tl-date">${r.date}</span>
          <div><p class="tl-h">${r.title}</p><p class="tl-p">${r.org}. ${r.desc}</p></div>
        </div>`).join('')}
      </div>
    </div>
  </div>
  ${foot(state)}`;
}

export function renderHire(content, state) {
  const cv = content.cv;
  return `
  <div class="content-wrap">
    <span class="lbl">// 005 — services</span>
    <h1 class="hd">What I <span class="ac">do</span><br>for hire.</h1>
    <div class="svc-grid">${cv.services.map(s => `<div class="svc"><p class="svc-name">${s.name}</p><p class="svc-desc">${s.desc}</p></div>`).join('')}</div>
    <h2 class="hd" style="font-size:clamp(1.8rem,4vw,3rem);margin-bottom:1.2rem">Say <span class="ac">hello.</span></h2>
    <p style="font-family:var(--fb);font-style:italic;color:var(--fg3);max-width:380px;margin-bottom:2rem;line-height:1.85">Pitch something. Propose a collaboration. Ask a question. I read everything.</p>
    <div class="clinks">
      <a class="clink" href="mailto:${cv.email}">${cv.email} <span class="clink-arr">→</span></a>
      <button class="clink" onclick="">LinkedIn <span class="clink-arr">→</span></button>
      <button class="clink" onclick="">Download CV <span class="clink-arr">→</span></button>
    </div>
  </div>
  ${foot(state)}`;
}

export function renderContact(content, state) {
  const cv = content.cv;
  return `
  <div class="content-narrow">
    <span class="lbl">// contact</span>
    <h1 class="hd">Let's <span class="ac">work.</span></h1>
    <p style="font-family:var(--fb);font-style:italic;color:var(--fg2);max-width:420px;margin-bottom:2.8rem;font-size:1rem;line-height:1.85">Describe the project. What it is, what you need, when you need it. Response within 24 hours.</p>
    <div class="clinks">
      <a class="clink" href="mailto:${cv.email}">${cv.email} <span class="clink-arr">→</span></a>
      <button class="clink" onclick="">LinkedIn <span class="clink-arr">→</span></button>
      <button class="clink" onclick="">Download CV <span class="clink-arr">→</span></button>
    </div>
    <div style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--brd)">
      <p style="font-family:var(--fm);font-size:0.54rem;color:var(--fg3);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:0.8rem">Availability</p>
      <p style="font-family:var(--fb);color:var(--fg2);font-size:0.95rem;line-height:1.85">Currently taking on ghostwriting, editing, and long-form content projects. Remote only.</p>
    </div>
  </div>
  ${foot(state)}`;
}

export function renderCard(essay) {
  const cc = essay.cat==='criminology'?'c3':essay.cat==='stem'?'c2':'';
  return `<button class="card" onclick="window.APP.navigate('post/${essay.id}')">
    <span class="card-cat ${cc}">${essay.cat==='stem'?'STEM × Hum.':essay.cat}</span>
    <h3 class="card-title">${essay.title}</h3>
    <p class="card-exc">${essay.exc}</p>
    <p class="card-meta">${essay.date} · ${essay.time} min</p>
  </button>`;
}

export function foot(state) {
  const switchLabel = state.mode === 'personal' ? '→ Professional' : '← Personal';
  return `<footer class="foot">
    <span>M. Suheer Baig</span>
    <span style="cursor:pointer;opacity:0.7" onclick="window.APP.switchSide()">${switchLabel}</span>
  </footer>`;
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// Dispatch table: given page string, return render function
export function dispatchPage(page, content, state) {
  const [p, sub] = page.split('/');
  if (state.mode === 'professional') {
    const map = {
      'pro-home': () => renderProHome(content, state),
      'services': () => renderHire(content, state),
      'pro-about': () => renderProAbout(content, state),
      'contact': () => renderContact(content, state),
    };
    return (map[p] || map['pro-home'])();
  }
  const essay = sub ? content.essays.find(e => e.id === sub) : null;
  const poem = sub ? content.poems.find(p2 => p2.id === sub) : null;
  const map = {
    'home': () => renderHome(content, state),
    'writing': () => renderWriting(content, state),
    'poetry': () => renderPoetry(content, state),
    'about': () => renderAbout(content, state),
    'hire': () => renderHire(content, state),
    'post': () => essay ? renderPost(essay, state) : renderWriting(content, state),
    'poem': () => poem ? renderPoetry(content, state) : renderPoetry(content, state),
  };
  return (map[p] || map['home'])();
}
