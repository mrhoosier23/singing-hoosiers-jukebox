import type { Metadata } from 'next';
import './globals.css';
import './contrast-fixes.css';

const siteUrl = 'https://mrhoosier23.github.io/singing-hoosiers-jukebox';
const faviconUrl = `${siteUrl}/favicon.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Singing Hoosiers Alumni Archive',
    template: '%s | Singing Hoosiers Alumni Archive',
  },
  description:
    'Listen across the decades, explore roadshows and photographs, search the song library, and help preserve the Singing Hoosiers story.',
  icons: {
    icon: [{ url: faviconUrl, type: 'image/png' }],
    shortcut: [{ url: faviconUrl, type: 'image/png' }],
    apple: [{ url: faviconUrl, type: 'image/png' }],
  },
  openGraph: {
    title: 'Singing Hoosiers Alumni Archive',
    description:
      'Listen across the decades and help preserve the sound, travels, photographs, and stories of the Singing Hoosiers.',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/social-card.png`,
        width: 1200,
        height: 630,
        alt: 'Singing Hoosiers Alumni Archive',
      },
    ],
  },
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
