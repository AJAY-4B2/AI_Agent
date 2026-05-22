#!/usr/bin/env node

/**
 * DEMO VERSION - Works without API Key
 * Shows how the AI Search Agent works with real Google search
 */

const readline = require('readline');
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Search Google and get real results
 */
async function searchGoogle(query) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.google.com/search?q=${encodedQuery}&hl=en&num=5`;

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    const response = await axios.get(url, { headers, timeout: 10000 });
    const $ = cheerio.load(response.data);
    const results = [];

    $('div.g').each((index, element) => {
      if (results.length >= 5) return;

      const titleElement = $(element).find('h3');
      const linkElement = $(element).find('a');
      const snippetElement = $(element).find('div[style="-webkit-line-clamp:2"]');

      const title = titleElement.text().trim();
      const link = linkElement.attr('href');
      const snippet = snippetElement.text().trim();

      if (title && link && !link.startsWith('/search')) {
        results.push({
          title,
          url: link,
          snippet: snippet || 'No description available'
        });
      }
    });

    return results;
  } catch (error) {
    console.error('❌ Search error:', error.message);
    return [];
  }
}

/**
 * Generate intelligent answer using a simple algorithm
 */
function generateAnswer(question, searchResults) {
  if (searchResults.length === 0) {
    return 'I could not find information about this topic.';
  }

  // Extract keywords from snippets
  const snippets = searchResults.map(r => r.snippet).join(' ');
  
  // Simple answer generation
  const answers = {
    'what is': `Based on the search results: ${snippets.substring(0, 150)}...`,
    'how': `Here's how it works: ${snippets.substring(0, 150)}...`,
    'when': `According to the search results: ${snippets.substring(0, 150)}...`,
    'why': `The reason is: ${snippets.substring(0, 150)}...`,
    'who': `This person/entity: ${snippets.substring(0, 150)}...`,
  };

  // Find matching answer
  for (const [key, template] of Object.entries(answers)) {
    if (question.toLowerCase().includes(key)) {
      return template;
    }
  }

  // Default answer
  return `Based on the search results: ${snippets.substring(0, 200)}...`;
}

/**
 * Format search results
 */
function formatSearchResults(results) {
  if (results.length === 0) {
    return 'No search results found.';
  }

  let formatted = `✅ Found ${results.length} search results:\n\n`;
  results.forEach((result, index) => {
    formatted += `${index + 1}. 📄 ${result.title}\n`;
    formatted += `   🔗 ${result.url}\n`;
    formatted += `   ℹ️  ${result.snippet}\n\n`;
  });

  return formatted;
}

/**
 * Main demo function
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║     🤖 AI SEARCH AGENT - DEMO MODE (Real Google Search)    ║');
  console.log('║          Ask questions and I\'ll search for answers!        ║');
  console.log('║    (No API Key needed - using real Google search data)      ║');
  console.log('║              Type "exit" to quit                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    rl.question('\n📝 Your question: ', async (input) => {
      const question = input.trim();

      if (question.toLowerCase() === 'exit') {
        console.log('\n👋 Goodbye!\n');
        rl.close();
        return;
      }

      if (!question) {
        console.log('⚠️  Please enter a question.');
        askQuestion();
        return;
      }

      try {
        console.log('\n⏳ Searching Google for: "' + question + '"\n');
        
        // Get real search results
        const searchResults = await searchGoogle(question);

        // Display results
        console.log('╔════════════════════════════════════════════════════════════╗');
        console.log('║              📊 SEARCH RESULTS FROM GOOGLE                 ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');

        console.log(formatSearchResults(searchResults));

        // Generate answer
        console.log('╔════════════════════════════════════════════════════════════╗');
        console.log('║           🤖 AI-GENERATED SUMMARY (Demo Mode)              ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');

        const answer = generateAnswer(question, searchResults);
        console.log(answer);

        if (searchResults.length > 0) {
          console.log('\n📚 Sources:');
          searchResults.forEach((source) => {
            console.log(`   • ${source.url}`);
          });
        }
      } catch (error) {
        console.error('❌ Error:', error.message);
      }

      askQuestion();
    });
  };

  askQuestion();
}

main().catch(console.error);
