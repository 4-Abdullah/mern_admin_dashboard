
import React from 'react';
import { TooltipProvider } from '../components/ui/tooltip';

export default function Providers({ children }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
