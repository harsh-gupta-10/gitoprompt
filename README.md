# GitoPrompt 🚀

> **Transform GitHub repositories into AI-powered prompts instantly!**

GitoPrompt is an intelligent tool that fetches your GitHub repositories and generates optimized prompts using NVIDIA AI. Perfect for developers, technical writers, and AI enthusiasts who want to leverage their code repositories with AI models.

## Features ✨

- 🔍 **GitHub Repository Fetching** - Seamlessly connect to any public GitHub repo
- 🤖 **AI-Powered Prompts** - Generate context-aware prompts using NVIDIA's advanced AI models
- 💾 **Smart Caching** - Database-backed caching for faster subsequent queries
- 📊 **File Tree Analysis** - Visual representation of your repository structure
- 🎨 **Modern UI** - Clean, responsive interface built with React & Tailwind CSS
- ⚡ **Real-Time Processing** - Watch the generation happen with live progress indicators
- 📱 **Mobile Friendly** - Fully responsive design for all devices

## Tech Stack 🛠️

- **Frontend**: React 18 + TypeScript + Vite8
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: NVIDIA API (Mixtral/other models)
- **HTTP**: Axios for API calls
- **Build**: Vite + ESLint

## Getting Started 🎯

### Prerequisites
- Node.js 16+ 
- npm or yarn
- NVIDIA API key (get one at [nvidia.com](https://nvidia.com))
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

1. **Enter** a GitHub repository URL or username/repo format
2. **Enter** your NVIDIA API key (or use pre-configured one)
3. **Click** "Generate Prompt"
4. **Watch** as the tool fetches your repo and generates an optimized prompt
5. **Copy** the generated prompt for use with AI models

## Project Structure 📁

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Top navigation
│   ├── ResultCard.tsx  # Generated prompt display
│   ├── FAQ.tsx         # Frequently asked questions
│   ├── HowItWorks.tsx  # Tutorial section
│   └── ...
├── pages/              # Page components
│   ├── AboutPage.tsx
│   ├── PrivacyPolicyPage.tsx
│   └── TermsPage.tsx
├── services/           # API services
│   └── api.ts         # GitHub & NVIDIA API calls
├── lib/                # External libraries
│   └── supabase.ts    # Database client
├── utils/              # Utility functions
│   └── repoParser.ts  # GitHub URL parsing
└── types/              # TypeScript definitions
```

## Development 🔧

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Features in Detail 🎓

### Repository Analysis
- Fetches complete repository structure from GitHub
- Analyzes file types, dependencies, and project layout
- Creates visual file tree representation

### AI Prompt Generation
- Integrates with NVIDIA's Mixtral and other models
- Generates contextual, comprehensive prompts
- Optimized for various use cases

### Smart Caching
- Stores generated prompts in Supabase
- Reduces API calls for repeat requests
- Improves response time

## API Integration 🔌

### GitHub API
- Fetches repository data without authentication
- Supports both public repositories
- Rate limited to 60 requests/hour (unauthenticated)

### NVIDIA API
- Uses cutting-edge language models
- Requires valid API key
- Supports streaming and batch responses

### Supabase
- PostgreSQL database for caching
- Real-time capabilities (if needed)
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
- 🌐 Visit our [About Page](/about) for more information

## Roadmap 🗺️

- [ ] GitHub authentication for higher rate limits
- [ ] Support for private repositories
- [ ] Batch processing for multiple repositories
- [ ] Custom AI model selection
- [ ] Prompt templates and customization
- [ ] Export to various formats (PDF, Markdown)
- [ ] Browser extension for one-click generation

## Changelog 📝

### v1.0.0 (Initial Release)
- Repository fetching from GitHub
- AI prompt generation with NVIDIA API
- Supabase caching integration
- Responsive UI with modern design
- FAQ and documentation pages

---

**Made with ❤️ by [Harsh Gupta](https://github.com/harsh-gupta-10)**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
