import React, { useCallback, useEffect, useRef, useState } from 'react'
import { activities, world } from './data/activities.js'
import GameCanvas from './game/GameCanvas.jsx'
import { createSoundscape } from './game/sounds.js'

function Landing({ onStart, onSummary, onChooseSprite, night, onToggleTheme }) {
  const [help,setHelp]=useState(false)
  return <main className={`landing ${night ? "theme-night" : "theme-day"}`}>
    <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle day and night theme"><span>{night ? "☾" : "☀"}</span><b>{night ? "NIGHT MODE" : "DAY MODE"}</b><i className={night ? "toggle-knob night" : "toggle-knob"}/></button>
    <div className="landing-sky">
      <div className="sun"/>
      <div className="cloud cloud-one"/><div className="cloud cloud-two"/><div className="cloud cloud-three"/>
      <div className="sky-birds">⌁　⌁　⌁</div><div className="sky-starfield"/>
    </div>
    <div className="distant-mountains"><i/><i/><i/><i/></div>
    <div className="landing-horizon"><span/><span/><span/><span/><span/><span/></div>
    <div className="landing-hills"><div className="hill hill-back"/><div className="hill hill-front"/></div>
    <div className="landing-tree tree-left"/><div className="landing-tree tree-mid-left"/><div className="landing-tree tree-right"/><div className="landing-tree tree-mid-right"/>
    <div className="landing-house"><div className="house-roof"/><div className="house-body"><span/><i/></div><div className="house-chimney"/></div>
    <div className="scene-lamp lamp-left"/><div className="scene-lamp lamp-right"/>
    <div className="scene-fence fence-left"/><div className="scene-fence fence-right"/>
    <div className="scene-rock rock-one"/><div className="scene-rock rock-two"/>
    <div className="scene-flower flower-one"/><div className="scene-flower flower-two"/><div className="scene-flower flower-three"/>
    <div className="scene-path"/><div className="scene-bush bush-left"/><div className="scene-bush bush-right"/>
    <div className="landing-grass"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
    <div className="foreground-grass"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
    <div className="title-wrap">
      <div className="title-kicker">A LITTLE WORLD OF LEARNING</div>
      <h1>THE<br/><em>PYTHON</em><br/>EXPEDITION</h1>
      <p>My Advanced Python Programming Portfolio</p>
      <div className="student-credit"><strong>P. GANESH PRAKADESH</strong><span>M.Tech (Integrated) · Computer Science &amp; Engineering</span><span>VIT Vellore · 2023–2028</span></div>
      <button className="start-button" onClick={onStart}><span>▶</span> BEGIN ADVENTURE</button>
      <button className="summary-start-button" onClick={onSummary}>▤ VIEW PORTFOLIO SUMMARY</button><button className="how-button choose-sprite-landing" onClick={onChooseSprite}>♟ CHOOSE YOUR SPRITE</button>
      <button className="how-button" onClick={()=>setHelp(true)}>HOW TO PLAY <span>＋</span></button>
      {help&&<div className="guide-overlay" role="presentation" onClick={()=>setHelp(false)}>
        <section className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title" onClick={e=>e.stopPropagation()}>
          <div className="guide-top"><span>THE PYTHON EXPEDITION</span><button onClick={()=>setHelp(false)} aria-label="Close guide">✕</button></div>
          <h2 id="guide-title">YOUR EXPEDITION GUIDE</h2>
          <p className="guide-intro">Explore the world, visit each building, and discover the Python activities inside.</p>
          <div className="guide-section"><h3>DESKTOP CONTROLS</h3><div className="guide-row"><kbd>W A S D</kbd><span>Move Moss around the world</span></div><div className="guide-row"><kbd>↑ ↓ ← →</kbd><span>Move using the arrow keys</span></div><div className="guide-row"><kbd>ENTER</kbd><span>Enter a nearby building or interact</span></div><div className="guide-row"><kbd>M</kbd><span>Open the world map</span></div><div className="guide-row"><kbd>P</kbd><span>Pause or resume the expedition</span></div><div className="guide-row"><kbd>ESC</kbd><span>Close an open panel</span></div></div>
          <div className="guide-section"><h3>MOBILE CONTROLS</h3><p>Use the on-screen directional pad to move Moss. Tap the <strong>ENTER</strong> button when you are near a building to explore it.</p></div>
          <div className="guide-section"><h3>HOW TO EXPLORE</h3><p>Walk up to a building until the interaction prompt appears, then press ENTER or tap the mobile interaction button. Read through each activity using the page controls, and use the map to find your next destination.</p></div>
          <button className="guide-close" onClick={()=>setHelp(false)}>LET'S EXPLORE!</button>
        </section>
      </div>}
    </div>
    <div className="landing-footer"><span>PRESS START TO EXPLORE</span><span>✦ A PORTFOLIO QUEST ✦</span></div>
  </main>
}

