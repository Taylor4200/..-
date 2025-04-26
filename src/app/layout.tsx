import React from 'react';
import "../styles/index.scss";
import { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
    title: {
        default: 'Truck Support | Your Trusted Source for Semi-Truck Towing, Repairs, Tires & Parts',
        template: `%s | Truck Support | Your Trusted Source for Semi-Truck Towing, Repairs, Tires & Parts`,
    },
    description: 'Truck Support is a nationwide truck service directory helping truckers find service with ease.',
    keywords: [
        "Truck support", 
        "Find Truck service", 
        "Truck Parts", 
        "Truck Directory", 
        "Mobile truck service", 
        "Truck Stop"
    ],
    metadataBase: new URL('https://trucksupport.com/'),
    icons: {
        icon: [
            {
                rel: 'icon',
                type: 'image/png',
                url: '/images/icon-light.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                rel: 'icon',
                type: 'image/png',
                url: '/images/icon-dark.png',
                media: '(prefers-color-scheme: dark)',
            },
        ],
    },
    openGraph: {
        title: 'Truck Support | Semi Towing, Truck Repair, Truck Tires, Truck Parts',
        description: 'Truck Support helps truckers quickly find towing, repairs, tires, and parts services nationwide.',
        url: 'https://trucksupport.com/',
        siteName: 'Truck Support',
        images: [
            {
                url: '/images/og-image.png', // You should put a real OG image URL here
                width: 1200,
                height: 630,
                alt: 'Truck Support Logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                {/* SEO Meta Tags */}
                <meta name="keywords" content="Truck Service near me, Truck Directory, Semi Truck wash, Mobile truck service, Semi Truck Station, Truck Stop" />
                <meta name="description" content="Truck Support is a nationwide truck service directory helping truckers find service with ease" />
                <meta property="og:site_name" content="Truck Support" />
                <meta property="og:url" content="https://trucksupport.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Truck Support" />
                <meta property="og:description" content="Truck Support helps truckers quickly find towing, repairs, tires, and parts services nationwide." />
                <meta property="og:image" content="/images/og-image.png" />

                {/* Responsive Settings */}
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Browser Theming */}
                <meta name="theme-color" content="#0D1A1C" />
                <meta name="msapplication-navbutton-color" content="#0D1A1C" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />

                {/* Dynamic Favicons */}
                <link rel="icon" type="image/png" href="/images/icon-dark.png" media="(prefers-color-scheme: light)" />
                <link rel="icon" type="image/png" href="/images/icon-light.png" media="(prefers-color-scheme: dark)" />

                {/* Fonts */}
                <link 
                    rel="stylesheet" 
                    href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" 
                />
            </head>
            <body suppressHydrationWarning={true}>
                <GoogleAnalytics gaId="G-MNHKBP7E79" />
                <div className="main-page-wrapper">
                    {children}
                </div>
            </body>
        </html>
    );
}
