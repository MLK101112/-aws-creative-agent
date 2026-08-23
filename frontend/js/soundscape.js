/**
 * NovaChronicles - Ambient Soundscape Synthesizer
 * Built using Web Audio API: Layered oscillators, harmonic binaural drones,
 * resonant biquad filtering, and slow LFO stereo panning.
 */

class SoundscapeSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.nodes = [];
    this.lfo = null;
    this.volume = 0.25;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playFrequencies(frequencies = [55, 110, 220, 432, 528]) {
    this.initContext();
    this.stop(false);

    const now = this.ctx.currentTime;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(this.volume, now + 2.5); // 2.5s soft attack
    this.masterGain.connect(this.ctx.destination);

    // Dynamic Filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, now);
    filter.Q.setValueAtTime(3.5, now);
    filter.connect(this.masterGain);

    // LFO for filter sweep
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, now); // Very slow 12-second breath
    lfoGain.gain.setValueAtTime(250, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(now);
    this.nodes.push(lfo, lfoGain);

    // Create layered harmonic oscillators
    frequencies.forEach((freq, index) => {
      // Primary Oscillator
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      // Select waveform based on register
      osc.type = index === 0 ? "sine" : (index % 2 === 0 ? "triangle" : "sine");
      
      // Detune slightly for lush warmth
      const detuneAmount = (index % 2 === 0 ? 1 : -1) * (index * 3.5);
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime(detuneAmount, now);

      // Relative gain per voice
      const voiceGain = 0.4 / (index + 1);
      oscGain.gain.setValueAtTime(voiceGain, now);

      // Stereo Panner (if supported)
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        const panValue = ((index / (frequencies.length - 1)) * 1.6) - 0.8;
        panner.pan.setValueAtTime(panValue, now);
        osc.connect(oscGain);
        oscGain.connect(panner);
        panner.connect(filter);
        this.nodes.push(panner);
      } else {
        osc.connect(oscGain);
        oscGain.connect(filter);
      }

      osc.start(now);
      this.nodes.push(osc, oscGain);
    });

    this.nodes.push(filter, this.masterGain);
    this.isPlaying = true;
  }

  stop(smooth = true) {
    if (!this.ctx || !this.isPlaying) return;

    if (smooth && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      
      setTimeout(() => {
        this.cleanupNodes();
        this.isPlaying = false;
      }, 1300);
    } else {
      this.cleanupNodes();
      this.isPlaying = false;
    }
  }

  cleanupNodes() {
    this.nodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {
        // Safe fallback
      }
    });
    this.nodes = [];
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  toggle(frequencies) {
    if (this.isPlaying) {
      this.stop(true);
      return false;
    } else {
      this.playFrequencies(frequencies);
      return true;
    }
  }
}

export const soundscape = new SoundscapeSynthesizer();