function VisualPlaceholder({type}) {
  if(type==='gallery') return <div className="gallery-placeholder">{[0,1,2].map(i=><div className={`photo-tile tile-${i}`} key={i}><span>IMAGE {i+1}</span></div>)}</div>
  const labels={photo:'PHOTO ALBUM',story:'STORYBOARD PANELS',classroom:'TUTORIAL NOTES',blueprint:'PROJECT BLUEPRINT',diagram:'SYSTEM DIAGRAM',quiz:'QUIZ CARD',book:'OPEN BOOK',document:'DOCUMENT PREVIEW',audio:'AUDIO WAVEFORM',slides:'SLIDE PREVIEW',video:'VIDEO PREVIEW',question:'QUESTION BOARD'}
  return <div className={`visual-placeholder visual-${type||'image'}`}>
    {type==='audio'?<div className="waveform">{Array.from({length:28},(_,i)=><i key={i} style={{height:`${18+(i*17)%55}%`}}/>)}</div>:
    type==='book'?<div className="book-art"><div/><div/></div>:
    type==='video'?<div className="play-mark">▶</div>:
    type==='diagram'||type==='blueprint'?<div className="node-diagram"><i/><span/><b/><span/><i/></div>:
    type==='slides'?<div className="slide-art"><b/><i/><i/><span/></div>:
    type==='quiz'||type==='question'?<div className="question-art"><b>?</b><i/><i/><i/></div>:
    <div className="placeholder-icon">✦</div>}
    <span className="visual-label">{labels[type]||'IMAGE PLACEHOLDER'}</span><small>YOUR CONTENT GOES HERE</small>
  </div>
}


function PageMedia({page}) {
  const hasMedia=(page.images?.length||page.previews?.length||page.audio||page.links?.length)
  if(!hasMedia) return null
  return <div className="activity-media">
    {page.images?.length>0&&<div className="activity-image-grid">
      {page.images.map((img,i)=><a key={i} href={img.src} target="_blank" rel="noreferrer" className="activity-image-link" title="Open image">
        <img src={img.src} alt={img.caption||'Activity photograph'}/>
        {img.caption&&<span>{img.caption}</span>}
      </a>)}
    </div>}
    {page.previews?.length>0&&<div className="activity-document-previews">
      {page.previews.map((item,i)=><a key={i} href={item.href} target="_blank" rel="noreferrer" className="activity-document-preview">
        <img src={item.src} alt={item.label||'Document preview'}/>
        <span>{item.label||'Open document preview'} ↗</span>
      </a>)}
    </div>}
    {page.audio&&<div className="activity-audio">
      <div className="activity-media-kicker">AUDIO RECORDING</div>
      <audio controls preload="metadata" src={page.audio}/>
      {page.audioLabel&&<span>{page.audioLabel}</span>}
    </div>}
    {page.links?.length>0&&<div className="activity-links">
      {page.links.map((link,i)=><a key={i} href={link.url} target="_blank" rel="noreferrer">{link.label} <b>↗</b></a>)}
    </div>}
  </div>
}

function PageText({page}) {
  return <div className="dialogue-copy">
    <h3>{page.heading}</h3>
    <p>{page.body}</p>
    {page.bullets?.length>0&&<ul className="activity-bullets">{page.bullets.map((item,i)=><li key={i}>{item}</li>)}</ul>}
    <div className="content-note"><span>✦</span> {page.note||'ACTIVITY RECORD · COURSEWORK PORTFOLIO'}</div>
  </div>
}

function hasMediaForPage(page) {
  return Boolean(page.images?.length || page.previews?.length || page.audio || page.links?.length)
}

