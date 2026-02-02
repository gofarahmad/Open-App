
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    /**
     * Use a simple relative path for registration.
     * Manual URL construction (e.g., new URL('./sw.js', window.location.href)) 
     * can throw 'Invalid URL' in certain sandboxed environments (like srcdoc iframes)
     * where window.location.href is not a standard absolute URL.
     */
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('DroidLaunch SW active:', reg.scope))
      .catch((err) => {
        /**
         * Service Worker registration often fails in cross-origin sandboxes or
         * restricted preview environments. We catch and log this gracefully 
         * to prevent the application from crashing.
         */
        console.info('Service Worker registration skipped or restricted by environment:', err.message);
      });
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
