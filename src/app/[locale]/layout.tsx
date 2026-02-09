import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/server";
import { ChatWidget } from "@/components/ChatWidget";
import { CookieConsent } from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://trippa.online'),
  title: {
    template: '%s | Trippa',
    default: 'Trippa - De leukste uitjes met korting',
  },
  description: "Ontdek de leukste dagjes uit, sauna's en meer met hoge korting op Trippa.online",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Get Supabase User
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Trippa.online',
    url: 'https://trippa.online',
    logo: 'https://trippa.online/source-logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+31-85-401-05-89',
      contactType: 'customer service',
      areaServed: 'NL',
      availableLanguage: ['Dutch', 'English']
    },
    sameAs: [
      'https://www.facebook.com/tripper.nl/',
      'https://www.instagram.com/tripper.nl/',
      'https://www.tiktok.com/@tripper.nl'
    ]
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <ChatWidget />
          <Header user={user} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