function Dialogue({activity,pageIndex,setPageIndex,onClose}) {
  const page=activity.pages[pageIndex],last=pageIndex===activity.pages.length-1
  return <div className="overlay dialogue-overlay"><section className="dialogue-panel" key={`${activity.id}-${pageIndex}`}>
    <div className="panel-topline"><span>PYTHON EXPEDITION / ENTRY {String(activity.id).padStart(2,'0')}</span><button onClick={onClose}>✕</button></div>
    <div className="dialogue-heading"><div className="activity-stamp">{String(activity.id).padStart(2,'0')}</div><div><div className="eyebrow">{page.eyebrow}</div><h2>{activity.title}</h2></div></div>
    <div className={`dialogue-content ${hasMediaForPage(page) ? '' : 'text-only'}`}><PageText page={page}/><PageMedia page={page}/></div>
    <div className="panel-bottom"><button className="exit-button" onClick={onClose}>← EXIT</button><div className="page-count"><span>{String(pageIndex+1).padStart(2,'0')}</span> / {String(activity.pages.length).padStart(2,'0')}</div><div className="page-actions"><button className="prev-button" disabled={pageIndex===0} onClick={()=>setPageIndex(i=>Math.max(0,i-1))}>PREVIOUS</button><button className="next-button" onClick={()=>last?onClose():setPageIndex(i=>Math.min(activity.pages.length-1,i+1))}>{last?'FINISH ✓':'NEXT →'}</button></div></div>
  </section></div>
}

function MapScreen({player,onClose,onSelect}) {
  return <div className="overlay map-overlay"><section className="map-panel">
    <div className="map-head"><div><div className="eyebrow">YOUR EXPEDITION GUIDE</div><h2>WORLD MAP</h2></div><button className="map-close" onClick={onClose}>✕ CLOSE</button></div>
    <div className="map-art">
      <div className="map-pond pond-a"/><div className="map-pond pond-b"/>
      <div className="map-trail trail-a"/><div className="map-trail trail-b"/><div className="map-trail trail-c"/>
      {activities.map(a=><button key={a.id} className="map-pin" style={{left:`${a.x/world.width*100}%`,top:`${a.y/world.height*100}%`}} onClick={()=>onSelect(a)} title={a.title}><span className="pin-dot">{String(a.id).padStart(2,'0')}</span><span className="pin-label">{a.short}</span></button>)}
      <div className="player-map-pin" style={{left:`${player.x/world.width*100}%`,top:`${player.y/world.height*100}%`}}><span>YOU</span></div>
    </div>
    <div className="map-legend"><span><i className="legend-building"/> Portfolio location</span><span><i className="legend-player"/> Your live position</span><small>PLAYER MARKER UPDATES AS YOU MOVE</small></div>
  </section></div>
}

function PauseScreen({onResume,onExit}) {
  return <div className="overlay pause-overlay"><section className="pause-panel">
    <div className="eyebrow">TAKE A BREATHER</div><h2>GAME PAUSED</h2><p>Your adventure is waiting right where you left it.</p>
    <button className="next-button" onClick={onResume}>▶ RESUME ADVENTURE</button>
    <button className="pause-exit" onClick={onExit}>↩ EXIT TO TITLE SCREEN</button>
    <small>PROGRESS IN THIS SESSION IS KEPT UNTIL YOU RELOAD.</small>
  </section></div>
}

function Summary({onBack}) {
  const [selected,setSelected]=useState(activities[0])
  const page=selected.pages[0]
  return <main className="summary-screen">
    <header className="summary-header"><div><div className="eyebrow">THE ADVENTURE, AT A GLANCE</div><h1>PORTFOLIO SUMMARY</h1></div><button className="map-close" onClick={onBack}>← BACK TO TITLE</button></header>
    <div className="summary-layout">
      <aside className="summary-list"><div className="summary-list-title">ACTIVITY INDEX <span>11 ENTRIES</span></div>{activities.map(a=><button key={a.id} className={selected.id===a.id?'selected':''} onClick={()=>setSelected(a)}><b>{String(a.id).padStart(2,'0')}</b><span>{a.title}</span><i>→</i></button>)}</aside>
      <article className="summary-detail" key={selected.id}>
        <div className="summary-entry-tag">PYTHON EXPEDITION / ENTRY {String(selected.id).padStart(2,'0')}</div>
        <div className="summary-title-row"><div className="activity-stamp">{String(selected.id).padStart(2,'0')}</div><div><div className="eyebrow">{page.eyebrow}</div><h2>{selected.title}</h2></div></div>
        <p className="summary-description">{selected.description}</p>
        {selected.pages.map((p,i)=><section className="summary-content-page" key={i}>
          <div className="summary-page-heading"><span>PAGE {String(i+1).padStart(2,'0')}</span><h3>{p.heading}</h3></div>
          <p>{p.body}</p>
          {p.bullets?.length>0&&<ul className="activity-bullets">{p.bullets.map((item,j)=><li key={j}>{item}</li>)}</ul>}
          <PageMedia page={p}/>
        </section>)}
        <div className="summary-footnote">ACTIVITY MATERIALS · PHOTOGRAPHS, DOCUMENT PREVIEWS AND LINKS ARE INCLUDED WHERE PROVIDED.</div>
      </article>
    </div>
    <footer className="summary-footer">✦ ADVANCED PYTHON PROGRAMMING · A JOURNEY THROUGH MY LEARNING ADVENTURES ✦</footer>
  </main>
}


