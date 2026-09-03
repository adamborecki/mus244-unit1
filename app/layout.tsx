import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MUS 244 Unit 1',
  description: 'Slides and optional learning resources for MUS 244 Unit 1.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
