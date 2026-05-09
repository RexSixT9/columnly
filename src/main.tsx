import { StrictMode } from 'react';
import { RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider';
import router from '@/routes';
import { Toaster } from '@/components/ui/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme='dark'
      storageKey='columnly-theme'
    >
      <RouterProvider router={router} />
      <Toaster
        richColors={false}
        position='bottom-right'
      />
    </ThemeProvider>
  </StrictMode>,
);
