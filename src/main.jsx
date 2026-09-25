import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const PETALS = Array.from({length:34}, (_,i)=>({
  id:i,
  left:(i*29)%101,
  delay:((i*0.37)%5.5).toFixed(2),
  duration:(7+(i%6)*0.8).toFixed(2),
  size:9+(i%5)*3,
  drift:((i%2?1:-1)*(25+(i%7)*9))
}));

function Petals(){
  return <div className="petals" aria-hidden="true">
    {PETALS.map(p=><span key={p.id} className="petal" style={{
      left:p.left+"%", animationDelay:p.delay+"s", animationDuration:p.duration+"s",
      width:p.size+"px", height:p.size*1.35+"px", "--drift":p.drift+"px"
    }}/>)}
  </div>
}

function App(){
  const [opened,setOpened]=useState(false);
  const [coverGone,setCoverGone]=useState(false);

  useEffect(()=>{
    if(opened){
      const t=setTimeout(()=>setCoverGone(true),1450);
      return ()=>clearTimeout(t);
    }
  },[opened]);

  return <main className={`scene ${opened?"is-open":""} ${coverGone?"cover-gone":""}`}>
    <div className="ambient" aria-hidden="true"/>
    {!coverGone && <section className="invitation-cover" aria-label="Invitation cover">
      <div className="cover-shadow"/>
      <div className="cover">
        <div className="cover-border"/>
        <div className="cover-mark">✦</div>
        <div className="seal-wrap">
          <button className="seal" onClick={()=>setOpened(true)} aria-label="Open invitation">
            <span className="seal-inner">✦</span>
          </button>
          {!opened && <div className="tap-hint">Tap the seal to open the invitation</div>}
        </div>
        <div className="cover-mark bottom">✦</div>
      </div>
    </section>}
    <section className={`inside ${coverGone?"visible":""}`}>
      <div className="paper">
        <div className="paper-frame">
          <div className="paper-symbol">✦</div>
          <div className="blank-content" aria-hidden="true"/>
          <div className="paper-symbol">✦</div>
        </div>
      </div>
      <Petals/>
    </section>
  </main>
}

createRoot(document.getElementById("root")).render(<App />);