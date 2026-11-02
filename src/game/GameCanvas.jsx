import React, { useEffect, useRef } from 'react'
import { world } from '../data/activities.js'

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const hash = (x, y) => ((x * 374761393 + y * 668265263) ^ (x * y * 1274126177)) >>> 0
const rand = (x, y, n) => hash(x, y) % n

function tree(ctx, x, y, s=1) {
  ctx.save(); ctx.translate(x,y); ctx.scale(s,s)
  ctx.fillStyle='#76503a'; ctx.fillRect(-5,7,10,22)
  ctx.fillStyle='#176b52'; ctx.fillRect(-18,-12,36,27); ctx.fillRect(-13,-22,26,15)
  ctx.fillStyle='#25865c'; ctx.fillRect(-14,-17,28,18); ctx.fillRect(-20,-8,9,14); ctx.fillRect(11,-7,9,13)
  ctx.fillStyle='#9be15d'; ctx.fillRect(-9,-18,7,5); ctx.fillRect(5,-10,6,4)
  ctx.restore()
}
function building(ctx, a) {
  const x=a.x,y=a.y
  const palettes={
    observatory:['#fff0c9','#465d91','#ffca5c'], loglab:['#d9f4ff','#263f79','#61e2d0'], cottage:['#ffe0b0','#d45b58','#ffbf69'],
    school:['#d8f1ed','#477db0','#ffcf69'],lab:['#d9f8e8','#287f85','#6de0d0'],
    quiz:['#fff0c7','#9a5cbd','#f7c85d'],library:['#f8e4c8','#8c5a3f','#eab66d'],
    studio:['#f1ddff','#694f9b','#e58ac5'],hall:['#ffe3c2','#d65c70','#ffc36b'],
    cinema:['#e9ddff','#594e83','#ffcf75'],digital:['#d9f4ff','#3475a6','#73d5e5']
  }
  const p=palettes[a.building]||palettes.cottage
  ctx.save();ctx.translate(x,y)
  ctx.fillStyle='rgba(31,51,49,.28)';ctx.fillRect(-62,42,124,13)
  // Every activity gets a different silhouette, not just a recoloured house.
  if(a.building==='observatory'){
    ctx.fillStyle=p[0];ctx.fillRect(-43,-4,86,46);ctx.fillStyle=p[1];ctx.fillRect(-48,-5,96,8)
    ctx.fillStyle=p[1];ctx.fillRect(-30,-31,60,29);ctx.fillRect(-38,-31,76,7)
    ctx.fillStyle=p[2];ctx.beginPath();ctx.arc(0,-31,31,Math.PI,0);ctx.fill()
    ctx.fillStyle='#243f66';ctx.fillRect(-3,-55,6,27);ctx.fillRect(-17,-38,34,4)
    ctx.fillStyle='#fff4b4';ctx.fillRect(-5,-22,10,10)
  } else if(a.building==='school'){
    ctx.fillStyle=p[0];ctx.fillRect(-50,-7,100,49);ctx.fillRect(-29,-28,58,22)
    ctx.fillStyle=p[1];ctx.beginPath();ctx.moveTo(-58,-7);ctx.lineTo(0,-34);ctx.lineTo(58,-7);ctx.closePath();ctx.fill()
    ctx.fillStyle=p[2];ctx.fillRect(-13,-48,26,20);ctx.fillRect(-5,-58,10,10)
    ctx.fillStyle='#fff4c7';ctx.fillRect(-7,-43,14,14)
  } else if(a.building==='lab'){
    ctx.fillStyle=p[1];ctx.fillRect(-48,-4,96,47);ctx.fillRect(-29,-25,58,23)
    ctx.fillStyle=p[0];ctx.fillRect(-42,2,84,37);ctx.fillRect(-22,-19,44,18)
    ctx.fillStyle=p[2];ctx.fillRect(-13,-50,26,29);ctx.fillRect(-7,-60,14,10)
    ctx.fillStyle='#faffda';ctx.fillRect(-7,-44,14,12);ctx.fillRect(-35,8,12,12);ctx.fillRect(23,8,12,12)
  } else if(a.building==='loglab'){
    ctx.fillStyle=p[1];ctx.fillRect(-53,-5,106,48);ctx.fillRect(-36,-29,72,24)
    ctx.fillStyle=p[0];ctx.fillRect(-46,2,92,36);ctx.fillRect(-29,-23,58,18)
    ctx.fillStyle=p[2];ctx.fillRect(-17,-51,34,22);ctx.fillRect(-9,-59,18,8)
    ctx.fillStyle='#20365d';ctx.fillRect(-10,-46,20,12)
    ctx.fillStyle='#b8fff0';ctx.fillRect(-6,-43,12,6)
    ctx.fillStyle=p[2];ctx.fillRect(-42,12,10,13);ctx.fillRect(32,12,10,13)
    ctx.fillStyle='#fff5c8';ctx.fillRect(-9,17,18,21)
  } else if(a.building==='quiz'){
    ctx.fillStyle=p[0];ctx.fillRect(-47,-4,94,47)
    ctx.fillStyle=p[1];ctx.beginPath();ctx.moveTo(-55,-4);ctx.lineTo(-30,-35);ctx.lineTo(-12,-4);ctx.lineTo(0,-43);ctx.lineTo(15,-4);ctx.lineTo(34,-35);ctx.lineTo(56,-4);ctx.closePath();ctx.fill()
    ctx.fillStyle=p[2];ctx.fillRect(-8,-58,16,18);ctx.fillRect(-3,-64,6,6)
    ctx.fillStyle='#fff5d7';ctx.font='bold 20px Arial';ctx.textAlign='center';ctx.fillText('?',0,25)
  } else if(a.building==='library'){
    ctx.fillStyle=p[0];ctx.fillRect(-45,-17,90,60);ctx.fillRect(-55,-17,110,9)
    ctx.fillStyle=p[1];ctx.fillRect(-50,-31,100,14);ctx.fillRect(-43,-41,86,10)
    ctx.fillStyle=p[2];ctx.fillRect(-35,-10,13,25);ctx.fillRect(-6,-10,13,25);ctx.fillRect(23,-10,13,25)
    ctx.fillStyle='#fff0c6';ctx.fillRect(-10,19,20,24)
  } else if(a.building==='studio'){
    ctx.fillStyle=p[0];ctx.fillRect(-45,-2,90,45)
    ctx.fillStyle=p[1];ctx.beginPath();ctx.moveTo(-55,-2);ctx.lineTo(-35,-34);ctx.lineTo(35,-34);ctx.lineTo(55,-2);ctx.closePath();ctx.fill()
    ctx.fillStyle=p[2];ctx.fillRect(-12,-52,24,20);ctx.fillRect(-5,-58,10,7)
    ctx.fillStyle='#fff0fa';ctx.fillRect(-7,7,14,24);ctx.fillRect(-17,15,34,5)
  } else if(a.building==='hall'){
    ctx.fillStyle=p[0];ctx.fillRect(-53,-4,106,47);ctx.fillRect(-31,-27,62,25)
    ctx.fillStyle=p[1];ctx.beginPath();ctx.moveTo(-62,-4);ctx.lineTo(-31,-39);ctx.lineTo(0,-4);ctx.lineTo(31,-39);ctx.lineTo(62,-4);ctx.closePath();ctx.fill()
    ctx.fillStyle=p[2];ctx.fillRect(-45,-18,7,48);ctx.fillRect(38,-18,7,48);ctx.fillRect(-6,-20,12,16)
  } else if(a.building==='cinema'){
    ctx.fillStyle=p[0];ctx.fillRect(-48,-4,96,47)
    ctx.fillStyle=p[1];ctx.fillRect(-56,-14,112,13);ctx.fillRect(-45,-28,90,13)
    ctx.fillStyle=p[2];ctx.fillRect(-37,-7,74,6);ctx.fillRect(-30,5,60,26)
    ctx.fillStyle='#443b65';ctx.fillRect(-23,9,46,21);ctx.fillStyle='#fff0c6';ctx.fillRect(-3,13,6,6)
  } else if(a.building==='digital'){
    ctx.fillStyle=p[1];ctx.fillRect(-47,-3,94,46);ctx.fillRect(-33,-24,66,22)
    ctx.fillStyle=p[0];ctx.fillRect(-40,4,80,34);ctx.fillRect(-26,-19,52,18)
    ctx.fillStyle=p[2];ctx.fillRect(-14,-50,28,28);ctx.fillRect(-7,-58,14,8)
    ctx.fillStyle='#fff';ctx.fillRect(-7,-42,14,13);ctx.fillRect(-3,-38,6,5)
  } else {
    ctx.fillStyle=p[0];ctx.fillRect(-44,-5,88,48);ctx.fillStyle=p[1]
    ctx.beginPath();ctx.moveTo(-54,-5);ctx.lineTo(0,-45);ctx.lineTo(54,-5);ctx.closePath();ctx.fill()
    ctx.fillStyle=p[2];ctx.fillRect(-10,16,20,27)
  }
  // Activity signboard is consistently fixed to each building's footprint.
  ctx.fillStyle='#55415d';ctx.fillRect(-61,47,122,18)
  ctx.fillStyle='#fff8df';ctx.font='bold 9px Arial';ctx.textAlign='center'
  ctx.fillText(a.short.toUpperCase().slice(0,24),0,60)
  ctx.restore()
}
function playerSprite(ctx,x,y,dir,frame,sprite='male') {
  ctx.save();ctx.translate(Math.round(x),Math.round(y))
  const bob=frame?1:0
  ctx.fillStyle='rgba(31,54,34,.28)';ctx.fillRect(-10,11,20,4)
  if(sprite==='crocodile'){
    // Moss has only two orientations: facing right (default) or mirrored to face left.
    // Vertical movement never rotates him upside down or onto his side.
    if(dir==='left')ctx.scale(-1,1)
    // Compact, friendly pixel crocodile with a long tail and tiny legs.
    ctx.fillStyle='#26734f';ctx.fillRect(-18,-1+bob,10,7);ctx.fillRect(-23,frame?-7:2,6,5)
    ctx.fillStyle='#3da96e';ctx.fillRect(-12,-8+bob,22,17);ctx.fillRect(5,-11+bob,14,15)
    ctx.fillStyle='#74d58c';ctx.fillRect(-8,-5+bob,13,5);ctx.fillRect(7,-8+bob,9,5)
    ctx.fillStyle='#2a8158';ctx.fillRect(-8,8+bob,5,5);ctx.fillRect(5,8+(frame?-1:0)+bob,5,5)
    ctx.fillStyle='#e7f1b0';ctx.fillRect(14,-6+bob,3,3);ctx.fillStyle='#234a38';ctx.fillRect(15,-6+bob,2,2)
    ctx.fillStyle='#f5e8a6';ctx.fillRect(19,bob,5,3);ctx.fillRect(18,4+bob,5,2)
    ctx.fillStyle='#2a8158';ctx.fillRect(-4,-12+bob,4,4);ctx.fillRect(4,-12+bob,4,4)
  } else {
    const female=sprite==='female'
    ctx.fillStyle=female?'#523b70':'#35465d'
    ctx.fillRect(-7,2+bob,5,9);ctx.fillRect(2,2+(frame?-1:0),5,9)
    ctx.fillStyle=female?'#d85e89':'#e7bd8e';ctx.fillRect(-7,-10,14,13)
    ctx.fillStyle=female?'#5a315e':'#4b342c'
    ctx.fillRect(-8,-13,16,6);ctx.fillRect(-9,-8,3,8)
    if(female){ctx.fillRect(6,-9,4,12);ctx.fillStyle='#f2c1d0';ctx.fillRect(-7,-14,4,3)}
    ctx.fillStyle=female?'#3e83b7':'#d45f50';ctx.fillRect(-8,-1,16,7)
    ctx.fillStyle='#f0d6a4';ctx.fillRect(-7,0,14,2)
    ctx.fillStyle='#e7bd8e'
    if(dir==='left')ctx.fillRect(-9,-5,3,7);else if(dir==='right')ctx.fillRect(6,-5,3,7);else{ctx.fillRect(-8,-4,3,7);ctx.fillRect(5,-4,3,7)}
    ctx.fillStyle='#3a302d'
    if(dir==='down'){ctx.fillRect(-4,-6,2,2);ctx.fillRect(3,-6,2,2)}
    if(dir==='left')ctx.fillRect(-8,-7,2,2);if(dir==='right')ctx.fillRect(6,-7,2,2)
    if(female){ctx.fillStyle='#f2c1d0';ctx.fillRect(-8,-2,3,4)}
  }
  ctx.restore()
}
function drawWorld(ctx, camera, activities, w, h) {
  ctx.fillStyle='#78b96a';ctx.fillRect(0,0,w,h)
  ctx.save()
  // All scenery is drawn in world coordinates, then moved only by the camera.
  ctx.translate(-camera.x,-camera.y)
  for(let ty=0;ty<Math.ceil(world.height/32);ty++) for(let tx=0;tx<Math.ceil(world.width/32);tx++){
    const x=tx*32,y=ty*32,r=rand(tx,ty,100)
    ctx.fillStyle=r<20?'#68c86d':r<40?'#8bdd72':r<47?'#58b96c':'#76d477'
    ctx.fillRect(x,y,32,32)
    if(r%5===0){ctx.fillStyle='#c4f17a';ctx.fillRect(x+6+(r%12),y+7,2,4);ctx.fillRect(x+21,y+20,2,3)}
    if(r%17===0){ctx.fillStyle=['#ffe16b','#ff8fb1','#fff6c9'][r%3];ctx.fillRect(x+12,y+12,4,4)}
  }
  // Main winding path.
  ctx.fillStyle='#b99a69';ctx.beginPath();ctx.moveTo(0,690);ctx.bezierCurveTo(380,620,470,820,720,750);ctx.bezierCurveTo(1000,670,1060,520,1240,570);ctx.bezierCurveTo(1500,650,1660,780,2100,700);ctx.lineTo(2100,755);ctx.bezierCurveTo(1660,835,1500,705,1230,625);ctx.bezierCurveTo(1050,575,980,730,730,810);ctx.bezierCurveTo(470,880,380,680,0,750);ctx.closePath();ctx.fill()
  // A second trail and a pond.
  ctx.fillStyle='#c2a274';ctx.beginPath();ctx.moveTo(270,455);ctx.lineTo(700,145);ctx.lineTo(718,158);ctx.lineTo(288,470);ctx.closePath();ctx.fill()
  ctx.fillStyle='#c2a274';ctx.beginPath();ctx.moveTo(480,760);ctx.lineTo(935,1050);ctx.lineTo(918,1065);ctx.lineTo(465,778);ctx.closePath();ctx.fill()
  ctx.fillStyle='#ffe08a';ctx.beginPath();ctx.ellipse(1720,1120,190,108,-.2,0,Math.PI*2);ctx.fill()
  ctx.fillStyle='#36b8d1';ctx.beginPath();ctx.ellipse(1720,1120,180,98,-.2,0,Math.PI*2);ctx.fill()
  ctx.fillStyle='#75e0d0';ctx.beginPath();ctx.ellipse(1705,1102,145,69,-.2,0,Math.PI*2);ctx.fill()
  for(let i=0;i<76;i++){
    const x=hash(i,12)%2000,y=hash(i,38)%1400
    if(activities.some(a=>Math.abs(a.x-x)<125&&Math.abs(a.y-y)<105))continue
    if(Math.abs(y-730)<65 || (x>1520&&y>1000))continue
    tree(ctx,x,y,.8+(i%3)*.12)
  }
  for(let i=0;i<45;i++){const x=hash(i,92)%2050,y=hash(i,21)%1450;ctx.fillStyle='#20875a';ctx.fillRect(x-10,y-5,20,12);ctx.fillRect(x-6,y-10,12,7);ctx.fillStyle='#9de16c';ctx.fillRect(x-6,y-8,5,4)}
  // Bridge
  ctx.fillStyle='#79583e';ctx.fillRect(1650,1050,150,20);ctx.fillStyle='#c69a65';ctx.fillRect(1650,1053,150,13)
  for(let i=0;i<8;i++){ctx.fillStyle='#8b6547';ctx.fillRect(1660+i*18,1047,4,26)}
  activities.forEach(a=>building(ctx,a))
  ctx.restore()
}

