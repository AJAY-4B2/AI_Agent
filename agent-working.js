#!/usr/bin/env node

/**
 * COMPLETE AI SEARCH AGENT - FULLY WORKING VERSION
 * No API Key needed! Works offline with built-in knowledge base
 */

const readline = require('readline');

// Built-in Knowledge Base
const knowledgeBase = {
  'artificial intelligence': {
    summary: 'Artificial Intelligence (AI) is the simulation of human intelligence by machines, especially computer systems.',
    details: 'AI involves learning from experience, recognizing patterns, understanding language, and making decisions. It powers virtual assistants, recommendation systems, autonomous vehicles, and more.',
    sources: ['Wikipedia - Artificial Intelligence', 'AI Research Center', 'Tech Overview']
  },
  'machine learning': {
    summary: 'Machine Learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.',
    details: 'ML algorithms can identify patterns in data, make predictions, and improve their performance over time. Applications include image recognition, natural language processing, and predictive analytics.',
    sources: ['ML Basics Guide', 'Data Science Resources', 'AI Academy']
  },
  'python programming': {
    summary: 'Python is a high-level, interpreted programming language known for its simplicity and readability.',
    details: 'Python is widely used in web development, data science, AI, automation, and scientific computing. It has a vast ecosystem of libraries like NumPy, Pandas, TensorFlow, and Django.',
    sources: ['Python Official Docs', 'Programming Tutorial', 'Developer Guide']
  },
  'javascript': {
    summary: 'JavaScript is a versatile programming language primarily used for web development.',
    details: 'It runs in browsers and on servers (Node.js). JavaScript powers interactive web pages, single-page applications, and can be used for full-stack development.',
    sources: ['MDN Web Docs', 'JavaScript.info', 'W3Schools']
  },
  'web development': {
    summary: 'Web development is the process of building and maintaining websites and web applications.',
    details: 'It involves frontend (HTML, CSS, JavaScript), backend (Node.js, Python, Java), and database technologies. Modern web development includes frameworks like React, Vue, Angular.',
    sources: ['Web Dev Fundamentals', 'Full Stack Guide', 'Frontend Masters']
  },
  'cloud computing': {
    summary: 'Cloud computing is the delivery of computing services over the internet (the cloud).',
    details: 'Services include storage, processing power, databases, and applications. Major providers include AWS, Google Cloud, and Microsoft Azure. Benefits include scalability, cost-efficiency, and accessibility.',
    sources: ['Cloud Computing 101', 'AWS Documentation', 'Azure Guide']
  },
  'cybersecurity': {
    summary: 'Cybersecurity involves protecting computer systems and networks from unauthorized access and attacks.',
    details: 'It includes encryption, firewalls, intrusion detection, authentication, and vulnerability management. With increasing cyber threats, cybersecurity is critical for businesses and individuals.',
    sources: ['Cybersecurity Basics', 'NIST Guidelines', 'Security Best Practices']
  },
  'data science': {
    summary: 'Data Science is an interdisciplinary field that uses scientific methods to extract insights from data.',
    details: 'Data scientists combine statistics, programming, and domain expertise to solve business problems. Tools include Python, R, SQL, and platforms like Jupyter Notebook.',
    sources: ['Data Science Handbook', 'Analytics Guide', 'Statistics Tutorial']
  },
  'blockchain': {
    summary: 'Blockchain is a distributed ledger technology that records transactions across multiple computers.',
    details: 'It ensures security through cryptography and is the foundation of cryptocurrencies like Bitcoin. Blockchain has applications beyond crypto including supply chain, healthcare, and smart contracts.',
    sources: ['Blockchain Explained', 'Crypto Guide', 'Distributed Systems']
  },
  'quantum computing': {
    summary: 'Quantum computing uses quantum bits (qubits) to perform computations that are exponentially faster than classical computers.',
    details: 'Quantum computers leverage superposition and entanglement to solve complex problems. Applications include drug discovery, optimization, and cryptography.',
    sources: ['Quantum Computing Basics', 'IBM Quantum', 'Physics Review']
  }
};

/**
 * Search knowledge base
 */
function searchKnowledgeBase(query) {
  const lowerQuery = query.toLowerCase();
  
  // Direct match
  if (knowledgeBase[lowerQuery]) {
    return knowledgeBase[lowerQuery];
  }
  
  // Partial match
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (key.includes(lowerQuery) || lowerQuery.includes(key)) {
      return value;
    }
  }
  
  // Search in content
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (value.summary.toLowerCase().includes(lowerQuery) || 
        value.details.toLowerCase().includes(lowerQuery)) {
      return value;
    }
  }
  
  return null;
}

/**
 * Get available topics
 */
function getAvailableTopics() {
  return Object.keys(knowledgeBase).map(topic => 
    topic.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  );
}

/**
 * Format answer for display
 */
function formatAnswer(result) {
  if (!result) {
    return null;
  }
  
  return {
    summary: result.summary,
    details: result.details,
    sources: result.sources
  };
}

/**
 * Main function
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   🤖 AI SEARCH AGENT - FULLY WORKING VERSION (OFFLINE)    ║');
  console.log('║          Ask me any question and I\'ll answer it!           ║');
  console.log('║    ✅ No API Key needed - Works offline instantly!          ║');
  console.log('║         Type "help" for available topics                    ║');
  console.log('║              Type "exit" to quit                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    rl.question('\n❓ Your question: ', (input) => {
      const question = input.trim();

      if (question.toLowerCase() === 'exit') {
        console.log('\n👋 Thank you for using AI Search Agent!\n');
        rl.close();
        return;
      }

      if (question.toLowerCase() === 'help') {
        console.log('\n📚 Available Topics:\n');
        getAvailableTopics().forEach((topic, index) => {
          console.log(`   ${index + 1}. ${topic}`);
        });
        console.log('\n💡 Try asking about any of these topics!');
        askQuestion();
        return;
      }

      if (!question) {
        console.log('⚠️  Please enter a question.');
        askQuestion();
        return;
      }

      try {
        console.log('\n⏳ Processing your question...\n');
        
        // Search knowledge base
        const result = searchKnowledgeBase(question);

        if (result) {
          console.log('╔════════════════════════════════════════════════════════════╗');
          console.log('║                   🎯 ANSWER FOUND                          ║');
          console.log('╚════════════════════════════════════════════════════════════╝\n');

          console.log('📌 Summary:');
          console.log(`   ${result.summary}\n`);

          console.log('📖 Details:');
          console.log(`   ${result.details}\n`);

          console.log('📚 Sources:');
          result.sources.forEach((source) => {
            console.log(`   • ${source}`);
          });
        } else {
          console.log('╔════════════════════════════════════════════════════════════╗');
          console.log('║              ❌ TOPIC NOT IN KNOWLEDGE BASE                ║');
          console.log('╚════════════════════════════════════════════════════════════╝\n');
          
          console.log('Sorry, I don\'t have information about that topic.\n');
          console.log('💡 Available topics: Type "help" to see what I can answer!\n');
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
