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
        content: `You are a helpful assistant that formats code review comments to be more readable and concise.
          You will receive a comment text and you should return a well-formatted version of it.
          Make sure to keep the original meaning and context of the comment, but improve its clarity and structure.
          Respond with the formatted text only, without any additional explanations or comments, using markdown formatting.
          Use the following formatting style: ${formattingStyle['settings:formattingStyle']}.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
  });
  return completion.choices[0].message.content;
}
