# Advanced Configuration Guide 🔧

Customize your AI Search Agent for different use cases.

## Configurable Parameters

### 1. Search Results Quality

**Location:** `src/search.ts`

```typescript
// Increase/decrease number of search results
await searchGoogle(userQuestion, 10); // Default is 5
```

**Options:**
- `3` - Fast, minimal results
- `5` - Balanced (default)
- `10` - Comprehensive search
- `20` - Exhaustive search

### 2. AI Model Selection

**Location:** `.env`

```
OPENAI_MODEL=gpt-3.5-turbo
```

**Available Models:**

| Model | Speed | Cost | Quality | Use Case |
|-------|-------|------|---------|----------|
| `gpt-3.5-turbo` | ⚡ Fast | 💰 Cheap | Good | Quick answers, testing |
| `gpt-4` | 🐢 Slow | 💸 Expensive | Excellent | High-quality responses |
| `gpt-4-turbo` | 🚀 Medium | 💳 Medium | Excellent | Balanced performance |

### 3. Response Creativity

**Location:** `src/agent.ts`

```typescript
// Adjust temperature (0-2)
const response = await openai.chat.completions.create({
  temperature: 0.7, // Change this
  // ...
});
```

**Temperature Guide:**
- `0.0` - Deterministic, always same answer
- `0.3-0.5` - Focused, factual answers
- `0.7` - Balanced (default)
- `0.9-1.0` - Creative, varied answers
- `1.5-2.0` - Very creative, may be inconsistent

### 4. Answer Length

**Location:** `src/agent.ts`

```typescript
const response = await openai.chat.completions.create({
  max_tokens: 500, // Change this
  // ...
});
```

**Token Limits:**
- `250` - Short, concise answers
- `500` - Normal (default)
- `1000` - Detailed answers
- `2000` - Very long, comprehensive answers

**Note:** 1 token ≈ 4 characters

### 5. Custom System Prompt

**Location:** `src/agent.ts`

```typescript
const systemPrompt = `You are a helpful AI assistant that answers questions based on search results. 
Your job is to:
1. Analyze the provided search results
2. Extract relevant information
3. Provide a comprehensive, accurate answer to the user's question
4. If information is not found, say so clearly
Keep your answer concise but informative (2-4 sentences).`;
```

**Customization Examples:**

**For Technical Answers:**
```typescript
const systemPrompt = `You are a technical expert. Provide detailed, technical answers with code examples when relevant.`;
```

**For Simple Explanations:**
```typescript
const systemPrompt = `Explain everything as if to a 5th grader. Use simple words and examples.`;
```

**For Research:**
```typescript
const systemPrompt = `You are a research analyst. Provide comprehensive, well-sourced answers with citations.`;
```

## Use Case Examples

### 1. Quick Answers Bot

```env
OPENAI_MODEL=gpt-3.5-turbo
```

In `src/search.ts`:
```typescript
await searchGoogle(userQuestion, 3);
```

In `src/agent.ts`:
```typescript
temperature: 0.5,
max_tokens: 200,
```

### 2. Research Assistant

```env
OPENAI_MODEL=gpt-4
```

In `src/search.ts`:
```typescript
await searchGoogle(userQuestion, 10);
```

In `src/agent.ts`:
```typescript
temperature: 0.3,
max_tokens: 2000,
```

### 3. Creative Content Generator

```env
OPENAI_MODEL=gpt-4-turbo
```

In `src/agent.ts`:
```typescript
temperature: 1.2,
max_tokens: 1000,
```

### 4. Educational Tutor

```env
OPENAI_MODEL=gpt-4
```

**Custom system prompt:**
```typescript
const systemPrompt = `You are a helpful educational tutor. Explain concepts clearly with examples. Break down complex topics into simpler parts. Ask if the user needs clarification.`;
```

## Performance Optimization

### 1. Faster Responses

**Reduce search results:**
```typescript
await searchGoogle(userQuestion, 3); // Was 5
```

**Use cheaper model:**
```
OPENAI_MODEL=gpt-3.5-turbo
```

**Reduce tokens:**
```typescript
max_tokens: 250, // Was 500
```

### 2. Better Quality

**Increase search results:**
```typescript
await searchGoogle(userQuestion, 10); // Was 5
```

**Use better model:**
```
OPENAI_MODEL=gpt-4
```

**Increase tokens:**
```typescript
max_tokens: 1000, // Was 500
```

**Lower temperature:**
```typescript
temperature: 0.3, // Was 0.7
```

## Cost Optimization

### Pricing Breakdown (as of 2024)

**GPT-3.5-Turbo:**
- Input: $0.50 per 1M tokens
- Output: $1.50 per 1M tokens

**GPT-4:**
- Input: $30 per 1M tokens
- Output: $60 per 1M tokens

### Cost Calculation

Average question costs:
- **gpt-3.5-turbo**: $0.0005 - $0.001 per question
- **gpt-4**: $0.01 - $0.02 per question

### Money-Saving Tips

1. Use `gpt-3.5-turbo` for most queries
2. Reduce `max_tokens` to 250-500
3. Use `temperature: 0.3-0.5` (shorter answers)
4. Reduce search results to 3-5
5. Set `DEBUG=false` to avoid extra logging

**Example Budget:**
- 100 questions/day: ~$0.05-0.10/day ($1.50-3/month)
- 1000 questions/day: ~$0.50-1.00/day ($15-30/month)

## Advanced Customizations

### 1. Add Timeout Handling

```typescript
const response = await Promise.race([
  openai.chat.completions.create({...}),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 10000)
  )
]);
```

### 2. Add Retry Logic

```typescript
async function queryWithRetry(question: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await agent.processQuestion(question);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

### 3. Add Response Caching

```typescript
const cache = new Map();

async function queryWithCache(question: string) {
  if (cache.has(question)) {
    return cache.get(question);
  }
  const result = await agent.processQuestion(question);
  cache.set(question, result);
  return result;
}
```

## Environment Variables Complete Reference

| Variable | Default | Type | Description |
|----------|---------|------|-------------|
| `OPENAI_API_KEY` | - | string | Your OpenAI API key (required) |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | string | Model to use for AI responses |
| `DEBUG` | `false` | boolean | Enable verbose logging |

## Monitoring & Logging

### Enable Debug Mode

```env
DEBUG=true
```

This shows:
- ⏱️ Timing information
- 🔍 Search details
- 🤖 API responses
- 📊 Token usage

### Check API Usage

Visit: https://platform.openai.com/account/usage/overview

## Troubleshooting Advanced Issues

### Q: Responses are too generic
**A:** Lower temperature, increase max_tokens

### Q: Responses take too long
**A:** Use gpt-3.5-turbo, reduce search results, reduce max_tokens

### Q: Answers aren't detailed enough
**A:** Increase max_tokens, use gpt-4, increase search results

### Q: Getting rate limited
**A:** Reduce model from gpt-4 to gpt-3.5-turbo, add request throttling

---

**Happy customizing! 🎯**
