"use client";

// Frequencies for Happy Birthday/Canon in D notes
export const NOTES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  FS4: 369.99, // F#4
  G4: 392.00,
  A4: 440.00,
  AS4: 466.16,
  B4: 493.88,
  C5: 523.25,
  CS5: 554.37, // C#5
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  FS5: 739.99, // F#5
  G5: 783.99,
  A5: 880.00,
};

// Canon in D melody arrangement (sweet music box chime)
// Note: duration is in beats. 1 beat = 0.5 seconds at 120 BPM. Let's make each note play for 2 beats (1 second).
export const BIRTHDAY_MELODY = [
  { note: NOTES.FS5, beats: 2 },
  { note: NOTES.E5, beats: 2 },
  { note: NOTES.D5, beats: 2 },
  { note: NOTES.CS5, beats: 2 },
  { note: NOTES.B4, beats: 2 },
  { note: NOTES.A4, beats: 2 },
  { note: NOTES.B4, beats: 2 },
  { note: NOTES.CS5, beats: 2 },

  { note: NOTES.D5, beats: 2 },
  { note: NOTES.CS5, beats: 2 },
  { note: NOTES.B4, beats: 2 },
  { note: NOTES.A4, beats: 2 },
  { note: NOTES.G4, beats: 2 },
  { note: NOTES.FS4, beats: 2 },
  { note: NOTES.G4, beats: 2 },
  { note: NOTES.E4, beats: 2 },
];

/**
 * Play a music-box style chime tone
 */
export function playChimeTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  startTime: number,
  volume: number = 0.06
) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();

  // Root frequency
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(frequency, startTime);

  // Octave harmonic for chime brightness
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(frequency * 2, startTime);

  // Soft envelope
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration - 0.02);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc1.start(startTime);
  osc2.start(startTime);

  osc1.stop(startTime + duration);
  osc2.stop(startTime + duration);
}

/**
 * Puppy Popup sound (cute bark)
 */
export function playWoof(ctx: AudioContext) {
  const now = ctx.currentTime;

  const bark = (time: number, startFreq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";

    // Fast pitch drop
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 0.45, time + 0.12);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.12);
  };

  // Cute double woof
  bark(now, 380);
  bark(now + 0.14, 340);
}

/**
 * Standard Pop sound effect
 */
export function playPop(ctx: AudioContext) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(650, now + 0.08);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * Paper slide/rustle sound effect (Envelope open/close)
 */
export function playRustle(ctx: AudioContext) {
  const now = ctx.currentTime;
  const duration = 0.35;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Fill with random noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1100, now);
  filter.Q.setValueAtTime(1.8, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
  gain.gain.linearRampToValueAtTime(0.03, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

/**
 * Shaking gift box sound effect
 */
export function playRattle(ctx: AudioContext) {
  const now = ctx.currentTime;

  // 4 rapid soft clicks / rattles
  for (let i = 0; i < 4; i++) {
    const clickTime = now + i * 0.13;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(90 + Math.random() * 50, clickTime);

    gain.gain.setValueAtTime(0.1, clickTime);
    gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(clickTime);
    osc.stop(clickTime + 0.07);
  }
}

/**
 * Opening gift box sound effect (Magical chime arpeggio + noise pop)
 */
export function playUnbox(ctx: AudioContext) {
  const now = ctx.currentTime;

  // Pentatonic chime
  const notes = [
    NOTES.C5,
    NOTES.E5,
    NOTES.G5,
    NOTES.C5 * 2,
    NOTES.E5 * 2,
    NOTES.G5 * 2,
    NOTES.C5 * 4,
  ];

  notes.forEach((freq, idx) => {
    const toneTime = now + idx * 0.05;
    playChimeTone(ctx, freq, 0.6, toneTime, 0.05);
  });

  // End with a magical splash
  const splashTime = now + notes.length * 0.05;
  const duration = 0.25;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(4500, splashTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, splashTime);
  gain.gain.linearRampToValueAtTime(0.03, splashTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, splashTime + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(splashTime);
  noise.stop(splashTime + duration);
}

/**
 * Standard click feedback sound
 */
export function playClick(ctx: AudioContext) {
  // Muted at synth level by user request
}

/**
 * Synthesizes a candle-blowing breath sound effect (whoosh)
 */
export function playBlow(ctx: AudioContext) {
  const now = ctx.currentTime;
  const duration = 0.6;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Fill buffer with white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Use a low-pass filter to make it sound like wind/breath
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(700, now);
  filter.frequency.exponentialRampToValueAtTime(100, now + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}
