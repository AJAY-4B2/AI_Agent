import * as readline from 'readline';
import { SearchAgent } from './agent';

const agent = new SearchAgent();

/**
 * Interactive CLI for the AI Search Agent
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║          🤖 AI SEARCH AGENT - Interactive Mode             ║');
  console.log('║    Ask me any question and I\'ll search for answers!         ║');
  console.log('║              Type "exit" to quit                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Check if OpenAI API key is set
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ ERROR: OPENAI_API_KEY is not set.');
    console.error('Please create a .env file with your OpenAI API key.');
    console.error('Copy .env.example to .env and add your API key.');
    process.exit(1);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    rl.question('\n📝 Your question: ', async (input) => {
      const question = input.trim();

      if (question.toLowerCase() === 'exit') {
        console.log('\n👋 Goodbye!');
        rl.close();
        return;
      }

      if (!question) {
        console.log('⚠️  Please enter a question.');
        askQuestion();
        return;
      }

      try {
        console.log('\n⏳ Processing your question...\n');
        const result = await agent.processQuestion(question);

        // Display results
        console.log('╔════════════════════════════════════════════════════════════╗');
        console.log('║                     📊 RESULTS                             ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');

        console.log(`🔗 Search Results Found: ${result.searchResults.length}\n`);
        result.searchResults.forEach((result, index) => {
          console.log(`${index + 1}. ${result.title}`);
          console.log(`   📍 ${result.url}`);
          console.log(`   ℹ️  ${result.snippet}\n`);
        });

        console.log('╔════════════════════════════════════════════════════════════╗');
        console.log('║                   🤖 AI ANSWER                             ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');
        console.log(result.answer);

        console.log('\n📚 Sources:');
        result.sources.forEach((source) => {
          console.log(`   • ${source}`);
        });
      } catch (error) {
        console.error('❌ Error processing question:', error);
      }

      askQuestion();
    });
  };

  askQuestion();
}

// Run the agent
main().catch(console.error);
