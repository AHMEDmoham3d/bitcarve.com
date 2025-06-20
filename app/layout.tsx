import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Bitcarve - Professional Web Development & Design',
  description: 'Global technology company specializing in professional web development, UI/UX design, and digital solutions for businesses worldwide.',
  keywords: 'web development, web design, UI/UX, landing pages, website maintenance, professional websites',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable}`}>{children}</body>
    </html>
  );
}