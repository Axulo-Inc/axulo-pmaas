# Axulo PMaaS (Project Manager-as-a-Service)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)](https://www.docker.com/)

## 🎯 Overview

**Axulo PMaaS** provides organizations with professional project management expertise on-demand, without the cost of hiring full-time project managers.

### Key Features
- 📋 **Discovery Wizard** - 4-step project intake process
- 🤖 **AI-Ready** - OpenAI integration for charter generation
- 📊 **Risk Management** - Identify and mitigate project risks
- 🐳 **Docker Ready** - One-command deployment

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Axulo-Inc/axulo-pmaas.git
cd axulo-pmaas

# Start all services
docker-compose up --build

# Access the platform
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/docs
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/test` | Test endpoint |
| POST | `/api/generate-charter` | Generate project charter |

## 🛣️ Roadmap

- [ ] OpenAI integration for AI-powered charters
- [ ] Risk register generator
- [ ] PDF/DOCX export
- [ ] User authentication
- [ ] Project dashboard
- [ ] Portfolio management

## 📄 License

MIT © Axulo Technologies

## 🌐 Links

- [GitHub Repository](https://github.com/Axulo-Inc/axulo-pmaas)
- [Issues](https://github.com/Axulo-Inc/axulo-pmaas/issues)
