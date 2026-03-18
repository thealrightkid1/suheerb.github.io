import { dispatchPage } from './shared.js';
const SALS=['Dear reader,','To whoever finds this,','Dear curious one,','To the one who stayed —','Re: the thing I meant to say,'];
const CLOSES=['Yours in contradiction,','Still not finished,','Writing to you from the night shift,','Thank you & thank you,','With everything I couldn\'t say —'];
export default {
  id:'letter', name:'Letter', type:'B', dot:'#c4aa80', ownNav:false,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    const sal=SALS[Math.floor(Math.random()*SALS.length)];
    const cl=CLOSES[Math.floor(Math.random()*CLOSES.length)];
    c.style.background='#e8e0c8';
    c.innerHTML=`<div style="background:#e8e0c8;min-height:100vh;padding:3rem 2.5rem;background-image:url('data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.03\'/></svg>')">
      <div style="max-width:640px;margin:0 auto;background:#f8f4ec;padding:3rem;border:1px solid #d8cca8;box-shadow:4px 4px 0 rgba(0,0,0,0.08),8px 8px 0 rgba(0,0,0,0.04)">
        <div style="font-family:Cormorant Garamond,Georgia,serif;font-size:1rem;font-style:italic;color:#554433;margin-bottom:2rem;border-bottom:1px solid #d8cca8;padding-bottom:1rem">${sal}</div>
        ${dispatchPage(page,content,state)}
        <div style="font-family:Cormorant Garamond,Georgia,serif;font-size:1rem;font-style:italic;color:#554433;margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid #d8cca8">${cl}<br><br><em style="font-size:0.85rem">— M. Suheer Baig</em></div>
      </div>
    </div>`;
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
};
