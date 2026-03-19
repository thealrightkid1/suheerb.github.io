export default {
  id:'particles', name:'Particles', type:'B', dot:'#b8914a', ownNav:true,
  _raf:null, _particles:[], _canvas:null,
  coldBoot(c,content,state){this._build(c,content,state);},
  mount(c,page,content,state){this._build(c,content,state);},
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){if(this._raf){cancelAnimationFrame(this._raf);this._raf=null;}this._canvas=null;this._particles=[];},
  _build(c,content,state){
    c.innerHTML=`<div style="background:#0d0c0a;min-height:calc(100vh - 55px);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <canvas id="pf-c" style="display:block;width:100%;height:100%;position:absolute;inset:0"></canvas>
      <div id="pf-btns" style="position:absolute;bottom:70px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:10;flex-wrap:wrap;justify-content:center">
        <button onclick="window.APP.navigate('home')" style="font-family:Space Mono,monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;padding:4px 10px;background:transparent;border:1px solid rgba(184,145,74,0.4);color:#b8914a;cursor:pointer">Name</button>
        <button onclick="window.APP.navigate('poetry')" style="font-family:Space Mono,monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;padding:4px 10px;background:transparent;border:1px solid rgba(57,224,122,0.3);color:#39e07a;cursor:pointer">Verse</button>
        <button onclick="window.APP.navigate('writing')" style="font-family:Space Mono,monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;padding:4px 10px;background:transparent;border:1px solid rgba(184,145,74,0.3);color:#7a7060;cursor:pointer">Writing</button>
        <button onclick="window.APP.navigate('about')" style="font-family:Space Mono,monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;padding:4px 10px;background:transparent;border:1px solid rgba(184,145,74,0.3);color:#7a7060;cursor:pointer">About</button>
      </div>
    </div>`;
    const canvas=document.getElementById('pf-c');
    this._canvas=canvas;
    const resize=()=>{canvas.width=canvas.offsetWidth||700;canvas.height=canvas.offsetHeight||window.innerHeight-55;};
    resize();
    this._form(canvas,'M. Suheer Baig',58);
    const ctx=canvas.getContext('2d');
    const loop=()=>{
      if(!this._canvas)return;
      ctx.fillStyle='#0d0c0a';ctx.fillRect(0,0,canvas.width,canvas.height);
      this._particles.forEach(p=>{
        const dx=p.tx-p.x,dy=p.ty-p.y;
        p.vx+=dx*0.06;p.vy+=dy*0.06;p.vx*=0.82;p.vy*=0.82;
        p.x+=p.vx;p.y+=p.vy;
        const dist=Math.sqrt(dx*dx+dy*dy);
        ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle=`rgba(184,145,74,${dist<8?p.alpha:p.alpha*0.65})`;ctx.fill();
      });
      this._raf=requestAnimationFrame(loop);
    };
    this._raf=requestAnimationFrame(loop);
  },
  _form(canvas,text,size){
    const off=document.createElement('canvas');
    off.width=canvas.width;off.height=canvas.height;
    const oc=off.getContext('2d');
    oc.fillStyle='#fff';oc.textAlign='center';oc.font=`300 ${size}px Cormorant Garamond,Georgia,serif`;
    oc.fillText(text,canvas.width/2,canvas.height/2+size*0.35);
    const data=oc.getImageData(0,0,canvas.width,canvas.height).data;
    const pts=[];const step=4;
    for(let y=0;y<canvas.height;y+=step)for(let x=0;x<canvas.width;x+=step){
      if(data[(y*canvas.width+x)*4+3]>128)pts.push({x,y});
    }
    const N=Math.min(pts.length,2000);
    const sampled=pts.sort(()=>Math.random()-0.5).slice(0,N);
    if(this._particles.length===0){
      this._particles=sampled.map(p=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,tx:p.x,ty:p.y,vx:0,vy:0,size:Math.random()*1.5+0.4,alpha:Math.random()*0.5+0.5}));
    }else{
      sampled.forEach((p,i)=>{if(this._particles[i]){this._particles[i].tx=p.x;this._particles[i].ty=p.y;}});
      for(let i=N;i<this._particles.length;i++){this._particles[i].tx=Math.random()*canvas.width;this._particles[i].ty=canvas.height+100;}
    }
  },
};
