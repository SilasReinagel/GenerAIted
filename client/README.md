# GenerAIted Client

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the `client` directory
   - Add the following line to the `.env` file:
     ```
     VITE_POSTHOG_API_KEY=your_posthog_api_key_here
     ```
   - Replace `your_posthog_api_key_here` with your actual PostHog API key

3. Run the development server:
   ```
   npm run dev
   ```

## Building for production

To create a production build, run: