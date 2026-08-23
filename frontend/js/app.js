/**
 * NovaChronicles - Master Web Application Orchestrator
 */

import { initialChronicles, simulationSeeds, awsSamTemplateRaw } from './sampleData.js';
import { soundscape } from './soundscape.js';
import { agentEngine } from './agentEngine.js';

class NovaApp {
  constructor() {
    this.currentChronicle = initialChronicles[0];
    this.isSpeaking = false;
    this.synth = window.speechSynthesis || null;
    this.selectedVoice = null;
    this.activeTab = 'chronicle';
    
    this.initElements();
    this.initCanvasStarfield();
    this.initEventListeners();
    this.initSpeechSynthesis();
    this.renderCurrentChronicle();
    this.renderArchiveGrid();
    this.populateSimulationForm();
    this.setupAgentListeners();
    this.startCountdownTimer();
  }

  initElements() {
    // Navigation
    this.navBtns = document.querySelectorAll('.nav-tab-btn');
    this.viewSections = document.querySelectorAll('.view-section');

    // Chronicle Viewer
    this.storyTitle = document.getElementById('story-title');
    this.storySubtitle = document.getElementById('story-subtitle');
    this.storyLocation = document.getElementById('story-location');
    this.storyStardate = document.getElementById('story-stardate');
    this.storyDay = document.getElementById('story-day');
    this.storyEpoch = document.getElementById('story-epoch');
    this.storyBody = document.getElementById('story-body');
    this.speakerName = document.getElementById('dialogue-speaker');
    this.quoteText = document.getElementById('dialogue-quote');
    this.visualImg = document.getElementById('visual-canvas-img');
    this.visualPromptText = document.getElementById('visual-prompt-text');

    // Sidebar Telemetry
    this.telSector = document.getElementById('tel-sector');
    this.telLunar = document.getElementById('tel-lunar');
    this.telSolar = document.getElementById('tel-solar');
    this.telEntropy = document.getElementById('tel-entropy');
    this.telAnomaly = document.getElementById('tel-anomaly');
    this.telTimestamp = document.getElementById('tel-timestamp');

    // Audio & Narration
    this.headerAudioBtn = document.getElementById('header-audio-btn');
    this.headerAudioWidget = document.getElementById('header-audio-widget');
    this.narrationPlayBtn = document.getElementById('narration-play-btn');
    this.narrationStatus = document.getElementById('narration-status');
    this.soundscapeMoodText = document.getElementById('soundscape-mood-text');

    // Terminal
    this.terminalBody = document.getElementById('terminal-body');
    this.btnRunSimulation = document.getElementById('btn-run-simulation');
    this.btnRandomizeSeeds = document.getElementById('btn-randomize-seeds');
    this.quickRunBtn = document.getElementById('quick-run-btn');

    // Form inputs
    this.simSectorSelect = document.getElementById('sim-sector');
    this.simLunarSelect = document.getElementById('sim-lunar');
    this.simAnomalySelect = document.getElementById('sim-anomaly');

    // Countdown Pill
    this.countdownText = document.getElementById('next-pulse-countdown');

    // Archive & Architecture
    this.archiveContainer = document.getElementById('archive-grid-container');
    this.samCodeContainer = document.getElementById('sam-template-code');
    this.btnCopySam = document.getElementById('btn-copy-sam');
    this.btnCopyArticle = document.getElementById('btn-copy-article');
  }

  initCanvasStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.01 + 0.003,
      pulseSpeed: Math.random() * 0.03 + 0.01
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach(star => {
        star.alpha += star.pulseSpeed;
        const currentAlpha = Math.abs(Math.sin(star.alpha));

        ctx.fillStyle = `rgba(180, 220, 255, ${currentAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed * 8;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  initSpeechSynthesis() {
    if (!this.synth) return;
    const setVoice = () => {
      const voices = this.synth.getVoices();
      this.selectedVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David'))) || voices[0];
    };
    setVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = setVoice;
    }
  }

  initEventListeners() {
    // Navigation Tabs
    this.navBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Header Ambient Audio Toggle
    this.headerAudioBtn?.addEventListener('click', () => {
      const isPlaying = soundscape.toggle(this.currentChronicle.soundscape.frequencies);
      if (isPlaying) {
        this.headerAudioWidget.classList.remove('paused');
        this.headerAudioBtn.innerHTML = '❚❚';
        this.showToast('🔊 Ambient Soundscape Active (Harmonic Solfeggio Synth)');
      } else {
        this.headerAudioWidget.classList.add('paused');
        this.headerAudioBtn.innerHTML = '▶';
        this.showToast('🔇 Ambient Soundscape Muted');
      }
    });

    // Voice Narration
    this.narrationPlayBtn?.addEventListener('click', () => {
      this.toggleNarration();
    });

    // Simulation Trigger
    this.btnRunSimulation?.addEventListener('click', () => {
      this.executeSimulation();
    });

    this.quickRunBtn?.addEventListener('click', () => {
      this.switchTab('simulation');
      this.executeSimulation();
    });

    // Randomize seeds
    this.btnRandomizeSeeds?.addEventListener('click', () => {
      this.randomizeSimulationInputs();
    });

    // Copy SAM template
    this.btnCopySam?.addEventListener('click', () => {
      navigator.clipboard.writeText(awsSamTemplateRaw).then(() => {
        this.showToast('📋 AWS SAM template copied to clipboard!');
      });
    });

    // Copy Article Markdown
    this.btnCopyArticle?.addEventListener('click', () => {
      const articleEl = document.getElementById('article-markdown-raw');
      if (articleEl) {
        navigator.clipboard.writeText(articleEl.innerText).then(() => {
          this.showToast('🚀 800+ Word AWS Builder Center Article Copied!');
        });
      }
    });

    // Architecture Node Interactions
    document.querySelectorAll('.arch-node').forEach(node => {
      node.addEventListener('click', () => {
        document.querySelectorAll('.arch-node').forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        const nodeType = node.getAttribute('data-node');
        this.inspectArchitectureNode(nodeType);
      });
    });
  }

  switchTab(tab) {
    this.activeTab = tab;
    this.navBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tab);
    });
    this.viewSections.forEach(section => {
      section.classList.toggle('active', section.id === `view-${tab}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupAgentListeners() {
    agentEngine.on('onLog', (logEntry) => {
      const line = document.createElement('div');
      line.className = 'term-line';
      line.innerHTML = `
        <span class="term-time">${logEntry.timestamp}</span>
        <span class="term-tag ${logEntry.tag}">[${logEntry.tag.toUpperCase()}]</span>
        <span class="term-msg">${logEntry.message}</span>
      `;
      this.terminalBody.appendChild(line);
      this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    });

    agentEngine.on('onChronicleCreated', (newChronicle) => {
      this.currentChronicle = newChronicle;
      this.renderCurrentChronicle();
      this.renderArchiveGrid();
      this.showToast(`✨ New Autonomous Chronicle Published: "${newChronicle.title}"!`);
      
      // Update ambient frequencies if sound is active
      if (soundscape.isPlaying) {
        soundscape.playFrequencies(newChronicle.soundscape.frequencies);
      }
    });

    agentEngine.on('onStateChanged', ({ isSimulating }) => {
      if (this.btnRunSimulation) {
        this.btnRunSimulation.disabled = isSimulating;
        this.btnRunSimulation.innerHTML = isSimulating
          ? `<span class="status-dot"></span> Synthesizing Multiverse...`
          : `⚡ Trigger Autonomous Nightly Cycle`;
      }
      if (this.quickRunBtn) {
        this.quickRunBtn.disabled = isSimulating;
      }
    });
  }

  renderCurrentChronicle() {
    const c = this.currentChronicle;
    if (!c) return;

    this.storyTitle.innerText = c.title;
    this.storySubtitle.innerText = c.subtitle;
    this.storyLocation.innerHTML = `📍 ${c.location}`;
    this.storyStardate.innerText = c.stardate;
    this.storyDay.innerText = `DAY ${c.day}`;
    this.storyEpoch.innerText = c.epoch;

    this.storyBody.innerHTML = c.narrative.map(p => `<p>${p}</p>`).join('');
    this.speakerName.innerText = c.dialogue.speaker;
    this.quoteText.innerText = `"${c.dialogue.quote}"`;

    this.visualImg.src = c.artUrl;
    this.visualPromptText.innerText = `[Bedrock Prompt]: ${c.visualPrompt}`;

    // Telemetry
    this.telSector.innerText = c.telemetry.sector;
    this.telLunar.innerText = c.telemetry.lunarPhase;
    this.telSolar.innerText = c.telemetry.solarCycle;
    this.telEntropy.innerText = c.telemetry.entropyIndex;
    this.telAnomaly.innerText = c.telemetry.anomaly;
    this.telTimestamp.innerText = new Date(c.telemetry.timestamp).toUTCString();

    if (this.soundscapeMoodText) {
      this.soundscapeMoodText.innerText = c.soundscape.mood;
    }
  }

  renderArchiveGrid() {
    if (!this.archiveContainer) return;
    this.archiveContainer.innerHTML = agentEngine.chronicles.map(c => `
      <div class="archive-card" data-id="${c.id}">
        <img class="archive-thumb" src="${c.artUrl}" alt="${c.title}" />
        <div class="archive-info">
          <div class="archive-day">DAY ${c.day} • ${c.stardate}</div>
          <div class="archive-title">${c.title}</div>
          <div class="archive-snippet">${c.narrative[0]}</div>
        </div>
      </div>
    `).join('');

    this.archiveContainer.querySelectorAll('.archive-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const found = agentEngine.chronicles.find(item => item.id === id);
        if (found) {
          this.currentChronicle = found;
          this.renderCurrentChronicle();
          this.switchTab('chronicle');
          this.showToast(`📖 Loaded Episode: ${found.title}`);
        }
      });
    });
  }

  populateSimulationForm() {
    if (!this.simSectorSelect) return;
    this.simSectorSelect.innerHTML = simulationSeeds.sectors.map(s => `<option value="${s}">${s}</option>`).join('');
    this.simLunarSelect.innerHTML = simulationSeeds.lunarPhases.map(l => `<option value="${l}">${l}</option>`).join('');
    this.simAnomalySelect.innerHTML = simulationSeeds.anomalies.map(a => `<option value="${a}">${a}</option>`).join('');
  }

  randomizeSimulationInputs() {
    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    this.simSectorSelect.value = randomPick(simulationSeeds.sectors);
    this.simLunarSelect.value = randomPick(simulationSeeds.lunarPhases);
    this.simAnomalySelect.value = randomPick(simulationSeeds.anomalies);
    this.showToast('🎲 Randomized Planetary & Celestial Seeds');
  }

  executeSimulation() {
    const seeds = {
      sector: this.simSectorSelect?.value,
      lunar: this.simLunarSelect?.value,
      anomaly: this.simAnomalySelect?.value
    };
    agentEngine.runAutonomousCycle(seeds);
  }

  toggleNarration() {
    if (!this.synth) {
      this.showToast('Speech synthesis not supported in this browser.');
      return;
    }

    if (this.isSpeaking) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.narrationPlayBtn.innerHTML = '▶ Play Log Narration';
      this.narrationStatus.innerText = 'Spoken audio narration ready';
    } else {
      const textToRead = `${this.currentChronicle.title}. ${this.currentChronicle.subtitle}. ${this.currentChronicle.narrative.join(' ')} Quote from ${this.currentChronicle.dialogue.speaker}: ${this.currentChronicle.dialogue.quote}`;
      
      const utter = new SpeechSynthesisUtterance(textToRead);
      if (this.selectedVoice) utter.voice = this.selectedVoice;
      utter.rate = 0.95;
      utter.pitch = 0.9;

      utter.onstart = () => {
        this.isSpeaking = true;
        this.narrationPlayBtn.innerHTML = '❚❚ Pause Narration';
        this.narrationStatus.innerText = 'Synthesizing voice transmission...';
      };

      utter.onend = () => {
        this.isSpeaking = false;
        this.narrationPlayBtn.innerHTML = '▶ Play Log Narration';
        this.narrationStatus.innerText = 'Narration completed';
      };

      utter.onerror = () => {
        this.isSpeaking = false;
        this.narrationPlayBtn.innerHTML = '▶ Play Log Narration';
      };

      this.synth.speak(utter);
    }
  }

  inspectArchitectureNode(type) {
    const infoMap = {
      eventbridge: {
        title: "Amazon EventBridge (Scheduled Cron)",
        desc: "Fires cron(0 0 * * ? *) to wake up the Lambda orchestrator nightly without human prompts."
      },
      lambda: {
        title: "AWS Lambda (Agent Orchestrator)",
        desc: "Python 3.12 (ARM64) serverless container coordinating telemetry ingestion, Bedrock prompt chains, and state persistence."
      },
      bedrock: {
        title: "Amazon Bedrock (Amazon Nova Pro & Nova Canvas)",
        desc: "State-of-the-art multimodal generative foundation models generating narrative chapters, dialogue, and 8K visual directives."
      },
      dynamodb: {
        title: "Amazon DynamoDB (Persistent Multiverse Memory)",
        desc: "Single-table schema (PK=LORE#CONTINUITY) retaining character arcs, active epochs, and unresolved plot tension."
      },
      s3: {
        title: "Amazon S3 & CloudFront (Asset Store & Web Studio)",
        desc: "High-durability storage hosting generated JSON chronicles, artwork vectors, and fast global CDN distribution."
      }
    };

    const nodeInfo = infoMap[type] || infoMap.eventbridge;
    const detailEl = document.getElementById('arch-inspector-detail');
    if (detailEl) {
      detailEl.innerHTML = `
        <h4 style="color: var(--accent-cyan); font-family: var(--font-heading); margin-bottom: 0.4rem;">${nodeInfo.title}</h4>
        <p style="color: #cbd5e1; font-size: 0.9rem;">${nodeInfo.desc}</p>
      `;
    }
  }

  startCountdownTimer() {
    let secondsLeft = 5 * 3600 + 22 * 60 + 18;
    setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) secondsLeft = 24 * 3600;
      const h = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
      const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
      const s = String(secondsLeft % 60).padStart(2, '0');
      if (this.countdownText) {
        this.countdownText.innerText = `${h}:${m}:${s}`;
      }
    }, 1000);
  }

  showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(30px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new NovaApp();
});
