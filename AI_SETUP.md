# AI Analysis Service Setup

This project now includes AI-powered CV analysis using OpenAI and Anthropic APIs for more accurate and detailed feedback.

## Features

- **Multi-Provider Support**: Uses OpenAI GPT and Anthropic Claude for CV analysis
- **Fallback System**: If AI services fail, falls back to local rule-based analysis
- **Enhanced PDF Parsing**: Uses pdf-parse for better PDF text extraction
- **Detailed Analysis**: Provides strengths, weaknesses, and specific suggestions

## Setup Instructions

### 1. Get API Keys

**OpenAI API Key:**
1. Go to [OpenAI API Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key

**Anthropic API Key:**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your API keys to `.env.local`:
   ```env
   VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
   VITE_ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
   ```

### 3. Install Dependencies

The required dependencies are already installed:
- `openai` - OpenAI SDK
- `@anthropic-ai/sdk` - Anthropic SDK
- `pdf-parse` - Enhanced PDF parsing
- `axios` - HTTP client

### 4. How It Works

1. **Text Extraction**: 
   - PDF files: Uses `pdf-parse` for accurate text extraction
   - DOCX files: Uses `mammoth` for Word document parsing
   - TXT files: Direct text reading

2. **Analysis Priority**:
   - First tries OpenAI GPT analysis
   - Falls back to Anthropic Claude if OpenAI fails
   - Falls back to local rule-based analysis if both AI services fail

3. **Response Format**:
   - ATS compatibility score (0-100)
   - Detailed feedback points
   - Strengths, weaknesses, and improvement suggestions

## Security Notes

⚠️ **Important**: API keys are exposed to the browser in this frontend implementation. For production use:

1. Implement a backend API to handle AI requests
2. Store API keys securely on the server
3. Use environment variables on the server side
4. Implement rate limiting and authentication

## Usage

The AI analysis service is automatically used when you upload a CV. The system will:

1. Extract text from your CV file
2. Analyze the content using available AI services
3. Provide detailed feedback and scoring
4. Fall back to local analysis if AI services are unavailable

## Troubleshooting

- **No AI analysis**: Check that your API keys are correctly set in `.env.local`
- **PDF parsing issues**: Ensure the PDF is not password-protected or corrupted
- **API rate limits**: Wait a few minutes if you hit rate limits
- **CORS issues**: Consider implementing a backend proxy for production

## Local Development

To run the project with AI analysis:

```bash
npm install
npm run dev
```

The application will automatically detect available AI services and use them for analysis.
