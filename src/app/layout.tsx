import './globals.css';
import LayoutShell from '@/components/LayoutShell/LayoutShell';

export const metadata = {
  title: 'SpendScope',
  description: 'A personal finance dashboard',
};

export default function RootLayout({ children }) {
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
