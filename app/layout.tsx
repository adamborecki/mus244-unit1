import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MUS 244 Unit 1 | Sound in Space',
  description: 'A 3D-first learning site for acoustics and synthesis.',
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
