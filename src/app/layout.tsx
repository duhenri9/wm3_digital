import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingElements } from '@/components/ui/floating-elements';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <body className={`${inter.variable} font-sans antialiased relative`} suppressHydrationWarning>
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