const characterOptions = [
  {id:'male',name:'Ranger',label:'MALE EXPLORER',description:'A curious adventurer with a red jacket, sturdy boots and a knack for finding hidden places.',ability:'STANDARD EXPLORATION',className:'preview-male'},
  {id:'female',name:'Nova',label:'FEMALE EXPLORER',description:'A bright and resourceful explorer, ready to uncover every corner of the learning world.',ability:'STANDARD EXPLORATION',className:'preview-female'},
  {id:'crocodile',name:'Moss',label:'CROCODILE COMPANION',description:'A friendly little crocodile with a confident tail-swishing walk. Moss can walk across water and explore pond areas that other characters cannot cross.',ability:'SPECIAL ABILITY · WALK ON WATER',className:'preview-crocodile'}
]

function CharacterPicker({selected,onSelect,onClose,onConfirm,confirmLabel='USE THIS SPRITE'}) {
  const [choice,setChoice]=useState(selected||'male')
  const current=characterOptions.find(c=>c.id===choice)||characterOptions[0]
  return <div className="overlay character-overlay"><section className="character-panel">
    <div className="panel-topline"><span>PLAYER CUSTOMIZATION / CHARACTER SELECT</span><button onClick={onClose}>✕</button></div>
    <div className="character-intro"><div className="eyebrow">CHOOSE YOUR COMPANION</div><h2>WHO'S EXPLORING TODAY?</h2><p>Pick a character for your adventure. Each has a unique pixel sprite.</p></div>
    <div className="character-options">
      {characterOptions.map(c=><button key={c.id} className={`character-option ${choice===c.id?'chosen':''}`} onClick={()=>setChoice(c.id)}>
        <div className={`character-preview ${c.className}`}><i/><b/><span/></div>
        <strong>{c.name}</strong><small>{c.label}</small>
        {choice===c.id&&<em>✓ SELECTED</em>}
      </button>)}
    </div>
    <div className="character-description"><div><span className="eyebrow">CHARACTER PROFILE</span><h3>{current.name} <small>· {current.label}</small></h3><p>{current.description}</p><b className={current.id==='crocodile'?'water-ability':''}>{current.ability}</b></div></div>
    <div className="character-footer"><button className="exit-button" onClick={onClose}>CANCEL</button><button className="next-button" onClick={()=>{onSelect(choice);onConfirm?.()}}>{confirmLabel} →</button></div>
  </section></div>
}


function MobileController({onControl,onInteract}) {
  const hold=(key,pressed)=>event=>{event.preventDefault();onControl(key,pressed)}
  const button=(key,label,extra='')=><button className={`mobile-control ${extra}`} aria-label={label} onPointerDown={hold(key,true)} onPointerUp={hold(key,false)} onPointerCancel={hold(key,false)} onPointerLeave={hold(key,false)} onContextMenu={e=>e.preventDefault()}>{label}</button>
  return <div className="mobile-controller" aria-label="Touch game controls">
    <div className="mobile-dpad">
      {button('w','▲','dpad-up')}{button('a','◀','dpad-left')}{button('s','▼','dpad-down')}{button('d','▶','dpad-right')}
    </div>
    <button className="mobile-control mobile-interact" onClick={onInteract}>ENTER<br/><small>INTERACT</small></button>
  </div>
}

