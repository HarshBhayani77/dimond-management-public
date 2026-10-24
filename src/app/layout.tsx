import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shreenathji Diamond Management ERP | Surat & Mumbai Enterprise Architecture',
  description:
    'Interactive enterprise product showcase for Shreenathji Diamond Management ERP. Built specifically for Surat manufacturing units and Mumbai BDB trading desks with 3-decimal carat precision, Kapan yield optimization, 5-point rough reconciliation, and double-entry accounting.',
  keywords: [
    'Diamond Management ERP',
    'Surat Diamond Manufacturing Software',
    'Bharat Diamond Bourse ERP',
    'Kapan Yield Tracking',
    'Rough Reconciliation Software',
    'Rapaport Less Pricing',
    'Diamond Accounting Software Gujarat',
  ],
  authors: [{ name: 'Shreenathji Diamond Software Engineering' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Shreenathji Diamond Management ERP | Enterprise Product Overview',
    description:
      'Interactive architecture showcase of Shreenathji Diamond ERP for Surat cutting factories and Mumbai trading houses.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-vault-950 text-slate-100 min-h-screen selection:bg-emerald-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
