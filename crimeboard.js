import { dispatchPage, renderCard } from './shared.js';

export default {
  id:'crimeboard', name:'Crime Board', type:'B', dot:'#cc2200', ownNav:false,
  _raf: null, _svg: null, _pins: [], _dragging: null,

  coldBoot(c, content, state) { this._buildBoard(c, content, state); },
  mount(c, page, content, state) {
    if (page === 'home' || page === 'writing' || page === 'poetry') {
      this._buildBoard(c, content, state);
    } else {
      this._renderContent(c, page, content, state);
    }
  },
  navigate(page, content, state) {
    this.mount(document.getElementById('app'), page, content, state);
  },
  unmount() {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    this._pins = []; this._dragging = null;
  },

  _renderContent(c, page, content, state) {
    c.style.background = '#1a1410';
    c.innerHTML = `
    <div style="padding:3rem 2.5rem;max-width:700px;background:#1a1410;min-height:100vh">
      <div style="font-family:'Space Mono',monospace;font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:#cc2200;margin-bottom:0.5rem">EVIDENCE FILE</div>
      ${dispatchPage(page, content, state)}
    </div>`;
  },

  _buildBoard(c, content, state) {
    c.style.background = '#1a1410';
    const PINS = [
      { id:'subject',  x:30,  y:50,  r:-2,  title:'Subject',      body:`M. Suheer Baig<br>Criminologist<br>Poet · Ghost`,          dark:false },
      { id:'motive',   x:220, y:30,  r:1.5, title:'Motive',       body:`"you made me<br>for the wanting."`,                         dark:false },
      { id:'location', x:430, y:55,  r:-1,  title:'Location',     body:`Third floor<br>Zamzama<br>03:17 PKT`,                       dark:false },
      { id:'method',   x:55,  y:230, r:2,   title:'Method',       body:`Ghostwriting<br>Dev. Editing<br>400+ projects`,             dark:true  },
      { id:'assoc',    x:250, y:210, r:-1.5,title:'Associates',   body:`Netflix · BBC<br>Sony · WB<br>Paramount`,                   dark:false },
      { id:'evidence', x:440, y:240, r:1,   title:'Evidence',     body:`28 poems<br>"there's no map<br>for this"`,                 dark:true  },
      { id:'thesis',   x:140, y:130, r:-0.5,title:'Unresolved',   body:`One unsubmitted<br>criminology thesis.<br>Still pending.`, dark:true  },
      { id:'contra',   x:330, y:130, r:1.2, title:'Contradiction',body:`Humanities kid.<br>STEM devotee.<br>Pick one. (Can't.)`,   dark:false },
    ];

    const STRINGS = [
      ['subject','motive'],['subject','method'],['subject','thesis'],
      ['motive','location'],['motive','assoc'],['motive','evidence'],
      ['method','assoc'],['assoc','evidence'],['location','evidence'],
      ['thesis','contra'],['contra','assoc'],
    ];

    c.innerHTML = `
    <div id="cb-board" style="position:relative;min-height:calc(100vh - 55px);background:#1a1410;overflow:hidden">
      <svg id="cb-svg" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></svg>
      <div id="cb-label" style="position:absolute;bottom:60px;left:16px;font-family:'Space Mono',monospace;font-size:7px;color:rgba(200,184,144,0.25);letter-spacing:0.2em;text-transform:uppercase">drag cards to investigate — click to read</div>
    </div>`;

    const board = document.getElementById('cb-board');
    this._svg = document.getElementById('cb-svg');

    PINS.forEach(pin => {
      const el = document.createElement('div');
      el.id = 'pin-' + pin.id;
      el.className = 'cbpin';
      el.style.cssText = `position:absolute;left:${pin.x}px;top:${pin.y}px;background:${pin.dark?'#2a2018':'#f0e8d0'};padding:10px 12px;font-family:'Courier New',monospace;font-size:10px;color:${pin.dark?'#c8b890':'#1a1410'};cursor:grab;max-width:140px;line-height:1.5;box-shadow:2px 3px 0 rgba(0,0,0,0.5);transform:rotate(${pin.r}deg);user-select:none;z-index:10`;
      el.innerHTML = `<div style="width:10px;height:10px;background:#cc2200;border-radius:50%;position:absolute;top:-5px;left:50%;transform:translateX(-50%)"></div><span style="font-weight:700;font-size:11px;color:#cc2200;display:block;margin-bottom:4px">${pin.title}</span>${pin.body}`;
      board.appendChild(el);
      this._pins.push({ el, id: pin.id });
      this._makeDraggable(el, board);
      el.addEventListener('dblclick', () => {
        const navMap = {
          subject:'about', motive:'poetry', location:'home',
          method:'hire', assoc:'hire', evidence:'poetry',
          thesis:'about', contra:'writing',
        };
        window.APP?.navigate(navMap[pin.id] || 'home');
      });
    });

    // draw strings
    this._strings = STRINGS;
    this._drawStrings();
    const loop = () => { this._drawStrings(); this._raf = requestAnimationFrame(loop); };
    this._raf = requestAnimationFrame(loop);
  },

  _drawStrings() {
    if (!this._svg || !this._pins.length) return;
    const board = document.getElementById('cb-board');
    if (!board) return;
    const br = board.getBoundingClientRect();
    this._svg.innerHTML = '';

    (this._strings || []).forEach(([a, b]) => {
      const pa = this._pins.find(p => p.id === a);
      const pb = this._pins.find(p => p.id === b);
      if (!pa || !pb) return;
      const ra = pa.el.getBoundingClientRect();
      const rb = pb.el.getBoundingClientRect();
      const ax = ra.left - br.left + ra.width / 2;
      const ay = ra.top - br.top + 5;
      const bx = rb.left - br.left + rb.width / 2;
      const by = rb.top - br.top + 5;
      const cx = (ax + bx) / 2 + (Math.sin(ax + bx) * 15);
      const cy = (ay + by) / 2 + Math.abs(ax - bx) * 0.1;
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d', `M${ax},${ay} Q${cx},${cy} ${bx},${by}`);
      path.setAttribute('stroke', 'rgba(180,30,20,0.5)');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('fill', 'none');
      this._svg.appendChild(path);
    });
  },

  _makeDraggable(el, board) {
    let ox=0,oy=0,sx=0,sy=0,dragging=false;
    el.addEventListener('mousedown', e => {
      dragging=true; sx=e.clientX; sy=e.clientY;
      ox=parseInt(el.style.left)||0; oy=parseInt(el.style.top)||0;
      el.style.cursor='grabbing'; el.style.zIndex=20;
      e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      el.style.left = Math.max(0, ox + e.clientX - sx) + 'px';
      el.style.top = Math.max(0, oy + e.clientY - sy) + 'px';
    });
    document.addEventListener('mouseup', () => {
      if (dragging) { el.style.cursor='grab'; el.style.zIndex=10; }
      dragging=false;
    });
    // touch
    el.addEventListener('touchstart', e => {
      dragging=true; sx=e.touches[0].clientX; sy=e.touches[0].clientY;
      ox=parseInt(el.style.left)||0; oy=parseInt(el.style.top)||0;
    },{passive:true});
    document.addEventListener('touchmove', e => {
      if (!dragging) return;
      el.style.left = Math.max(0, ox + e.touches[0].clientX - sx) + 'px';
      el.style.top = Math.max(0, oy + e.touches[0].clientY - sy) + 'px';
    },{passive:true});
    document.addEventListener('touchend', () => { dragging=false; });
  },
};
