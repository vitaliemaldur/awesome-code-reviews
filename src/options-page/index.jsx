import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import browser from 'webextension-polyfill';
import '~/assets/css/main.css';

const App = () => {
  const [formData, setFormData] = useState({
    commentStyle: '',
    apiToken: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await browser.storage.local.get([
        "settings:formattingStyle",
        "settings:apiToken",
      ]);
      setFormData({
        commentStyle: data["settings:formattingStyle"] || '',
        apiToken: data["settings:apiToken"] || '',
      });
    };
    fetchData();
  }, []);

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
      <h1 className="text-2xl font-bold mb-6">Configure your preferred formatting style</h1>
      <form className="w-1/2" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Comment Formatting Style</legend>
          <textarea
            name="commentStyle"
            className="textarea h-24 w-full"
            placeholder="Enter formatting style"
            value={formData.commentStyle}
            onChange={(e) => setFormData({ ...formData, commentStyle: e.target.value })}
          ></textarea>
        </fieldset>
        <fieldset className="fieldset mt-4">
          <legend className="fieldset-legend">API Token for OpenRouter</legend>
          <input
            name="apiToken"
            type="text"
            className="input w-full"
            placeholder="Enter API token"
            value={formData.apiToken}
            onChange={(e) => setFormData({ ...formData, apiToken: e.target.value })}
          />
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
