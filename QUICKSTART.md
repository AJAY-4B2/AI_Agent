# Quick Start Guide 🚀

Get your AI Search Agent running in 3 minutes!

## Step 1: Get an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in with your OpenAI account (create one if needed)
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)

## Step 2: Set Up Environment

1. Open terminal/command prompt in the `ai-search-agent` folder
2. Create `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   (On Windows, you can also copy the file manually)

3. Open `.env` in a text editor and paste your API key:
   ```
   OPENAI_API_KEY=sk-your-key-here
   OPENAI_MODEL=gpt-3.5-turbo
   DEBUG=false
   ```

## Step 3: Run the Agent

### Option A: Development Mode (Recommended for testing)
```bash
npm run dev
```

### Option B: Build and Run
```bash
npm run build
npm start
```

## Step 4: Ask Questions!

Once running, you'll see:
```
╔════════════════════════════════════════════════════════════╗
║          🤖 AI SEARCH AGENT - Interactive Mode             ║
║    Ask me any question and I'll search for answers!         ║
║              Type "exit" to quit                            ║
╚════════════════════════════════════════════════════════════╝

📝 Your question: 
```

Just type your question and press Enter!

## Example Questions

```
📝 Your question: What is artificial intelligence?
📝 Your question: How does photosynthesis work?
📝 Your question: Tell me about the latest AI breakthroughs
📝 Your question: Who won the World Cup in 2022?
```

## Output Format

For each question, you'll get:

1. **Search Results** - Top 5 relevant web results
2. **AI Answer** - Intelligent summary based on search results
3. **Sources** - URLs where the information came from

Example:
```
🔗 Search Results Found: 5

1. Artificial Intelligence - Wikipedia
   📍 https://en.wikipedia.org/wiki/Artificial_intelligence
   ℹ️  Artificial intelligence (AI) is technology based on machine learning and deep learning...

[More results...]

🤖 AI ANSWER:
Artificial intelligence refers to computer systems designed to perform tasks that typically require human intelligence. These tasks include learning from experience, recognizing patterns, understanding language, and making decisions...

📚 Sources:
   • https://en.wikipedia.org/wiki/Artificial_intelligence
   • [More sources...]
```

## Troubleshooting

### API Key Error
```
❌ ERROR: OPENAI_API_KEY is not set.
```
**Solution:** Make sure `.env` file exists and has your API key

### Module Not Found
```
Cannot find module 'openai'
```
**Solution:** Run `npm install`

### Slow Responses
Try changing the model in `.env`:
```
OPENAI_MODEL=gpt-3.5-turbo
```

### Rate Limiting
If you get too many requests, wait a moment before asking another question.

## Cost Estimation

- **Free tier**: ~$5 credit (good for testing)
- **gpt-3.5-turbo**: ~$0.0005 per question
- **gpt-4**: ~$0.003 per question

You can check your usage at: https://platform.openai.com/account/usage/overview

## Next Steps

1. ✅ Get API key
2. ✅ Set up .env
3. ✅ Run `npm run dev`
4. ✅ Ask questions!
5. 📖 Read README.md for advanced features
6. 💻 Check examples.ts for code examples
7. 🛠️ Customize src/ files for your needs

## Tips & Tricks

**Enable Debug Mode** - See what's happening behind the scenes:
```
DEBUG=true
```

**Faster Responses** - Use cheaper model:
```
OPENAI_MODEL=gpt-3.5-turbo
```

**Better Responses** - Use more powerful model:
```
OPENAI_MODEL=gpt-4
```

**Multiple Questions** - Keep asking! The agent remembers previous questions in a conversation.

## Need Help?

- 📖 Read the full README.md
- 💻 Check src/ files for code comments
- 🔍 See examples.ts for usage patterns
- 🌐 Visit https://platform.openai.com/docs for API docs

---

**You're all set! Happy questioning! 🎉**
