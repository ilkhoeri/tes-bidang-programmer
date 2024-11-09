'use client';

import { TooltipProvider } from '@/client/components/ui/tooltip';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
