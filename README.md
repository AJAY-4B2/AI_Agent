# AI Search Agent 🤖

An intelligent AI agent that searches Google and provides AI-generated answers to your questions using OpenAI's GPT models.

## Features

✨ **Features:**
- 🔍 Real-time Google search integration
- 🤖 AI-powered answer generation using OpenAI GPT
- 💬 Interactive CLI interface
- 📚 Source attribution with URLs
- 🔄 Conversation history tracking
- ⚙️ Configurable AI models and parameters

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenAI API Key** (get one at https://platform.openai.com/api-keys)

## Installation

1. **Navigate to the project directory:**
```bash
cd ai-search-agent
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file:**
```bash
cp .env.example .env
```

4. **Add your OpenAI API key to `.env`:**
```
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_MODEL=gpt-3.5-turbo
DEBUG=false
```

## Usage

### Development Mode (TypeScript with ts-node)

```bash
npm run dev
```

### Production Mode (Compiled JavaScript)

```bash
# Build the project
npm run build

# Run the compiled code
npm start
```

### Watch Mode (Auto-recompile on changes)

```bash
npm run watch
```

## How It Works

1. **User Input**: You ask a question via the interactive CLI
2. **Google Search**: The agent searches Google for relevant information
3. **Parse Results**: Search results are parsed and formatted
4. **AI Processing**: Results are sent to OpenAI's GPT model along with your question
5. **Generate Answer**: The AI generates a comprehensive answer based on search results
6. **Display Results**: The answer, sources, and search results are displayed

## Project Structure

```
ai-search-agent/
├── src/
│   ├── index.ts          # Main entry point (CLI)
│   ├── agent.ts          # AI agent logic
│   └── search.ts         # Google search functionality
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | Required | Your OpenAI API key |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | AI model to use (gpt-4, gpt-4-turbo, gpt-3.5-turbo) |
| `DEBUG` | `false` | Enable verbose logging |

## Example Questions

Try asking the agent:

- "What is the capital of France?"
- "How does photosynthesis work?"
- "Latest news about artificial intelligence"
- "Who won the World Cup in 2022?"
- "What are the benefits of machine learning?"

## API Costs

⚠️ **Note:** Using this agent will incur costs based on:
- **OpenAI API calls**: ~0.0005-0.002 USD per question (depending on model and response length)
- **Search operations**: Free (uses web scraping)

Monitor your usage at https://platform.openai.com/account/usage/overview

## Troubleshooting

### "OPENAI_API_KEY is not set"
- Make sure you've created the `.env` file and added your API key
- Check that the `.env` file is in the project root directory

### "No module named 'openai'"
```bash
npm install
```

### Slow responses
- Try using `gpt-3.5-turbo` instead of `gpt-4` for faster responses
- Enable DEBUG mode to see timing information:
```
DEBUG=true
```

### Google search not working
- Check your internet connection
- Try reducing the number of search results
- Google may occasionally block requests; wait a moment and try again

## Security Notes

🔒 **Important:**
- Never commit your `.env` file to version control
- Don't share your OpenAI API key
- Keep your API key in the `.env` file only
- Consider using API key rotation for production use

## Advanced Usage

### Using it Programmatically

```typescript
import { SearchAgent } from './src/agent';

const agent = new SearchAgent();

async function askQuestion() {
  const result = await agent.processQuestion('What is AI?');
  console.log(result.answer);
  console.log(result.sources);
}

askQuestion();
```

### Customizing Search Results

Edit `src/search.ts` to modify:
- Number of search results returned
- Search parsing logic
- Result formatting

### Customizing AI Behavior

Edit `src/agent.ts` to modify:
- System prompt
- Temperature (creativity level)
- Token limits
- Conversation history handling

## Dependencies

- **openai**: Official OpenAI API client
- **axios**: HTTP client for web requests
- **cheerio**: HTML parsing library
- **dotenv**: Environment variable management
- **typescript**: TypeScript compiler
- **ts-node**: TypeScript execution for Node.js

## License

MIT License - Feel free to use this project for personal or commercial purposes

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the source code comments
3. Check OpenAI API documentation: https://platform.openai.com/docs
4. Verify your internet connection and API key

## Future Enhancements

Potential improvements:
- 🌐 Support for multiple search engines (Bing, DuckDuckGo)
- 💾 Persistent chat history storage
- 📊 Result caching and optimization
- 🔒 Authentication and user management
- 🌍 Multi-language support
- 📱 Web UI interface
- 🚀 Deployment to cloud platforms
- ⚡ Rate limiting and request queuing
- 🧠 Custom knowledge base integration

---

**Built with ❤️ using OpenAI and Node.js**
