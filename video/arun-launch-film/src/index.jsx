import React from 'react';
import {AbsoluteFill, Audio, Composition, Img, Sequence, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {registerRoot} from 'remotion';

const cobalt = '#1647B9';
const paper = '#E6DBC7';
const ink = '#091018';

const scenes = [
  {from: 0, dur: 150, kicker: 'THE PROBLEM', title: 'MAKE THE WORK FEEL REAL.', body: 'A portfolio should do more than list the work.', image: 'arun-frontpage.png'},
  {from: 150, dur: 75, kicker: 'AUSPIFY TECHNOLOGIES / TASK 01', title: 'ARUN.S', body: 'For Auspify Technologies Task 1, I built ARUN.S.', image: 'desk.jpg'},
  {from: 225, dur: 270, kicker: 'THE BUILD', title: 'THE BUILD IS THE STORY.', body: 'Newspaper-inspired cover  /  Three.js character  /  Skills + experience', image: 'portrait.jpg'},
  {from: 495, dur: 135, kicker: 'SELECTED CONCEPTS / 2026', title: 'THREE COMPLETE PRODUCT STORIES.', body: 'Atlas Ledger  /  Northstar LMS  /  Registrar', image: 'campus.jpg'},
  {from: 630, dur: 120, kicker: 'THE RESOLUTION', title: 'SHIPPED PUBLICLY.', body: 'Responsive. Documented. Ready to explore.', image: 'arun-frontpage.png'}
];

const captions = [
  {from: 0, dur: 78, text: 'A portfolio should do more than list the work.'},
  {from: 78, dur: 72, text: 'It should make the work feel real.'},
  {from: 150, dur: 75, text: 'For Auspify Technologies Task 1, I built ARUN.S.'},
  {from: 225, dur: 120, text: 'An editorial full-stack portfolio with a newspaper-inspired cover,'},
  {from: 345, dur: 75, text: 'an interactive Three.js character,'},
  {from: 420, dur: 75, text: 'clear skills and experience,'},
  {from: 495, dur: 75, text: 'and three complete mock product stories.'},
  {from: 570, dur: 60, text: 'The experience is responsive, documented,'},
  {from: 630, dur: 51, text: 'and shipped publicly.'},
  {from: 681, dur: 69, text: 'Special thanks to Auspify Technologies for this opportunity.'}
];

function Grain(){
  return <AbsoluteFill style={{opacity:.12, mixBlendMode:'multiply', backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=%220 0 160 160%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.42%22/%3E%3C/svg%3E")'}} />;
}

function Progress({frame}){
  return <div style={{position:'absolute',left:80,right:80,bottom:54,height:2,background:'rgba(9,16,24,.2)'}}><div style={{height:'100%',background:cobalt,width:`${(frame/750)*100}%`}} /></div>;
}

function MotionAccent({dark}){
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 18),[-1,1],[.35,.9]);
  const reveal = interpolate(frame,[0,24],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  return <>
    <div style={{position:'absolute',left:80,top:108,width:180,height:4,background:dark?'#90AAFF':cobalt,transformOrigin:'left',transform:`scaleX(${reveal})`}} />
    <div style={{position:'absolute',right:80,top:112,width:72,height:72,border:`1px solid ${dark?'rgba(144,170,255,.45)':'rgba(22,71,185,.35)'}`,borderRadius:'50%',opacity:pulse,transform:`rotate(${frame*.7}deg)`}} />
    <div style={{position:'absolute',right:104,top:136,width:24,height:1,background:dark?'#90AAFF':cobalt,transform:`rotate(${frame*.7}deg)`}} />
  </>;
}

function IntegratedCaption({sceneFrom, sceneIndex}){
  const frame = useCurrentFrame();
  const globalFrame = sceneFrom + frame;
  const activeIndex = Math.max(0, captions.findIndex((caption) => globalFrame >= caption.from && globalFrame < caption.from + caption.dur));
  const active = captions[activeIndex] || captions[captions.length - 1];
  const local = globalFrame - active.from;
  const progress = interpolate(local,[0,10],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  const words = active.text.split(' ');
  const layouts = [
    {left:80,top:790,width:680,size:27,align:'left',tone:'paper'},
    {right:80,top:510,width:620,size:34,align:'right',tone:'blue'},
    {left:80,top:635,width:720,size:32,align:'left',tone:'paper'},
    {left:80,top:735,width:820,size:27,align:'left',tone:'paper'},
    {left:80,top:545,width:560,size:35,align:'left',tone:'blue'},
    {left:80,top:510,width:490,size:31,align:'left',tone:'outline'},
    {left:80,top:855,width:900,size:28,align:'left',tone:'paper'},
    {right:80,top:600,width:630,size:30,align:'right',tone:'blue'},
    {left:80,top:610,width:600,size:44,align:'left',tone:'outline'},
    {right:80,top:555,width:720,size:30,align:'right',tone:'blue'}
  ];
  const pos = layouts[activeIndex] || layouts[0];
  const background = pos.tone==='blue' ? cobalt : pos.tone==='outline' ? 'rgba(230,219,199,.12)' : 'rgba(255,250,238,.84)';
  const color = pos.tone==='blue' ? '#fff' : pos.tone==='outline' ? (sceneIndex===4?'#F5EFE2':ink) : ink;
  const border = pos.tone==='blue' ? '#90AAFF' : sceneIndex===4 ? '#90AAFF' : cobalt;
  return <div style={{position:'absolute',left:pos.left,right:pos.right,top:pos.top,width:pos.width,padding:'13px 18px 15px',background,borderLeft:`5px solid ${border}`,boxShadow:pos.tone==='outline'?'none':'10px 12px 0 rgba(22,71,185,.10)',opacity:progress,transform:`translateY(${(1-progress)*16}px)`,fontFamily:'Arial',fontSize:pos.size,fontWeight:700,lineHeight:1.15,letterSpacing:-.35,color,textAlign:pos.align}}>
    <div style={{fontSize:11,letterSpacing:3,color:pos.tone==='blue'?'#BFD0FF':border,marginBottom:8}}>LIVE NARRATION / 0{activeIndex+1}</div>
    <div>{words.map((word,index)=>{
      const wordFrame = Math.max(0,local - index*2.2);
      const pop = spring({frame:wordFrame,fps:30,config:{damping:13,stiffness:180,mass:.55}});
      const wordOpacity = interpolate(wordFrame,[0,5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
      const tilt = interpolate(pop,[0,1],[index%2===0?-6:6,0]);
      return <React.Fragment key={`${word}-${index}`}><span style={{display:'inline-block',opacity:wordOpacity,transform:`translateY(${(1-pop)*18}px) scale(${.82 + pop*.18}) rotate(${tilt}deg)`}}>{word}</span>{index<words.length-1?' ':''}</React.Fragment>;
    })}</div>
    <div style={{height:3,marginTop:12,width:`${Math.min(100,Math.max(16,(local/active.dur)*120))}%`,background:`linear-gradient(90deg, ${cobalt}, #90AAFF)`,marginLeft:pos.align==='right'?'auto':0}} />
  </div>;
}

function InfoTable({sceneIndex}){
  const tables = [
    [['PROBLEM','Portfolios can flatten the work'],['SIGNAL','A list is not a story'],['RESPONSE','Make the interface behave like a product']],
    [['ASSIGNMENT','Auspify Technologies / Task 01'],['FORMAT','Responsive full-stack portfolio'],['DELIVERY','Documented + publicly shipped']],
    [['SURFACE','Newspaper-inspired cover'],['DETAIL','Interactive Three.js character'],['SYSTEM','Skills, experience + CV flow']],
    [['01','Atlas Ledger / finance system'],['02','Northstar LMS / learning system'],['03','Registrar / civic workflow']],
    [['STATUS','Responsive'],['STATUS','Documented'],['STATUS','Ready to explore']]
  ];
  const rows = tables[sceneIndex];
  const frame = useCurrentFrame();
  return <div style={{position:'absolute',right:sceneIndex===2?740:80,top:sceneIndex===2?690:sceneIndex===3?690:sceneIndex===4?250:sceneIndex===0?640:500,width:sceneIndex===2?610:sceneIndex===3?710:sceneIndex===0?650:700,borderTop:`2px solid ${sceneIndex===4?'#90AAFF':cobalt}`,fontFamily:'Arial',color:sceneIndex===4?'#E6DBC7':ink}}>{rows.map((row,i)=>{const enter=spring({frame:Math.max(0,frame-12-i*6),fps:30,config:{damping:18,stiffness:120,mass:.7}});return <div key={`${row[0]}-${i}`} style={{display:'grid',gridTemplateColumns:'150px 1fr',gap:18,padding:'12px 0',borderBottom:'1px solid rgba(9,16,24,.22)',opacity:enter,transform:`translateX(${(1-enter)*26}px)`}}><span style={{fontSize:12,letterSpacing:2,color:sceneIndex===4?'#90AAFF':cobalt,fontWeight:700}}>{row[0]}</span><span style={{fontSize:18,fontWeight:600}}>{row[1]}</span></div>})}</div>;
}

function CharacterFocus(){
  const frame = useCurrentFrame();
  const reveal = spring({frame:Math.max(0,frame-18),fps:30,config:{damping:20,stiffness:90,mass:.8}});
  const float = Math.sin(frame/16) * 5;
  return <div style={{position:'absolute',right:110,top:150,width:570,height:760,overflow:'hidden',border:'1px solid rgba(22,71,185,.38)',background:'rgba(230,219,199,.56)',boxShadow:'18px 20px 0 rgba(22,71,185,.12)',transform:`translateY(${(1-reveal)*90 + float}px) rotate(${(1-reveal)*3 - 1}deg)`,opacity:reveal}}>
    <Img src={staticFile('images/arun-pole-reader-hq.png')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',filter:'saturate(.9) contrast(1.08)'}} />
    <div style={{position:'absolute',left:18,top:18,padding:'9px 12px',background:cobalt,color:'#fff',fontFamily:'Arial',fontSize:13,letterSpacing:2}}>THREE.JS / GLB</div>
    <div style={{position:'absolute',left:18,right:18,bottom:18,display:'flex',justifyContent:'space-between',fontFamily:'Arial',fontSize:13,letterSpacing:2,color:ink}}><span>FIG. 03 / READER</span><span>INTERACTIVE</span></div>
    <div style={{position:'absolute',left:-30,top:'48%',width:630,height:1,background:'rgba(22,71,185,.5)',transform:`rotate(${Math.sin(frame/28)*2}deg)`}} />
  </div>;
}

function ProjectRail(){
  const frame = useCurrentFrame();
  const items = ['ATLAS LEDGER','NORTHSTAR LMS','REGISTRAR'];
  return <div style={{position:'absolute',left:80,bottom:210,display:'flex',gap:18}}>{items.map((item,i)=>{
    const enter = spring({frame:Math.max(0,frame-30-i*8),fps:30,config:{damping:18,stiffness:120,mass:.7}});
    return <div key={item} style={{width:245,height:88,padding:'18px 20px',background:i===0?cobalt:'rgba(9,16,24,.9)',color:i===0?'#fff':'#E6DBC7',transform:`translateY(${(1-enter)*30}px) rotate(${(1-enter)*2}deg)`,opacity:enter,boxShadow:'0 14px 24px rgba(9,16,24,.14)'}}><div style={{fontFamily:'Arial',fontSize:12,letterSpacing:2,color:i===0?'#BFD0FF':'#90AAFF'}}>0{i+1} / CONCEPT</div><div style={{fontFamily:'Arial',fontSize:18,fontWeight:700,marginTop:13,letterSpacing:-.5}}>{item}</div></div>;
  })}</div>;
}

function Scene({scene, sceneIndex}){
  const frame = useCurrentFrame();
  // Sequence resets useCurrentFrame() to zero for each scene. Keeping this
  // local prevents later scenes from being driven into negative opacity.
  const local = frame;
  const enter = interpolate(local,[0,18],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const exit = interpolate(local,[scene.dur-18,scene.dur],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const opacity = Math.min(enter, exit);
  const drift = interpolate(local,[0,scene.dur],[0,-18],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const scale = interpolate(local,[0,scene.dur],[1.04,1.12],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const dark = sceneIndex===4;
  const titleY = interpolate(enter,[0,1],[34,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  return <AbsoluteFill style={{opacity, background:dark?ink:paper, color:dark?paper:ink}}>
    <Img src={staticFile(`images/${scene.image}`)} style={{position:'absolute',right:0,top:0,width:'52%',height:'100%',objectFit:'cover',filter:sceneIndex===4?'grayscale(1) contrast(1.1)':'grayscale(.8) contrast(1.12)',transform:`scale(${scale}) translateY(${drift}px)`,opacity:sceneIndex===4?.45:.22}} />
    <div style={{position:'absolute',inset:0,background:sceneIndex===4?'linear-gradient(90deg, #091018 0%, rgba(9,16,24,.96) 42%, rgba(9,16,24,.25) 100%)':'linear-gradient(90deg, #E6DBC7 0%, rgba(230,219,199,.94) 53%, rgba(230,219,199,.18) 100%)'}} />
    <div style={{position:'absolute',left:80,top:68,right:80,display:'flex',justifyContent:'space-between',fontFamily:'Arial',fontSize:16,letterSpacing:3,fontWeight:700}}><span>{scene.kicker}</span><span>0{sceneIndex+1} / 05</span></div>
    <MotionAccent dark={dark}/>
    {sceneIndex===2 && <CharacterFocus/>}
    {sceneIndex===3 && <ProjectRail/>}
    <InfoTable sceneIndex={sceneIndex}/>
    <div style={{position:'absolute',left:80,top:'26%',width:'57%',transform:`translateY(${titleY}px)`}}>
      <div style={{fontFamily:'Arial',fontWeight:700,fontSize:22,letterSpacing:5,color:sceneIndex===4?'#90AAFF':cobalt,marginBottom:24}}>{sceneIndex===0?'01 — COVER':`0${sceneIndex+1} — ${scene.kicker.split(' / ')[0]}`}</div>
      <h1 style={{fontFamily:'Arial',fontSize:sceneIndex===0?152:sceneIndex===4?94:78,lineHeight:.9,letterSpacing:-6,margin:0,maxWidth:920}}>{scene.title}</h1>
      <p style={{fontFamily:'Arial',fontSize:28,lineHeight:1.25,maxWidth:760,marginTop:38,letterSpacing:-.5}}>{scene.body}</p>
    </div>
    <IntegratedCaption sceneFrom={scene.from} sceneIndex={sceneIndex}/>
    {sceneIndex===4 && <div style={{position:'absolute',left:80,bottom:136,fontFamily:'Arial',fontSize:22,letterSpacing:1.5}}>Built with curiosity. Driven by engineering. Inspired to keep learning.</div>}
    <Progress frame={scene.from + frame}/><Grain/>
  </AbsoluteFill>;
}

function Film(){
  return <AbsoluteFill style={{background:paper}}>
    {scenes.map((scene,i)=><Sequence key={scene.from} from={scene.from} durationInFrames={scene.dur}><Scene scene={scene} sceneIndex={i}/></Sequence>)}
    <Audio src={staticFile('audio/voiceover.wav')} volume={1}/>
    <Audio src={staticFile('audio/music.mp3')} volume={0.12}/>
    <div style={{position:'absolute',right:80,bottom:68,fontFamily:'Arial',fontSize:15,letterSpacing:2,color:'rgba(9,16,24,.7)'}}>AUSPIFY TECHNOLOGIES · 2026</div>
  </AbsoluteFill>;
}

function RemotionRoot(){
  return <Composition id="ArunLaunchFilm" component={Film} durationInFrames={750} fps={30} width={1920} height={1080} />;
}

registerRoot(RemotionRoot);
