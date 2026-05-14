import { StrictMode } from 'react';
import { RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider';
import router from '@/routes';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
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
    </TooltipProvider>
  </StrictMode>,
);