export default function GameCanvas({activities, player, setPlayer, paused, sprite='male', onNearby, onInteract, onStep, controlRef}) {
  const canvasRef=useRef(null), keys=useRef({}), pos=useRef({x:player.x,y:player.y})
  const dir=useRef('down'), frame=useRef(0), camera=useRef({x:0,y:0}), near=useRef(null)
  useEffect(()=>{pos.current={x:player.x,y:player.y}},[])
  useEffect(()=>{
    if(controlRef)controlRef.current=(key,pressed)=>{keys.current[key]=pressed}
    return()=>{if(controlRef)controlRef.current=null}
  },[controlRef])
  useEffect(()=>{
    const down=e=>{
      const k=e.key.toLowerCase()
      if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','enter'].includes(k)){e.preventDefault();keys.current[k]=true}
    }
    const up=e=>{keys.current[e.key.toLowerCase()]=false}
    const blur=()=>{keys.current={}}
    window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',blur)
    return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',blur)}
  },[])
  useEffect(()=>{
    const canvas=canvasRef.current,ctx=canvas.getContext('2d')
    let raf,last=0,step=0,lastPublish=0
    const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.floor(canvas.clientWidth*dpr);canvas.height=Math.floor(canvas.clientHeight*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
    resize();window.addEventListener('resize',resize)
    const loop=time=>{
      const dt=Math.min((time-last)/16.67||1,2);last=time
      const w=canvas.clientWidth,h=canvas.clientHeight
      if(!paused){
        const k=keys.current;let dx=0,dy=0
        if(k.w||k.arrowup)dy--;if(k.s||k.arrowdown)dy++;if(k.a||k.arrowleft)dx--;if(k.d||k.arrowright)dx++
        if(dx||dy){
          const len=Math.hypot(dx,dy);dx/=len;dy/=len
          if(sprite==='crocodile'){if(dx<0)dir.current='left';else if(dx>0)dir.current='right'}else{dir.current=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down')}
          step+=dt;frame.current=Math.floor(step/8)%2
          const speed=3.1*dt,nx=pos.current.x+dx*speed,ny=pos.current.y+dy*speed
          // Building collision uses fixed world-space rectangles (not screen coordinates).
          const blocked=(x,y)=>{
            if(x<24||y<24||x>world.width-24||y>world.height-24)return true
            // Solid collision boxes for every activity building.
            if(activities.some(a=>x>a.x-57&&x<a.x+57&&y>a.y-54&&y<a.y+42))return true
            // Trees use the exact same deterministic world positions as the scenery renderer.
            for(let i=0;i<76;i++){
              const tx=hash(i,12)%2000,ty=hash(i,38)%1400
              if(activities.some(a=>Math.abs(a.x-tx)<125&&Math.abs(a.y-ty)<105))continue
              if(Math.abs(ty-730)<65||(tx>1520&&ty>1000))continue
              if(Math.abs(x-tx)<24&&Math.abs(y-ty)<25)return true
            }
            // The pond is impassable for human characters. Moss the crocodile can cross it.
            if(sprite!=='crocodile'){
              const dx=(x-1720)/183,dy=(y-1120)/101
              if(dx*dx+dy*dy<1)return true
            }
            return false
          }
          const oldX=pos.current.x,oldY=pos.current.y
          if(!blocked(nx,pos.current.y))pos.current.x=nx
          if(!blocked(pos.current.x,ny))pos.current.y=ny
          if(pos.current.x!==oldX||pos.current.y!==oldY){
            const pondX=pos.current.x-1720,pondY=pos.current.y-1120
            const waterDx=(pondX*Math.cos(.2)-pondY*Math.sin(.2))/180
            const waterDy=(pondX*Math.sin(.2)+pondY*Math.cos(.2))/98
            const onWater=sprite==='crocodile'&&waterDx*waterDx+waterDy*waterDy<1
            onStep?.(onWater?'water':'grass')
          }
        } else frame.current=0
        let closest=null,dist=Infinity
        activities.forEach(a=>{const d=Math.hypot(a.x-pos.current.x,a.y+22-pos.current.y);if(d<dist){dist=d;closest=a}})
        const next=dist<105?closest:null
        if(next?.id!==near.current?.id){near.current=next;onNearby(next)}
        if(k.enter&&next){keys.current.enter=false;onInteract(next)}
        camera.current.x+=(clamp(pos.current.x-w/2,0,world.width-w)-camera.current.x)*.14
        camera.current.y+=(clamp(pos.current.y-h/2,0,world.height-h)-camera.current.y)*.14
        if(time-lastPublish>90){setPlayer({x:pos.current.x,y:pos.current.y});lastPublish=time}
      }
      ctx.clearRect(0,0,w,h)
      drawWorld(ctx,camera.current,activities,w,h)
      // The only moving world character is drawn in camera-relative screen coordinates.
      playerSprite(ctx,pos.current.x-camera.current.x,pos.current.y-camera.current.y,dir.current,frame.current,sprite)
      if(near.current&&!paused){
        ctx.save();ctx.translate(-camera.current.x,-camera.current.y);ctx.strokeStyle='#fff2ad';ctx.lineWidth=3;ctx.setLineDash([5,4]);ctx.strokeRect(near.current.x-59,near.current.y-55,118,112);ctx.restore()
      }
      raf=requestAnimationFrame(loop)
    }
    raf=requestAnimationFrame(loop)
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[activities,paused,onNearby,onInteract,onStep,setPlayer,sprite])
  return <canvas ref={canvasRef} className="game-canvas" aria-label="Explorable pixel-art portfolio world"/>
}
