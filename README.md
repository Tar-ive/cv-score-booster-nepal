# Recruit Nepal CV Analyzer

A powerful, AI-driven CV/Resume analysis tool that provides instant ATS (Applicant Tracking System) compatibility scoring and detailed feedback to help job seekers optimize their resumes for the Nepalese job market.

**🔗 [Live Demo](https://recruitnepalcv.vercel.app/) | [GitHub Repository](https://github.com/Tar-ive/cv-score-booster-nepal)**

## 🌟 Features

- **Multi-format Support**: Upload and analyze PDF, DOCX, and TXT resume files
- **ATS Compatibility Scoring**: Get instant scores (0-100) for ATS-friendliness
- **AI-Powered Analysis**: Leverage OpenAI GPT and Anthropic Claude for intelligent feedback
- **Detailed Feedback**: Receive specific suggestions for improvement
- **Fallback Analysis**: Local rule-based analysis when AI services are unavailable
- **Modern UI**: Clean, responsive design with dark/light mode
- **Mobile Responsive**: Works seamlessly on all device sizes

## 🛠️ Tech Stack

- **React 18.3.1** with TypeScript 5.5.3
- **Vite 5.4.1** - Fast build tool and dev server
- **Tailwind CSS 3.4.11** + **shadcn/ui** components
- **Supabase** - Backend and database
- **OpenAI SDK** & **Anthropic SDK** - AI model integration
- **pdf-parse** & **mammoth** - Document parsing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API key (optional)
- Anthropic API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tar-ive/cv-score-booster-nepal.git
   cd cv-score-booster-nepal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   ```env
   VITE_OPENAI_API_KEY=your-openai-key
   VITE_ANTHROPIC_API_KEY=your-anthropic-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to http://localhost:8080

## 📁 Project Structure

```
src/
├── components/
│   ├── AIEditSection.tsx
│   ├── CVUploader.tsx
│   ├── Header.tsx
│   ├── RecommendationsPanel.tsx
│   ├── ResumeViewer.tsx
│   ├── ScoreDisplay.tsx
│   └── ui/                    # shadcn/ui components
├── hooks/
├── integrations/
│   └── supabase/
├── lib/
├── pages/
├── services/
│   ├── aiAnalysisService.ts
│   ├── pdfExtractor.ts
│   └── pdfTextExtractor.ts
└── types/
```

## 📖 Usage Guide

### Uploading a CV

1. Drag and drop or click to upload your CV file
2. Supported formats: PDF, DOCX, TXT (max 10MB)
3. Wait for AI analysis to complete

### Understanding Your Score

- **90-100**: Excellent ATS compatibility
- **80-89**: Good, minor improvements needed
- **70-79**: Fair, several areas for improvement
- **60-69**: Poor, significant changes required
- **Below 60**: Major restructuring needed

## 🏗️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### How AI Analysis Works

1. **Text Extraction**: Extracts text from PDF/DOCX/TXT files
2. **Analysis Priority**: OpenAI GPT → Anthropic Claude → Local fallback
3. **Scoring**: Returns ATS compatibility score (0-100) with detailed feedback

## 🚀 Deployment

The app is deployed on Vercel at [recruitnepalcv.vercel.app](https://recruitnepalcv.vercel.app/)

### Deploy Your Own

```bash
npm run build
```

Deploy to Vercel, Netlify, or any static hosting platform.

**Environment Variables for Production:**
- `VITE_OPENAI_API_KEY`
- `VITE_ANTHROPIC_API_KEY`

## 🔒 Security Considerations

⚠️ **Note**: This implementation stores API keys in the frontend for simplicity. For production use:

- Implement a backend API to handle AI requests
- Store API keys securely on the server
- Add authentication and rate limiting

## 🔧 Troubleshooting

### Common Issues

- **"No AI analysis" Error**: Check API keys in .env.local
- **PDF parsing issues**: Ensure PDF is not password-protected
- **API rate limits**: Wait or upgrade API plan

### Debug Mode

```env
VITE_DEBUG=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🗺️ Roadmap

- [ ] Batch CV processing
- [ ] CV template recommendations
- [ ] Industry-specific analysis
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

**Built with ❤️ for the Nepalese job market**
