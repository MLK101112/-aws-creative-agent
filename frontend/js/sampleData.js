/**
 * NovaChronicles - Lore Database, Initial Chronicles & Telemetry Archives
 */

// Procedural SVG Generator for Concept Art Renders
function generateGenerativeArtSVG(title, themeColor = "#00f2fe", secondaryColor = "#7f00ff") {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23060814" />
        <stop offset="50%" stop-color="%230d122b" />
        <stop offset="100%" stop-color="%2304060c" />
      </linearGradient>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${encodeURIComponent(themeColor)}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${encodeURIComponent(secondaryColor)}" stop-opacity="0.2" />
      </linearGradient>
      <radialGradient id="sunkenCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${encodeURIComponent(themeColor)}" stop-opacity="0.9" />
        <stop offset="60%" stop-color="${encodeURIComponent(secondaryColor)}" stop-opacity="0.3" />
        <stop offset="100%" stop-color="%23000000" stop-opacity="0" />
      </radialGradient>
      <filter id="neonGlow">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="450" fill="url(%23bgGrad)" />
    
    <!-- Starfield Grid -->
    <g opacity="0.35">
      <circle cx="120" cy="80" r="1.5" fill="%23fff" />
      <circle cx="280" cy="40" r="1" fill="%23fff" />
      <circle cx="450" cy="110" r="2" fill="${encodeURIComponent(themeColor)}" />
      <circle cx="680" cy="60" r="1.5" fill="%23fff" />
      <circle cx="720" cy="180" r="1" fill="%23fff" />
      <circle cx="190" cy="220" r="1.5" fill="%23fff" />
      <circle cx="580" cy="280" r="1.5" fill="${encodeURIComponent(secondaryColor)}" />
      <circle cx="340" cy="320" r="1" fill="%23fff" />
      <circle cx="80" cy="380" r="2" fill="%23fff" />
    </g>
    
    <!-- Celestial Ring Nebula -->
    <circle cx="400" cy="210" r="140" fill="url(%23sunkenCore)" />
    <ellipse cx="400" cy="210" rx="260" ry="45" fill="none" stroke="url(%23glowGrad)" stroke-width="3" transform="rotate(-15 400 210)" filter="url(%23neonGlow)" />
    <ellipse cx="400" cy="210" rx="310" ry="25" fill="none" stroke="${encodeURIComponent(themeColor)}" stroke-opacity="0.4" stroke-width="1.5" transform="rotate(-15 400 210)" />

    <!-- Obsidian Spires / Monoliths -->
    <polygon points="380,100 395,280 370,280" fill="%23080b18" stroke="${encodeURIComponent(themeColor)}" stroke-width="1.5" filter="url(%23neonGlow)" />
    <polygon points="430,70 445,300 415,300" fill="%230b0e20" stroke="${encodeURIComponent(secondaryColor)}" stroke-width="2" filter="url(%23neonGlow)" />
    <polygon points="320,160 332,290 310,290" fill="%23070914" stroke="${encodeURIComponent(themeColor)}" stroke-width="1" />
    <polygon points="490,140 505,310 480,310" fill="%23080c1d" stroke="${encodeURIComponent(themeColor)}" stroke-width="1" />

    <!-- Horizon & Resonance Waves -->
    <path d="M 0,340 Q 200,320 400,340 T 800,330 L 800,450 L 0,450 Z" fill="%2304060d" />
    <path d="M 0,340 Q 200,320 400,340 T 800,330" fill="none" stroke="${encodeURIComponent(themeColor)}" stroke-width="2" opacity="0.8" filter="url(%23neonGlow)" />
    <path d="M 0,360 Q 300,345 550,365 T 800,355" fill="none" stroke="${encodeURIComponent(secondaryColor)}" stroke-width="1.5" opacity="0.5" />

    <!-- Geometric Planetary HUD Rings -->
    <circle cx="700" cy="80" r="45" fill="none" stroke="${encodeURIComponent(themeColor)}" stroke-width="1" stroke-dasharray="4 6" opacity="0.6" />
    <circle cx="700" cy="80" r="30" fill="none" stroke="%23fff" stroke-width="0.5" opacity="0.4" />
    <text x="700" y="84" font-family="monospace" font-size="9" fill="${encodeURIComponent(themeColor)}" text-anchor="middle">EPOCH IV</text>

    <!-- Overlay Watermark -->
    <text x="30" y="420" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23ffffff" opacity="0.85">${encodeURIComponent(title)}</text>
    <text x="30" y="435" font-family="monospace" font-size="10" fill="${encodeURIComponent(themeColor)}" opacity="0.9">AMAZON BEDROCK NOVA CANVAS // AUTONOMOUS RENDER</text>
  </svg>`;
}

export const initialChronicles = [
  {
    id: "NOV-CHRON-0043",
    day: 43,
    title: "Harmonics of the Crystalline Spire",
    subtitle: "Episode 43: Solar Storm & Inverted Obsidian Polarity",
    stardate: "Stardate 49620.4",
    location: "Aethelgard High Orbit & The Sunken Obsidian Spires — Sector 25-Bravo",
    realm: "Aethelgard System",
    epoch: "Epoch IV: The Resonance Age",
    artUrl: generateGenerativeArtSVG("Harmonics of the Crystalline Spire", "#00f2fe", "#7f00ff"),
    narrative: [
      "As the celestial alignment locked onto the Vela Pulsar Resonance Zone at 00:00 UTC, the automated sensory array registered a staggering 420% resonance spike across the upper atmosphere. Solar storms induced intense geomagnetic flux across the orbital observation stations, bathing the rings of Aethelgard in shimmering violet auroras.",
      "Commander Lyra Vance stood at the observation dome, watching the twin rings of the gas giant cast iridescent bioluminescent shadows across the reinforced plasteel. Beneath the methane oceans below, the ancient obsidian spires—silent for three millennia—ignited with sub-ether harmonics.",
      "Arch-Synthesizer Kael-9 began translating the oscillating carrier wave in real time. 'It is not random cosmic radiation,' Kael reported, its optical sensors pulsing in rhythm with the celestial tide. 'Every obelisk across the meridian has inverted its magnetic polarity simultaneously. They are projecting a directional hyperlane beacon straight toward the Cygnus Rift.'"
    ],
    dialogue: {
      speaker: "Arch-Synthesizer Kael-9",
      quote: "We thought we were alone in the darkness of the sector. The resonance proves the darkness was merely listening."
    },
    visualPrompt: "Cinematic ultra-detailed concept art of glowing bioluminescent obsidian spires pulsing with cyan energy beneath a stormy atmospheric sky, a stellar cartographer observing a vast planetary nebula through a holographic starship observatory window, volumetric lighting, 8k resolution.",
    soundscape: {
      mood: "Deep atmospheric sub-bass (55Hz), shimmering crystalline arpeggios (528Hz Solfeggio frequency), and distant celestial choir pad.",
      frequencies: [55, 110, 220, 432, 528]
    },
    telemetry: {
      timestamp: "2026-08-23T00:00:00Z",
      trigger: "Amazon EventBridge (Nightly Autonomous Pulse)",
      solarCycle: "Solar Cycle 25 - Phase 235/365",
      lunarPhase: "Full Celestial Moon (98% illumination)",
      sector: "Vela Pulsar Resonance Zone",
      entropyIndex: 0.74,
      anomaly: "Solar storm induced geomagnetic flux across orbital stations"
    }
  },
  {
    id: "NOV-CHRON-0042",
    day: 42,
    title: "Echoes in the Obsidian Depths",
    subtitle: "Episode 42: The Sub-Surface Harmonic Discovery",
    stardate: "Stardate 49608.2",
    location: "Methane Trench Seven, Aethelgard Sub-Sea Array",
    realm: "Aethelgard System",
    epoch: "Epoch IV: The Resonance Age",
    artUrl: generateGenerativeArtSVG("Echoes in the Obsidian Depths", "#7f00ff", "#ff007f"),
    narrative: [
      "Deep within the liquid methane abyssal trenches of Aethelgard, autonomous deep-dive probes crossed the threshold of the Obsidian Ridge. The pressure was intense enough to crush conventional hulls, yet the acoustic sensors detected an impossible sound: rhythmic choral vibrations.",
      "The monoliths were carved from seamless dark matter alloy, their surfaces inscribed with intricate mathematical geometric fractals that shifted when illuminated by quantum sonar.",
      "Commander Lyra Vance logged the initial harmonic frequencies into the central archive. 'Whatever created these structures was not waiting for visitors—they were anchoring the physical fabric of space itself.'"
    ],
    dialogue: {
      speaker: "Commander Lyra Vance",
      quote: "The deeper we descend into the alien ocean, the more it feels like we are stepping into an ancient consciousness."
    },
    visualPrompt: "Underwater speculative sci-fi concept art of towering dark obsidian obelisks in deep glowing violet liquid, high-tech submarine probes shining volumetric searchlights onto glowing glyphs.",
    soundscape: {
      mood: "Abyssal low drone (40Hz), reverberant water echoes, and 432Hz deep resonant hum.",
      frequencies: [40, 80, 160, 432]
    },
    telemetry: {
      timestamp: "2026-08-22T00:00:00Z",
      trigger: "Amazon EventBridge Scheduled Cron",
      solarCycle: "Solar Cycle 25 - Phase 234/365",
      lunarPhase: "Waxing Gibbous (88% illumination)",
      sector: "Aethelgard Oceanic Meridian",
      entropyIndex: 0.81,
      anomaly: "Acoustic resonance detected in zero-oxygen trench"
    }
  },
  {
    id: "NOV-CHRON-0041",
    day: 41,
    title: "The Stellar Cartographer's Awakening",
    subtitle: "Episode 41: First Light upon the Cygnus Relay",
    stardate: "Stardate 49596.0",
    location: "Cygnus Gateway Station, High Orbit",
    realm: "Cygnus Sector",
    epoch: "Epoch IV: The Resonance Age",
    artUrl: generateGenerativeArtSVG("The Stellar Cartographer's Awakening", "#00f5a0", "#00f2fe"),
    narrative: [
      "The automated gateway at Cygnus Sector rebooted after four centuries of cold slumber. As the primary fusion generators sparked, a dormant artificial intelligence beacon established a quantum handshake with our orbital array.",
      "The first decrypted data packet contained hundreds of star charts detailing previously uncharted wormhole nexus points connecting the Core Worlds to the Rim.",
      "Commander Lyra Vance and Kael-9 immediately initiated orbital rendezvous procedures to stabilize the fluctuating warp gate."
    ],
    dialogue: {
      speaker: "Arch-Synthesizer Kael-9",
      quote: "The map does not merely show where we are; it shows what the stars remember of our ancestors."
    },
    visualPrompt: "Massive orbital ring station activating in deep space, brilliant emerald and cyan plasma flares, starships aligning with a glowing hyperspace conduit.",
    soundscape: {
      mood: "Spiritual ambient synth, warm low pads (110Hz), and crisp shimmering highs.",
      frequencies: [110, 220, 440, 660]
    },
    telemetry: {
      timestamp: "2026-08-21T00:00:00Z",
      trigger: "Amazon EventBridge Autonomous Scheduler",
      solarCycle: "Solar Cycle 25 - Phase 233/365",
      lunarPhase: "First Quarter (50% illumination)",
      sector: "Cygnus Relay Sector 1",
      entropyIndex: 0.69,
      anomaly: "Fusion reactor harmonic restart detected"
    }
  }
];

export const simulationSeeds = {
  sectors: [
    "Vela Pulsar Resonance Zone",
    "Cygnus Rift [Sector 7-Alpha]",
    "Orion Nebula Drift [Epoch IV]",
    "Andromeda Meridian Bridge",
    "Kepler-452 Exoplanet Array",
    "Tauri Star Cluster Deep Reach"
  ],
  lunarPhases: [
    "Void New Moon (2% illumination)",
    "Waxing Crescent (42% illumination)",
    "Full Celestial Moon (98% illumination)",
    "Waning Gibbous (74% illumination)",
    "Aurora Borealis Peak (K-Index 7.2)"
  ],
  anomalies: [
    "Solar storm induced geomagnetic flux across orbital stations",
    "Gravitational Echo detected across hyperspace relay",
    "Bioluminescent spore migration recorded in crystal biosphere",
    "Ancient quantum beacon initiated harmonic transmission",
    "Tachyon variance discovered near shattered chronometer ruins",
    "Sub-space dimensional warp tear opening near gas giant moon"
  ]
};

export const awsSamTemplateRaw = `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: NovaChronicles - Autonomous Generative Multiverse Agent

Globals:
  Function:
    Timeout: 300
    MemorySize: 512
    Runtime: python3.12
    Architectures: [arm64]

Resources:
  # 1. DynamoDB State Table for Persistent Multiverse Memory
  MultiverseStateTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: NovaChronicles-State
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: PK
          AttributeType: S
        - AttributeName: SK
          AttributeType: S
      KeySchema:
        - AttributeName: PK
          KeyType: HASH
        - AttributeName: SK
          KeyType: RANGE

  # 2. Amazon EventBridge Nightly Scheduler Rule
  NightlyAutonomousSchedule:
    Type: AWS::Events::Rule
    Properties:
      Name: NovaChroniclesNightlyEvolve
      Description: "Autonomous cron trigger to evolve the multiverse while the world sleeps."
      ScheduleExpression: "cron(0 0 * * ? *)"
      State: ENABLED
      Targets:
        - Arn: !GetAtt AgentOrchestratorFunction.Arn
          Id: "NovaChroniclesLambdaTarget"

  # 3. AWS Lambda Agent Orchestrator Function
  AgentOrchestratorFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: lambda/
      Handler: agent_orchestrator.lambda_handler
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref MultiverseStateTable
        - Statement:
            - Sid: BedrockInvokeModelPolicy
              Effect: Allow
              Action:
                - bedrock:InvokeModel
                - bedrock:InvokeModelWithResponseStream
              Resource:
                - "arn:aws:bedrock:*:*:foundation-model/amazon.nova-pro-v1:0"
                - "arn:aws:bedrock:*:*:foundation-model/amazon.nova-canvas-v1:0"`;
