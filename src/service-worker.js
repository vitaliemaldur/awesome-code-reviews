import browser from 'webextension-polyfill';
import APIHandlers from './sw-api';

/**
 * Handle messages from the web app: content-script, widget, etc.
 *
 * @param {{method: string, params: object|null}} message - The message object
 * @param {object} sender - The sender object
 * @returns {Promise<{method, id}>}
 */
const onMessageListener = async (message, sender) => {
  const { method, params } = message;
  const source = sender.id === browser.runtime.id ? 'extension' : 'widget';

  console.log(`message received (source: ${source}) ->`, method, message);
  let handler = APIHandlers;
  const methodParts = method.split('.');
  for (const key of methodParts) {
    if (!handler) {
      break;
    }
    handler = handler[key];
  }

  const response = {
    id: message.id,
    method,
  };

  if (typeof handler !== 'function') {
    console.warn('Unknown message received:', method, message);
    response.error = `Unknown API method: ${method}`;
    return response;
  }

  try {
    response.result = await handler(params, sender.tab.id);
  } catch (e) {
    console.warn('An error occurred in the API for method', method, e);
    response.error = e.message;
  }

  return response;
};

browser.runtime.onMessage.addListener(onMessageListener);
browser.runtime.onMessageExternal.addListener(onMessageListener);
browser.action.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});
