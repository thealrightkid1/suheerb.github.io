import { dispatchPage } from './shared.js';

export default {
  id:'observatory', name:'Observatory', type:'B', dot:'#7aa8e0', ownNav:true,
  _raf: null, _canvas: null, _stars: [], _hovered: -1,

  coldBoot(c, content, state) { this._build(c, content, state); },
  mount(c, page, content, state) {
    if (page === 'home') { this._build(c, content, state); }
    else { this._renderContent(c, page, content, state); }
  },
  navigate(page, content, state) {
    this.mount(document.getElementById('app'), page, content, state);
  },
  unmount() {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    this._canvas = null; this._stars = []; this._hovered = -1;
  },

  _renderContent(c, page, content, state) {
    c.innerHTML = `
    <div style="background:#000308;min-height:100vh;padding:3rem 2.5rem;color:#e0e8f8">
      <div style="position:absolute;top:70px;left:2.5rem;font-family:'Space Mono',monospace;font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#7aa8e0;cursor:pointer" onclick="window.APP.navigate('home')">← return to sky</div>
      <div style="max-width:700px;margin:0 auto;padding-top:2.5rem">
        ${dispatchPage(page, content, state)}
      </div>
    </div>`;
  },

  _build(c, content, state) {
    const S = this;
    c.innerHTML = `
    <div style="background:#000308;min-height:calc(100vh - 55px);position:relative;overflow:hidden">
      <canvas id="obs-canvas" style="display:block;width:100%;height:100%;position:absolute;inset:0"></canvas>
      <div id="obs-tooltip" style="position:absolute;pointer-events:none;display:none;font-family:'Space Mono',monospace;font-size:9px;color:#e0e8f8;background:rgba(0,3,8,0.9);border:1px solid rgba(122,168,224,0.3);padding:6px 10px;letter-spacing:0.1em;max-width:200px;line-height:1.5"></div>
      <div id="obs-label" style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-family:'Space Mono',monospace;font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(122,168,224,0.3)">hover to identify · click to read</div>
    </div>`;

    const canvas = document.getElementById('obs-canvas');
    const tooltip = document.getElementById('obs-tooltip');
    this._canvas = canvas;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight - 55;
    };
    resize();
    window.addEventListener('resize', resize);

    // Named stars = content
    const NAMED = [
      ...content.essays.map((e, i) => ({ type:'essay', id:e.id, label:e.title, cat:e.cat, size:1.8+Math.random()*1.2 })),
      ...content.poems.map((p, i) => ({ type:'poem', id:p.id, label:p.title, cat:'poetry', size:1.4+Math.random()*0.8 })),
      { type:'page', id:'about', label:'M. Suheer Baig', cat:'subject', size:3.5 },
      { type:'page', id:'hire', label:'Available for hire', cat:'hire', size:2.8 },
    ];

    // Background stars
    this._stars = [];
    for (let i = 0; i < 200; i++) {
      this._stars.push({ x:Math.random(), y:Math.random(), r:Math.random()*0.8+0.2, twinkle:Math.random()*Math.PI*2, named:false });
    }
    NAMED.forEach(n => {
      const color = n.cat==='criminology'?'#e08070':n.cat==='stem'?'#70c090':n.cat==='poetry'?'#b8a060':n.cat==='subject'?'#e0c870':'#7aa8e0';
      this._stars.push({ x:0.05+Math.random()*0.9, y:0.05+Math.random()*0.85, r:n.size, twinkle:Math.random()*Math.PI*2, named:true, data:n, color });
    });

    let t = 0;
    const ctx = canvas.getContext('2d');
    const loop = () => {
      if (!this._canvas) return;
      t += 0.012;
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = '#000308'; ctx.fillRect(0,0,W,H);
      this._stars.forEach((s, i) => {
        const tw = Math.sin(t + s.twinkle) * 0.3 + 0.7;
        const x = s.x * W, y = s.y * H;
        ctx.beginPath();
        ctx.arc(x, y, s.r * (s.named ? 1 : tw), 0, Math.PI*2);
        if (s.named) {
          ctx.fillStyle = i === this._hovered ? '#ffffff' : (s.color || '#e0e8f8');
          if (i === this._hovered) {
            ctx.shadowBlur = 12; ctx.shadowColor = s.color || '#7aa8e0';
          } else { ctx.shadowBlur = 4; ctx.shadowColor = s.color || '#7aa8e0'; }
        } else {
          ctx.fillStyle = `rgba(200,210,240,${tw * 0.6})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      // Constellation lines
      const namedStars = this._stars.filter(s => s.named);
      if (namedStars.length > 1) {
        ctx.strokeStyle = 'rgba(122,168,224,0.06)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < Math.min(namedStars.length, 20); i++) {
          const a = namedStars[i], b = namedStars[(i+3)%namedStars.length];
          ctx.beginPath();
          ctx.moveTo(a.x*W, a.y*H);
          ctx.lineTo(b.x*W, b.y*H);
          ctx.stroke();
        }
      }
      this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);
      const W = canvas.width, H = canvas.height;
      let found = -1;
      this._stars.forEach((s, i) => {
        if (!s.named) return;
        const dx = s.x*W - mx, dy = s.y*H - my;
        if (Math.sqrt(dx*dx+dy*dy) < Math.max(s.r*3, 12)) found = i;
      });
      this._hovered = found;
      if (found >= 0) {
        const s = this._stars[found];
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 8) + 'px';
        tooltip.innerHTML = `<span style="color:${s.color}">${s.data.cat.toUpperCase()}</span><br>${s.data.label}`;
        canvas.style.cursor = 'pointer';
      } else {
        tooltip.style.display = 'none';
        canvas.style.cursor = 'default';
      }
    });

    canvas.addEventListener('click', e => {
      if (this._hovered >= 0) {
        const s = this._stars[this._hovered];
        if (!s.named) return;
        const d = s.data;
        if (d.type === 'essay') window.APP?.navigate('post/' + d.id);
        else if (d.type === 'poem') window.APP?.navigate('poetry');
        else window.APP?.navigate(d.id);
      }
    });
  },
};
