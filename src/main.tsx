import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function enableMocking() {
  try {
    const { startMSW } = await import('./mocks/browser');
    await startMSW();
    console.log('[MAIN] MSW started successfully')
  } catch (error) {
    console.error(' [MAIN] MSW failed to start:', error)
  }
}


enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}).catch(error => {
  console.error('[MAIN] Failed to start app:', error)
  // Render app anyway
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
