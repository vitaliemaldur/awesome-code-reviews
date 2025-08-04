import browser from 'webextension-polyfill';
import { getOpenRouterClient } from '~/service/open-router.js';

export async function format(text) {
  const openRouter = await getOpenRouterClient();
  const formattingStyle = await browser.storage.local.get('settings:formattingStyle');
  const completion = await openRouter.chat.completions.create({
    model: 'google/gemma-3-27b-it:free',
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant specialized in formatting code review comments to enhance readability and conciseness.
          Your task is to transform the provided comment text into a well-structured and clear version, strictly adhering to the user's specified formatting style.
          Ensure the original meaning and context are preserved while improving clarity and structure.
          Use markdown formatting and avoid adding any explanations, comments, or extra text.
          The formatting style to follow is: "${formattingStyle['settings:formattingStyle']}".
          If the formatting style is unclear or missing, default to professional and concise formatting suitable for technical reviews.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
  });
  return completion.choices[0].message.content;
}