export default function App() {
  const [started,setStarted]=useState(false),[summary,setSummary]=useState(false)
  const [active,setActive]=useState(null),[pageIndex,setPageIndex]=useState(0)
  const [mapOpen,setMapOpen]=useState(false),[paused,setPaused]=useState(false)
  const [player,setPlayer]=useState({x:1040,y:760}),[nearby,setNearby]=useState(null)
  const [sound,setSound]=useState(false),[sprite,setSprite]=useState('male'),[spritePicker,setSpritePicker]=useState(false),[night,setNight]=useState(false)
  const [mobileDevice,setMobileDevice]=useState(false)
  const controlRef=useRef(null),soundEngine=useRef(null)
  const openActivity=useCallback(a=>{setActive(a);setPageIndex(0);setMapOpen(false)},[])
  const handleInteract=useCallback(a=>{soundEngine.current?.interact();openActivity(a)},[openActivity])
  const playStep=useCallback(surface=>{if(sound)soundEngine.current?.step(surface)},[sound])
  const toggleSound=async()=>{
    if(sound){soundEngine.current?.stop();setSound(false);return}
    if(!soundEngine.current)soundEngine.current=createSoundscape()
    if(soundEngine.current){await soundEngine.current.start();setSound(true)}
  }
  useEffect(()=>()=>{soundEngine.current?.close();soundEngine.current=null},[])
  const closeDialogue=useCallback(()=>setActive(null),[])
  const exitToTitle=()=>{setStarted(false);setPaused(false);setMapOpen(false);setActive(null);setNearby(null);setPlayer({x:1040,y:760})}

  useEffect(()=>{
    const media=window.matchMedia('(pointer: coarse)')
    const update=()=>setMobileDevice(media.matches || window.innerWidth<=760)
    update();media.addEventListener?.('change',update);window.addEventListener('resize',update)
    return()=>{media.removeEventListener?.('change',update);window.removeEventListener('resize',update)}
  },[])

  useEffect(()=>{
    const handler=e=>{
      if(e.key==='Escape'){if(spritePicker)setSpritePicker(false);else if(active)setActive(null);else if(mapOpen)setMapOpen(false);else if(paused)setPaused(false);else if(started)setPaused(true)}
      if((e.key==='p'||e.key==='P')&&started&&!active&&!mapOpen&&!spritePicker)setPaused(v=>!v)
      if((e.key==='m'||e.key==='M')&&started&&!active&&!paused&&!spritePicker)setMapOpen(v=>!v)
    }
    window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler)
  },[started,active,mapOpen,paused,spritePicker])

  if(summary)return <div className={night?'theme-night app-theme':'app-theme'}><Summary onBack={()=>setSummary(false)}/></div>
  if(!started)return <div className={night?"theme-night landing-root-night":"landing-root-day"}><Landing night={night} onToggleTheme={()=>setNight(v=>!v)} onStart={()=>setStarted(true)} onSummary={()=>setSummary(true)} onChooseSprite={()=>setSpritePicker(true)}/>{spritePicker&&<CharacterPicker selected={sprite} onSelect={setSprite} onClose={()=>setSpritePicker(false)} confirmLabel="SAVE CHARACTER" onConfirm={()=>setSpritePicker(false)}/>}</div>
  return <main className={`game-shell ${night ? "theme-night" : "theme-day"}`}>
    <GameCanvas activities={activities} player={player} setPlayer={setPlayer} paused={!!active||mapOpen||paused||spritePicker} night={night} sprite={sprite} onNearby={setNearby} onInteract={handleInteract} onStep={playStep} controlRef={controlRef}/>
    <header className="hud"><div className="hud-brand"><span className="brand-mark">✦</span><div><b>PYTHON</b><small>THE EXPEDITION</small></div></div>
      <div className="hud-actions"><button onClick={()=>setMapOpen(true)}>⌖ <span>VIEW MAP</span></button><button className={sound?'sound-on':''} onClick={toggleSound}>{sound?'♫':'♪'} <span>SOUND {sound?'ON':'OFF'}</span></button><button onClick={()=>setSpritePicker(true)}>♟ <span>SPRITE</span></button><button onClick={()=>setPaused(true)}>Ⅱ <span>PAUSE</span></button></div>
    </header>
    {nearby&&!active&&!mapOpen&&!paused&&<div className="nearby-prompt"><span className="keycap">ENTER</span><div><b>{nearby.title}</b><small>Explore this location</small></div><span className="prompt-arrow">↵</span></div>}
    <div className="controls-hint"><span>W A S D <i>MOVE</i></span><b>·</b><span>ENTER <i>INTERACT</i></span><b>·</b><span>M <i>MAP</i></span><b>·</b><span>P <i>PAUSE</i></span></div>
    <div className="world-corner">GREENWICK <span>✦</span> ROUTE 01</div>
    {mobileDevice&&!active&&!mapOpen&&!paused&&!spritePicker&&<MobileController onControl={(key,pressed)=>controlRef.current?.(key,pressed)} onInteract={()=>{if(nearby)handleInteract(nearby)}}/>}
    {active&&<Dialogue activity={active} pageIndex={pageIndex} setPageIndex={setPageIndex} onClose={closeDialogue}/>}
    {mapOpen&&<MapScreen player={player} onClose={()=>setMapOpen(false)} onSelect={openActivity}/>}
    {paused&&<PauseScreen onResume={()=>setPaused(false)} onExit={exitToTitle}/>}{spritePicker&&<CharacterPicker selected={sprite} onSelect={setSprite} onClose={()=>setSpritePicker(false)} onConfirm={()=>setSpritePicker(false)}/>}
  </main>
}
