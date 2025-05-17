import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'Stéphanie Vanoverberghe - Portfolio',
    description: 'Front-end developer specialized in JavaScript and React',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-[#bddaee] text-[#003962] mx-2.5 md:mx-5 lg:mx-14 min-h-screen mb-2.5 =">
                {/* Font Awesome Kit */}
                <Script src="https://kit.fontawesome.com/e5228146fd.js" crossOrigin="anonymous" strategy="beforeInteractive" />
                <Header />
                <main className="w-full">{children}</main>
            </body>
        </html>
    );
}
