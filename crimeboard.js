import { dispatchPage } from './shared.js';
export default {
  id:'trackchanges', name:'Track Changes', type:'B', dot:'#cc4444', ownNav:false,
  coldBoot(c,content,state){this.mount(c,'home',content,state);},
  mount(c,page,content,state){
    c.style.background='#f0f0f0';
    const COMMENTS=[
      {text:'strong opening. the restraint is working.',author:'Editor',side:'right',offset:'10%'},
      {text:'consider cutting — already implied by the previous sentence.',author:'Editor',side:'right',offset:'30%'},
      {text:'this is the line. don\'t touch it.',author:'Editor',side:'right',offset:'50%'},
      {text:'is this you or the character? clarify.',author:'Editor',side:'left',offset:'70%'},
    ];
    c.innerHTML=`<div style="background:#f0f0f0;min-height:100vh">
      <div style="background:#2b579a;padding:6px 16px;display:flex;align-items:center;gap:16px;font-family:Segoe UI,Arial,sans-serif;font-size:11px;color:#fff">
        <span style="font-weight:600">suheer-baig.docx</span>
        <span style="opacity:0.7">Track Changes: ON</span>
        <span style="opacity:0.7">|</span>
        <span style="background:rgba(255,255,255,0.15);padding:2px 8px;border-radius:2px">Reviewing: All Markup</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 260px;min-height:calc(100vh - 30px)">
        <div style="background:#fff;padding:3rem 4rem;border-right:1px solid #ddd">
          <div style="max-width:600px">
            <div style="font-family:Calibri,Georgia,serif;font-size:14px;color:#000;line-height:1.85">
              ${this._processContent(dispatchPage(page,content,state))}
            </div>
          </div>
        </div>
        <div style="background:#f8f8f8;padding:1rem">
          ${COMMENTS.map(cm=>`<div style="background:#fff;border-left:3px solid #2b579a;padding:8px 10px;margin-bottom:8px;font-family:Calibri,Arial,sans-serif">
            <div style="font-size:9px;font-weight:700;color:#2b579a;margin-bottom:4px">${cm.author}</div>
            <div style="font-size:10px;color:#333;font-style:italic;line-height:1.5">${cm.text}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
  },
  navigate(page,content,state){this.mount(document.getElementById('app'),page,content,state);},
  unmount(){},
  _processContent(html){
    return html.replace(/<p>(.*?)<\/p>/g,(_,t)=>{
      if(Math.random()<0.2){return `<p>${t} <span style="background:#ffcccc;text-decoration:line-through;color:#cc0000">[cut this]</span></p>`;}
      if(Math.random()<0.15){return `<p><span style="background:#ccffcc;color:#006600">[insertion: ]</span>${t}</p>`;}
      return `<p>${t}</p>`;
    });
  },
};
