# 🌌 NovaChronicles: The Autonomous Generative Multiverse Studio

> **Weekend Challenge: Set your creative app free!** | **AWS Builder Center Submission**  
> Tag: `#agents` `#aws` `#bedrock` `#serverless` `#eventbridge` `#dynamodb`

NovaChronicles is an **always-on autonomous creative agent** running on AWS. Instead of waiting for manual human prompts, the agent awakens autonomously via **Amazon EventBridge**, ingests real-time astronomical and planetary telemetry, retrieves persistent lore continuity from **Amazon DynamoDB**, reasons and writes fresh sci-fi multiverse episodes using **Amazon Bedrock (Amazon Nova Pro & Nova Canvas)**, synthesizes procedural ambient audio with the **Web Audio API**, and publishes morning illustrated dispatches ready for builder discovery.

---

## 🌟 Key Features

1. **Autonomous Heartbeat (Amazon EventBridge & AWS Lambda)**:
   - Automated nightly cron pulse (`cron(0 0 * * ? *)`) awakens the Lambda orchestrator.
   - Operates completely serverless within the AWS Free Tier with zero idle compute costs.
2. **Persistent Multiverse Memory (Amazon DynamoDB)**:
   - Single-table schema (`PK=LORE#CONTINUITY`) stores evolving character dossiers, active epochs, and unresolved narrative cliffhangers across days.
3. **Multimodal Generative Intellect (Amazon Bedrock)**:
   - **Amazon Nova Pro**: Generates multi-paragraph episodic lore, dramatic character monologues, and philosophical logs.
   - **Amazon Nova Canvas / Titan Image Generator**: Directs 8K volumetric lighting visual prompts.
4. **Procedural Ambient Soundscape Engine (Web Audio API)**:
   - Built-in polyphonic synthesizer generating layered harmonic drones, Solfeggio 528Hz tuning, and resonant filter sweeps without third-party audio API fees.
5. **Interactive Web Studio & Simulator (`/frontend`)**:
   - Modern dark glassmorphism UI with particle starfields and responsive split-grid layouts.
   - **Simulation Studio**: Configure planetary seeds (celestial sectors, lunar illumination, anomalies) and watch the agent create a new chapter live.
   - **Agent Mind & Telemetry**: Step-by-step terminal execution traces, Bedrock prompts, and DynamoDB records.
   - **AWS Architecture Hub**: Interactive infrastructure map and SAM blueprint explorer.
   - **Challenge Article Post**: Ready-to-publish 800+ word markdown article for the AWS Builder Center challenge.

---

## 🏛️ System Architecture

```
+-----------------------------------------------------------+
|           Amazon EventBridge Scheduled Cron Rule          |
|  (Nightly Autonomous Pulse: cron(0 0 * * ? *) / Dawn)    |
+-----------------------------+-----------------------------+
                              |
                              v
+-----------------------------------------------------------+
|              AWS Lambda: Agent Orchestrator               |
|                   (Python 3.12 / ARM64)                   |
+------+----------------------+----------------------+------+
       |                      |                      |
       v                      v                      v
+-------------------+  +-------------------+  +-------------------+
| Amazon DynamoDB   |  |  Amazon Bedrock   |  |     Amazon S3     |
| (Lore Continuity  |  |  - Nova Pro (Text)|  | (Chronicles JSON,  |
|  & State Memory)  |  |  - Nova Canvas    |  |  Audio & Art Data)|
+-------------------+  +-------------------+  +-------------------+
                                                     |
                                                     v
                                           +-------------------+
                                           | Amazon CloudFront |
                                           |   & Web Studio    |
                                           +-------------------+
```

---

## 📁 Repository Structure

```
aws/
├── ARTICLE_SUBMISSION.md           # Ready-to-publish AWS Builder Center submission article
├── README.md                       # Main documentation & architecture guide
├── server.py                       # Zero-dependency local web preview server
├── backend/
│   ├── template.yaml               # AWS SAM Infrastructure as Code template
│   ├── samconfig.toml              # SAM CLI configuration
│   ├── requirements.txt            # Python dependencies (boto3, requests)
│   ├── deploy.bat                  # 1-Click Windows deployment script
│   ├── deploy.sh                   # 1-Click Linux/macOS deployment script
│   └── lambda/
│       └── agent_orchestrator.py   # Python AWS Lambda Bedrock orchestrator
└── frontend/
    ├── index.html                  # Main Web Studio single-page application
    ├── css/
    │   └── style.css               # Custom design system & glassmorphism styling
    └── js/
        ├── app.js                  # UI orchestrator, speech synthesis & tab router
        ├── agentEngine.js          # Client-side agent simulator & telemetry streamer
        ├── soundscape.js           # Web Audio API procedural synthesizer
        └── sampleData.js           # Lore database, SVG generator & SAM blueprints
```

---

## 🚀 Quick Start (Run Locally)

You can launch the full interactive Web Studio instantly on your machine using Python's built-in server:

```bash
# 1. Start the local development server
python server.py

# 2. Open in your browser:
http://localhost:3000
```

---

## ☁️ Deploying to AWS via AWS SAM CLI

To deploy the autonomous agent and serverless backend directly to your AWS account:

```bash
# Navigate to backend directory
cd backend

# Validate SAM template
sam validate --template template.yaml

# Build and deploy
sam build
sam deploy --guided
```

This provisions:
- `NovaChronicles-State` DynamoDB table
- `NovaChroniclesNightlyEvolve` EventBridge cron rule
- `AgentOrchestratorFunction` AWS Lambda function with Bedrock IAM policies
- S3 bucket for chronicle assets & CloudFront-ready distribution

---

## 📝 AWS Builder Center Submission Article

The complete 800+ word publication-ready post is available in [`ARTICLE_SUBMISSION.md`](ARTICLE_SUBMISSION.md). You can also view and 1-click copy it directly inside the Web Studio's **"Builder Center Post"** tab.
