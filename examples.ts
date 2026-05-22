/**
 * Advanced Usage Examples for AI Search Agent
 * Run with: ts-node examples.ts
 */

import { SearchAgent } from './src/agent';

/**
 * Example 1: Simple Single Question
 */
async function example1_singleQuestion() {
  console.log('\n=== Example 1: Single Question ===\n');
  
  const agent = new SearchAgent();
  const result = await agent.processQuestion('What is machine learning?');
  
  console.log('Question:', result.question);
  console.log('\nAnswer:', result.answer);
  console.log('\nSources:', result.sources);
}

/**
 * Example 2: Multiple Questions (Conversation)
 */
async function example2_conversation() {
  console.log('\n=== Example 2: Multi-turn Conversation ===\n');
  
  const agent = new SearchAgent();
  
  // First question
  let result = await agent.processQuestion('Who is Elon Musk?');
  console.log('Q1:', result.question);
  console.log('A1:', result.answer);
  console.log('---\n');
  
  // Second question
  result = await agent.processQuestion('What companies has he founded?');
  console.log('Q2:', result.question);
  console.log('A2:', result.answer);
}

/**
 * Example 3: Processing Multiple Independent Questions
 */
async function example3_parallelQuestions() {
  console.log('\n=== Example 3: Parallel Questions ===\n');
  
  const agent = new SearchAgent();
  const questions = [
    'What is Python?',
    'What is JavaScript?',
    'What is TypeScript?'
  ];
  
  const results = await Promise.all(
    questions.map(q => agent.processQuestion(q))
  );
  
  results.forEach((result, index) => {
    console.log(`\nQuestion ${index + 1}: ${result.question}`);
    console.log(`Answer: ${result.answer.substring(0, 100)}...`);
  });
}

/**
 * Example 4: Error Handling
 */
async function example4_errorHandling() {
  console.log('\n=== Example 4: Error Handling ===\n');
  
  const agent = new SearchAgent();
  
  try {
    const result = await agent.processQuestion('Tell me about advanced AI concepts');
    console.log('Success:', result.answer);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

/**
 * Example 5: Using with Different Models
 */
async function example5_differentModels() {
  console.log('\n=== Example 5: Model Comparison ===\n');
  console.log('Current model:', process.env.OPENAI_MODEL || 'gpt-3.5-turbo');
  console.log('To use a different model, set OPENAI_MODEL in .env');
  console.log('Options: gpt-3.5-turbo, gpt-4, gpt-4-turbo\n');
}

/**
 * Example 6: Extracting Structured Data
 */
async function example6_structuredData() {
  console.log('\n=== Example 6: Structured Data Extraction ===\n');
  
  const agent = new SearchAgent();
  const result = await agent.processQuestion('List the top 3 programming languages in 2024');
  
  console.log('Search Results Count:', result.searchResults.length);
  console.log('\nFirst Result:');
  console.log('  Title:', result.searchResults[0].title);
  console.log('  URL:', result.searchResults[0].url);
  console.log('  Snippet:', result.searchResults[0].snippet);
  
  console.log('\nAI Generated Answer:');
  console.log(result.answer);
}

// Main runner
async function runExamples() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║          Advanced AI Search Agent Examples                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  
  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('\n❌ ERROR: OPENAI_API_KEY is not set.');
    console.error('Please create a .env file with your OpenAI API key.');
    process.exit(1);
  }
  
  try {
    // Uncomment examples to run them
    
    // await example1_singleQuestion();
    // await example2_conversation();
    // await example3_parallelQuestions();
    // await example4_errorHandling();
    await example5_differentModels();
    // await example6_structuredData();
    
    console.log('\n✅ Examples completed!\n');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  runExamples();
}

export {
  example1_singleQuestion,
  example2_conversation,
  example3_parallelQuestions,
  example4_errorHandling,
  example5_differentModels,
  example6_structuredData
};
