
import { DreamProvider } from '@/context/DreamContext';

// global styles
import './globals.css'

// font
import { DM_Sans } from 'next/font/google'

// font awesome
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const dmSans = DM_Sans({
  weight: "400",
  subsets: ['latin'],
});

export const metadata = {
  title: 'Slumberjack',
  description: 'Dream logging, tracking and interpretation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DreamProvider>
      <html lang="en">
        <body className={dmSans.className}>{children}</body>
      </html>
    </DreamProvider>
  )
}
