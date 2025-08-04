# Awesome Code Reviews

## Overview
Awesome Code Reviews is a browser extension designed to enhance the code review process by providing tools for formatting comments and integrating with OpenRouter AI.
The extension allows users to format comments using a customizable style and interact with OpenRouter AI for improved clarity and structure.

## Features
- **Comment Formatting**: Format code review comments to be more readable and concise.
- **OpenRouter Integration**: Use OpenRouter AI to enhance comment clarity and structure.
- **Options Page**: Customize formatting style and set API tokens directly from the extension's options page.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/easy-code-reviews.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in your browser:
   - Open your browser's extensions page.
   - Enable "Developer mode".
   - Click "Load unpacked" and select the `dist` folder.

## Development
### Prerequisites
- Node.js (LTS version specified in `.nvmrc`)
- npm

### Steps
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development build:
   ```bash
   npm run build:watch
   ```
3. Open the browser and load the unpacked extension from the `dist` folder.

## Usage
1. Click the extension icon to open the options page.
2. Set your preferred comment formatting style and OpenRouter API token.
3. Use the extension on supported platforms (e.g., GitLab).