const browser = window.browser || window.chrome;

export function getExtensionId() {
  return document.documentElement.dataset.awesomeCodeReviewsExtId;
}

/**
 * Send a message to the service worker via runtime.sendMessage (no persistent connection)
 * @param {string} method
 * @param {object|null} params
 * @returns {Promise<*>}
 */
export function sendApiMessage(method, params = null) {
  const id = Date.now();
  const payload = { id, method, params };
  return new Promise((resolve, reject) => {
    browser.runtime.sendMessage(getExtensionId(), payload, (response) => {
      if (browser.runtime.lastError) {
        reject(new Error(browser.runtime.lastError.message));
        return;
      }
      if (response?.error) {
        reject(new Error(response.error));
      } else {
        resolve(response?.result);
      }
    });
  });
}


