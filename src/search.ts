import axios from 'axios';
import * as cheerio from 'cheerio';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

/**
 * Google Search using web scraping
 * This searches Google and returns relevant results
 */
export async function searchGoogle(query: string, maxResults: number = 5): Promise<SearchResult[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.google.com/search?q=${encodedQuery}&hl=en&num=${maxResults}`;

    // Set a realistic User-Agent to avoid being blocked
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    const response = await axios.get(url, { 
      headers,
      timeout: 10000 
    });

    const $ = cheerio.load(response.data);
    const results: SearchResult[] = [];

    // Parse Google search results
    $('div.g').each((index, element) => {
      if (results.length >= maxResults) return;

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
    console.error('Error searching Google:', error);
    // Return fallback results if search fails
    return [];
  }
}

/**
 * Format search results into a readable string
 */
export function formatSearchResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return 'No search results found.';
  }

  let formatted = `Found ${results.length} results:\n\n`;
  results.forEach((result, index) => {
    formatted += `${index + 1}. **${result.title}**\n`;
    formatted += `   URL: ${result.url}\n`;
    formatted += `   ${result.snippet}\n\n`;
  });

  return formatted;
}
