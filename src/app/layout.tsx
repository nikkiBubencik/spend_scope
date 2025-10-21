import './globals.css';
import LayoutShell from '@/components/LayoutShell/LayoutShell';
import React, { ReactNode } from 'react';

export const metadata = {
  title: 'SpendScope',
  description: 'A personal finance dashboard',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="layout">

          <LayoutShell>
            {children}
          </LayoutShell>
        </div>
      </body>
    </html>
  );
}
