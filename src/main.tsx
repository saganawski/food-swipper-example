import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { debug } from './utils/debug';

// PWA Debug logging
debug.log('PWA Debug', 'App starting...');
debug.log('PWA Debug', 'Base URL:', import.meta.env.BASE_URL);
debug.log('PWA Debug', 'Current location:', window.location.href);
debug.log('PWA Debug', 'User agent:', navigator.userAgent);

// Register service worker
if ('serviceWorker' in navigator) {
  debug.log('PWA Debug', 'Service Worker supported');
  window.addEventListener('load', () => {
    const basePath = import.meta.env.BASE_URL;
    const swPath = `${basePath}sw.js`.replace('//', '/');
    
    debug.log('PWA Debug', 'Registering SW at:', swPath);
    debug.log('PWA Debug', 'SW scope:', basePath);
    
    navigator.serviceWorker.register(swPath, {
      scope: basePath
    }).then((registration) => {
      debug.log('PWA Debug', 'SW registered successfully:', registration);
      debug.log('PWA Debug', 'SW scope confirmed:', registration.scope);
      debug.log('PWA Debug', 'SW state:', registration.installing ? 'installing' : registration.waiting ? 'waiting' : registration.active ? 'active' : 'unknown');
    }).catch((registrationError) => {
      debug.error('PWA Debug', 'SW registration failed:', registrationError);
    });
  });
  
  // Listen for SW updates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    debug.log('PWA Debug', 'SW controller changed');
  });
} else {
  debug.log('PWA Debug', 'Service Worker NOT supported');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
