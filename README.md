# GitoPrompt 🚀

> **Transform GitHub repositories into AI-powered prompts instantly!**

[![Live Demo](https://img.shields.io/badge/Try%20it%20Live-%E2%86%92-E5342A?style=for-the-badge&logo=vercel&logoColor=white)](https://gitoprompt.vercel.app/)

**🌐 [https://gitoprompt.vercel.app/](https://gitoprompt.vercel.app/)**

GitoPrompt is an intelligent tool that fetches your GitHub repositories and generates optimized prompts using NVIDIA AI. Perfect for developers, technical writers, and AI enthusiasts who want to leverage their code repositories with AI models.

## Features ✨

- 🔍 **GitHub Repository Fetching** - Seamlessly connect to any public GitHub repo
- 🤖 **AI-Powered Prompts** - Generate context-aware prompts using NVIDIA's advanced AI models
- 💾 **Smart Caching** - Database-backed caching for faster subsequent queries (auto-refreshes when repo is updated)
- 📊 **File Tree Analysis** - Visual representation of your repository structure
- 🎨 **Modern UI** - Clean, responsive interface built with React & Tailwind CSS
- ⚡ **Real-Time Processing** - Watch the generation happen with live progress indicators
- 📱 **Mobile Friendly** - Fully responsive design for all devices

## Tech Stack 🛠️

- **Frontend**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **AI**: NVIDIA API
- **Build**: Vite + ESLint

## Getting Started 🎯

### Prerequisites
- Node.js 20+
- npm or yarn
- NVIDIA API key (get one at [build.nvidia.com](https://build.nvidia.com))
- Supabase project (optional, for caching)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/harsh-gupta-10/gitoprompt.git
cd gitoprompt
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```env
VITE_NVIDA_API_KEY=your_nvidia_api_key_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start the development server**
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Usage 💡

1. **Enter** a GitHub repository URL or `username/repo` format
2. **Click** "Get Prompt"
3. **Watch** as the tool fetches your repo and generates an optimized prompt
4. **Copy** the generated prompt for use with any AI model

## Project Structure 📁

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Top navigation
│   ├── ResultCard.tsx  # Generated prompt display
│   ├── FileTreeCard.tsx# Repo file tree display
│   ├── FAQ.tsx         # Frequently asked questions
│   ├── HowItWorks.tsx  # Tutorial section
│   └── ...
├── services/           # API services
│   └── api.ts         # GitHub & NVIDIA API calls
├── lib/                # External libraries
│   └── supabase.ts    # Database client
├── utils/              # Utility functions
│   └── repoParser.ts  # GitHub URL parsing
└── types/              # TypeScript definitions
```

## Development 🔧

```bash
npm run dev       # Development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint code
```

## API Integration 🔌

### GitHub API
- Fetches repository data without authentication
- Supports all public repositories
- Rate limited to 60 req/hour (unauthenticated) — add `VITE_GITHUB_TOKEN` to increase

### NVIDIA API
- Uses cutting-edge language models
- Requires valid API key from [build.nvidia.com](https://build.nvidia.com)

### Supabase
- PostgreSQL database for prompt caching
- Auto-invalidates cache when repo is updated (via `pushed_at` comparison)
- Row-level security for data protection

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support 💬

- 📧 Report issues on [GitHub Issues](https://github.com/harsh-gupta-10/gitoprompt/issues)
- 💡 Suggest features via [GitHub Discussions](https://github.com/harsh-gupta-10/gitoprompt/discussions)

## Roadmap 🗺️

- [ ] GitHub authentication for higher rate limits
- [ ] Support for private repositories
- [ ] Batch processing for multiple repositories
- [ ] Custom AI model selection
- [ ] Prompt templates and customization
- [ ] Export to various formats (PDF, Markdown)
- [ ] Browser extension for one-click generation

---

**Made with ❤️ by [Harsh Gupta](https://github.com/harsh-gupta-10)** · [Try it live →](https://gitoprompt.vercel.app/)
