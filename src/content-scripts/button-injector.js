import { sendApiMessage } from './helpers.js';

async function handleButtonClick(event) {
  event.preventDefault();
  const textarea = event.target.closest('form').querySelector('textarea');
  if (!textarea) {
    console.error('Textarea not found in the form');
    return;
  }

  try {
    // const formattedComment = await sendApiMessage('comments.format', textarea.value);
    const formattedComment = await sendApiMessage('comments.format', textarea.value);
    textarea.value = formattedComment;
  } catch (error) {
    console.error('Error sending message to extension:', error);
  }
}

// Inject a button into every .common-note-form added to the page (including dynamically added)
function injectButtonIntoForm(form) {
  if (form.querySelector('.awesome-comment-btn')) return; // Prevent duplicates

  // Find "Cancel" button
  const buttonTestIds = [
    'cancel', // edit comment form
    'cancelBatchCommentsEnabled', // batch comment form
    'close-reopen-button', // MR discussion form
  ];
  const selector = buttonTestIds.map((id) => `button[data-testId="${id}"]`).join(', ');
  const button = form.querySelector(selector);
  if (!button) return;

  button.classList.add('sm:gl-mr-3');

  // add button next to the matching button
  const btn = document.createElement('button');
  btn.textContent = 'Make it awesome!';
  btn.className = button.className + ' .awesome-comment-btn'; // Use same class as the original button
  btn.type = 'button';
  btn.addEventListener('click', handleButtonClick);
  button.parentNode.appendChild(btn);
}

function startObserver() {
  // Inject into all existing .common-note-form elements
  document.querySelectorAll('.common-note-form').forEach(injectButtonIntoForm);

  // Observe for new .common-note-form elements added to the DOM
  const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) {
          if (node.matches && node.matches('.common-note-form')) {
            injectButtonIntoForm(node);
          } else if (node.querySelectorAll) {
            node.querySelectorAll('.common-note-form').forEach(injectButtonIntoForm);
          }
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startObserver);
} else {
  startObserver();
}
