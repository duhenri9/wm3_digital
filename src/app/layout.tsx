import type { Metadata } from 'next';
// import { Acumin } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingElements } from '@/components/ui/floating-elements';
import './globals.css';

export const metadata: Metadata = {
  title: 'WM3 Digital - Inovação e Tecnologia',
  description: 'Transforme seu negócio com soluções digitais inovadoras. Especialistas em SaaS, automação e marketing digital.',
  icons: {
    icon: '/wm3-icon.png',
    shortcut: '/wm3-icon.png',
    apple: '/wm3-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased relative" suppressHydrationWarning>
        <FloatingElements />
        <Header />
        <div className="relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
