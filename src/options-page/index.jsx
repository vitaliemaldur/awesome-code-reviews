import { createRoot } from 'react-dom/client';
import browser from 'webextension-polyfill';
import '~/assets/css/main.css';

const App = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const commentStyle = formData.get('commentStyle');
    const apiToken = formData.get('apiToken');
    await browser.storage.local.set({
      "settings:formattingStyle": commentStyle,
      "settings:apiToken": apiToken,
    });
    window.close();
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <form className="w-1/2" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Comment Formatting Style</legend>
          <textarea name="commentStyle" className="textarea h-24 w-full" placeholder="Enter formatting style"></textarea>
        </fieldset>
        <fieldset className="fieldset mt-4">
          <legend className="fieldset-legend">API Token for OpenRouter</legend>
          <input name="apiToken" type="text" className="input w-full" placeholder="Enter API token" />
        </fieldset>
        <div className="flex justify-end mt-6">
          <button type="submit" className="btn btn-primary">Save & Close</button>
        </div>
      </form>
    </main>
  );
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);
