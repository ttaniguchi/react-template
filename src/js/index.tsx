import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/js/components/main';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
