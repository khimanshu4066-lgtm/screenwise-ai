# ScreenWise AI — Smart TV Companion

A front-end concept prototype for an AI-enhanced viewing companion. It demonstrates mood-based and time-aware recommendations, a watchlist, and keyboard navigation intended to make TV-style browsing easier.

## Current prototype features
- Filter six sample recommendations by mood and viewing duration.
- Show a short explanation for each recommendation.
- Save/remove items from a watchlist (stored in browser local storage).
- Navigate interactive controls with a keyboard; arrow keys move focus and Enter activates focused controls.
- No account or paid API is required.

## Run locally
1. Download and extract the repository.
2. Open `index.html` in a modern browser, or open the folder in VS Code and use the Live Server extension.
3. Try mood/time filters, save a recommendation, and open **My Watchlist**.

## Important platform note
This is a browser prototype, not yet a packaged Fire OS/Vega app. The hackathon asks for a demo running on an actual Fire TV device or the Fire TV/Vega simulator. Before submission, port/adapt the UI to the chosen supported Fire TV framework and record that running environment. Amazon's official Fire TV developer docs list HTML5 web apps, Android, and React Native options: https://developer.amazon.com/docs/fire-tv/get-started-with-fire-tv

Vega's current developer tools require macOS or Linux; Windows and WSL are not currently supported. If targeting Vega OS, use a supported Mac/Linux environment or another eligible setup, then follow the official Vega docs: https://developer.amazon.com/docs/vega/0.24/vega-get-started

## Product status
Prototype only. The recommendation engine uses local sample data and is not a connected streaming service or live AI model. Artwork is CSS-generated; no third-party video, music, or trademarks are included.

## License
MIT License — see `LICENSE`.

 Our Team
- **Himanshu Kumar** — Co-founder & Developer
- **Muskan Kumari** — Co-founder & Developer
We are a two-person team building ScreenWise AI to make entertainment discovery simpler and more personalized.
