#!/usr/bin/env node

/**
 * AI SEARCH AGENT - WEB SERVER
 * Run on: http://localhost:3000
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

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
 * HTML Template
 */
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 AI Search Agent</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 800px;
            width: 100%;
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .input-section {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }
        
        input[type="text"] {
            flex: 1;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1em;
            transition: border-color 0.3s;
        }
        
        input[type="text"]:focus {
            outline: none;
            border-color: #667eea;
        }
        
        button {
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        .topics-section {
            margin-bottom: 30px;
        }
        
        .topics-title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 15px;
            color: #333;
        }
        
        .topics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
        }
        
        .topic-tag {
            background: #f0f0f0;
            padding: 10px 15px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            border: 2px solid transparent;
            text-align: center;
        }
        
        .topic-tag:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }
        
        .results {
            margin-top: 30px;
        }
        
        .result-item {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            margin-bottom: 20px;
        }
        
        .result-title {
            font-size: 1.3em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .result-summary {
            font-size: 1em;
            color: #333;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .result-details {
            background: white;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 15px;
            border: 1px solid #e0e0e0;
            line-height: 1.6;
        }
        
        .result-sources {
            background: white;
            padding: 15px;
            border-radius: 6px;
        }
        
        .sources-title {
            font-weight: bold;
            margin-bottom: 10px;
            color: #667eea;
        }
        
        .source-item {
            padding: 8px 0;
            color: #555;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .source-item:last-child {
            border-bottom: none;
        }
        
        .no-result {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        
        .loading {
            text-align: center;
            padding: 20px;
            color: #667eea;
            font-size: 1.1em;
        }
        
        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .footer {
            background: #f5f5f5;
            padding: 15px;
            text-align: center;
            color: #666;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 AI Search Agent</h1>
            <p>Ask questions and get instant answers!</p>
        </div>
        
        <div class="content">
            <div class="input-section">
                <input type="text" id="questionInput" placeholder="Ask me anything..." />
                <button onclick="askQuestion()">Ask</button>
            </div>
            
            <div class="topics-section">
                <div class="topics-title">📚 Popular Topics:</div>
                <div class="topics-grid" id="topicsGrid"></div>
            </div>
            
            <div class="results" id="results"></div>
        </div>
        
        <div class="footer">
            <p>✨ Powered by AI Search Agent | No API Key Required</p>
        </div>
    </div>
    
    <script>
        // Load topics on page load
        window.addEventListener('load', () => {
            loadTopics();
            document.getElementById('questionInput').focus();
        });
        
        function loadTopics() {
            fetch('/api/topics')
                .then(res => res.json())
                .then(data => {
                    const grid = document.getElementById('topicsGrid');
                    grid.innerHTML = data.topics.map(topic => 
                        \`<div class="topic-tag" onclick="searchTopic('\${topic}')">\${topic}</div>\`
                    ).join('');
                });
        }
        
        function searchTopic(topic) {
            document.getElementById('questionInput').value = topic;
            askQuestion();
        }
        
        function askQuestion() {
            const question = document.getElementById('questionInput').value.trim();
            if (!question) {
                alert('Please enter a question');
                return;
            }
            
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<div class="loading"><span class="spinner"></span>Processing...</div>';
            
            fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            })
            .then(res => res.json())
            .then(data => {
                if (data.found) {
                    resultsDiv.innerHTML = \`
                        <div class="result-item">
                            <div class="result-title">✅ Answer Found</div>
                            <div class="result-summary"><strong>\${data.summary}</strong></div>
                            <div class="result-details"><strong>Details:</strong><br>\${data.details}</div>
                            <div class="result-sources">
                                <div class="sources-title">📚 Sources:</div>
                                \${data.sources.map(s => \`<div class="source-item">• \${s}</div>\`).join('')}
                            </div>
                        </div>
                    \`;
                } else {
                    resultsDiv.innerHTML = '<div class="no-result">❌ No answer found. Try asking about one of the topics above!</div>';
                }
            })
            .catch(err => {
                resultsDiv.innerHTML = '<div class="no-result">Error: ' + err.message + '</div>';
            });
        }
        
        // Allow Enter key to search
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && document.activeElement.id === 'questionInput') {
                askQuestion();
            }
        });
    </script>
</body>
</html>
`;

/**
 * Request handler
 */
function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Home page
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlTemplate);
    return;
  }

  // API: Get topics
  if (pathname === '/api/topics' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const topics = Object.keys(knowledgeBase).map(t => 
      t.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    );
    res.end(JSON.stringify({ topics }));
    return;
  }

  // API: Search
  if (pathname === '/api/search' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const question = data.question || '';
        const result = searchKnowledgeBase(question);

        if (result) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            found: true,
            summary: result.summary,
            details: result.details,
            sources: result.sources
          }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ found: false }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}

/**
 * Create and start server
 */
const PORT = 3000;
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║        🤖 AI SEARCH AGENT - WEB SERVER STARTED             ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`📱 Open your browser and visit: http://localhost:${PORT}\n`);
  console.log('Press Ctrl+C to stop the server.\n');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
