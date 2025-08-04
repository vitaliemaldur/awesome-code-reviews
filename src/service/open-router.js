import browser from 'webextension-polyfill';
import OpenAI from 'openai';

let openRouterClient = null;

export async function getOpenRouterClient() {
  if (openRouterClient) {
    return openRouterClient;
  }

  const API_TOKEN_KEY = 'settings:apiToken';

  const { [API_TOKEN_KEY]: API_KEY } = await browser.storage.local.get(API_TOKEN_KEY);
  if (!API_KEY) {
    throw new Error('API key is not set');
  }

  openRouterClient = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: API_KEY,
  });
  return openRouterClient;
}
