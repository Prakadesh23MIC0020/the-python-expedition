export function createSoundscape() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null
  const ctx = new AudioCtx()
  let ambientNodes = []
  let chirpTimer = null
  let lastStep = -1

  const noiseBuffer = (duration, scale = 1) => {
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration))
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) * scale
    return buffer
  }

  const chirp = () => {
    if (ctx.state !== 'running') return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const now = ctx.currentTime
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1500 + Math.random() * 700, now)
    osc.frequency.exponentialRampToValueAtTime(2100 + Math.random() * 900, now + 0.09)
    osc.frequency.exponentialRampToValueAtTime(1200 + Math.random() * 500, now + 0.22)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.018, now + 0.025)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24)
    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.25)
  }

  const start = async () => {
    await ctx.resume()
    if (ambientNodes.length) return
    const wind = ctx.createBufferSource()
    wind.buffer = noiseBuffer(2, 0.35)
    wind.loop = true
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 480
    const windGain = ctx.createGain()
    windGain.gain.value = 0.12
    wind.connect(filter).connect(windGain).connect(ctx.destination)
    wind.start()

    const drone = ctx.createOscillator()
    const droneGain = ctx.createGain()
    drone.type = 'sine'
    drone.frequency.value = 164.81
    droneGain.gain.value = 0.012
    drone.connect(droneGain).connect(ctx.destination)
    drone.start()
    ambientNodes = [wind, drone]
    chirp()
    chirpTimer = window.setInterval(chirp, 5200)
  }

  const stop = () => {
    if (chirpTimer) window.clearInterval(chirpTimer)
    chirpTimer = null
    ambientNodes.forEach(node => { try { node.stop() } catch {} })
    ambientNodes = []
  }

  // Soft leafy crunch and muted footfall; no metallic/high-frequency clank.
  const grassStep = now => {
    const source = ctx.createBufferSource()
    source.buffer = noiseBuffer(0.12, 0.8)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(620, now)
    filter.frequency.exponentialRampToValueAtTime(260, now + 0.12)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.075, now + 0.018)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13)
    source.connect(filter).connect(gain).connect(ctx.destination)
    source.start(now)

    const thud = ctx.createOscillator()
    const thudGain = ctx.createGain()
    thud.type = 'sine'
    thud.frequency.setValueAtTime(105, now)
    thud.frequency.exponentialRampToValueAtTime(58, now + 0.09)
    thudGain.gain.setValueAtTime(0.0001, now)
    thudGain.gain.linearRampToValueAtTime(0.055, now + 0.012)
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11)
    thud.connect(thudGain).connect(ctx.destination)
    thud.start(now)
    thud.stop(now + 0.12)
  }

  // Short, rounded splash used only while Moss is inside the pond.
  const waterStep = now => {
    const source = ctx.createBufferSource()
    source.buffer = noiseBuffer(0.2, 0.9)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1050, now)
    filter.frequency.exponentialRampToValueAtTime(360, now + 0.19)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.12, now + 0.025)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2)
    source.connect(filter).connect(gain).connect(ctx.destination)
    source.start(now)

    const bubble = ctx.createOscillator()
    const bubbleGain = ctx.createGain()
    bubble.type = 'sine'
    bubble.frequency.setValueAtTime(230, now + 0.015)
    bubble.frequency.exponentialRampToValueAtTime(105, now + 0.16)
    bubbleGain.gain.setValueAtTime(0.0001, now)
    bubbleGain.gain.linearRampToValueAtTime(0.035, now + 0.025)
    bubbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17)
    bubble.connect(bubbleGain).connect(ctx.destination)
    bubble.start(now)
    bubble.stop(now + 0.18)
  }

  const step = surface => {
    if (ctx.state !== 'running') return
    const now = ctx.currentTime
    if (now - lastStep < 0.22) return
    lastStep = now
    if (surface === 'water') waterStep(now)
    else grassStep(now)
  }

  const interact = () => {
    if (ctx.state !== 'running') return
    const now = ctx.currentTime
    ;[523.25, 659.25, 783.99].forEach((frequency, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = frequency
      gain.gain.setValueAtTime(0.0001, now + index * 0.075)
      gain.gain.exponentialRampToValueAtTime(0.11, now + index * 0.075 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.075 + 0.3)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now + index * 0.075)
      osc.stop(now + index * 0.075 + 0.32)
    })
  }

  return { start, stop, step, interact, close: () => { stop(); ctx.close() } }
}
