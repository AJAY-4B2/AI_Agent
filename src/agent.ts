import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { searchGoogle, formatSearchResults } from './search';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
const DEBUG = process.env.DEBUG === 'true';

export interface AgentResponse {
  question: string;
  searchResults: Array<{ title: string; url: string; snippet: string }>;
  answer: string;
  sources: string[];
}

/**
 * Main AI Agent that processes questions and searches for answers
 */
export class SearchAgent {
  private conversationHistory: Array<{ role: string; content: string }> = [];

  /**
   * Process a user question and return an AI-generated answer based on Google search results
   */
  async processQuestion(userQuestion: string): Promise<AgentResponse> {
    if (DEBUG) console.log('\n🔍 Processing question:', userQuestion);

    try {
      // Step 1: Search Google for relevant information
      if (DEBUG) console.log('📡 Searching Google...');
      const searchResults = await searchGoogle(userQuestion, 5);

      if (DEBUG) console.log(`✅ Found ${searchResults.length} results`);

      // Step 2: Format search results for the AI
      const formattedResults = formatSearchResults(searchResults);

      // Step 3: Create a prompt for the AI to generate an answer
      const systemPrompt = `You are a helpful AI assistant that answers questions based on search results. 
Your job is to:
1. Analyze the provided search results
2. Extract relevant information
3. Provide a comprehensive, accurate answer to the user's question
4. If information is not found, say so clearly
Keep your answer concise but informative (2-4 sentences).`;

      const userPrompt = `Question: ${userQuestion}\n\nSearch Results:\n${formattedResults}\n\nPlease provide a comprehensive answer based on these search results.`;

      // Add to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userPrompt,
      });

      // Step 4: Call OpenAI API to generate answer
      if (DEBUG) console.log('🤖 Generating AI response...');
      const response = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...this.conversationHistory.map((msg) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiAnswer = response.choices[0].message.content || 'Unable to generate an answer';

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiAnswer,
      });

      // Step 5: Extract source URLs
      const sources = searchResults.map((result) => result.url);

      return {
        question: userQuestion,
        searchResults,
        answer: aiAnswer,
        sources,
      };
    } catch (error) {
      console.error('Error processing question:', error);
      throw error;
    }
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   */
  getHistory(): Array<{ role: string; content: string }> {
    return this.conversationHistory;
  }
}
