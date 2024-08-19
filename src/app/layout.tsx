import React from 'react';
import "../styles/index.scss";
import {Metadata} from "next";
import {GoogleAnalytics} from '@next/third-parties/google'

export const metadata: Metadata = {
    title: {
        default: 'Truck Support | Your Trusted Source for Semi-Truck Towing, Repairs, Tires & Parts',
        template: `%s | Truck Support | Your Trusted Source for Semi-Truck Towing, Repairs, Tires & Parts`
    },
    description: '',
    keywords: ["Truck support", "Find Truck service", "Truck Parts", "Truck Directory", "Mobile truck service", "Truck Shop"],
    metadataBase: new URL('https://trucksupport.com/'),
    icons: {
        icon: [
            {
                rel: 'icon',
                type: 'image/png',
                url: '/images/icon-light.png',
                href: '/images/icon-light.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                rel: 'icon',
                type: 'image/png',
                url: '/images/icon-dark.png',
                href: '/images/icon-dark.png',
                media: '(prefers-color-scheme: dark)',
            },
        ],
    },
    openGraph: {
        title: 'Truck Support | Semi Towing, Truck Repair, Truck Tires, Truck Parts',
        description: '',
        url: 'https://trucksupport.com/',
        siteName: 'Truck Support',
        images: [
            {
                url: '',
                width: 800,
                height: 600,
            },
            {
                url: '',
                width: 1800,
                height: 1600,
                alt: 'My custom alt',
            },
        ],
        locale: 'en_US',
        type: 'website',
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <head>
            <meta name="keywords"
                  content="Truck Serivce near me, Truck Directory, Semi Truck wash, Mobile truck service, Semi Truck Station, Truck Shop"/>
            <meta name="description"
                  content="Truck Support is a nationwide truck service directory helping truckers find service with ease"/>
            <meta property="og:site_name" content="Truck Support"/>
            <meta property="og:url" content="https://trucksupport.com"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Truck Support"/>
            <meta name='og:image' content='/images/icon-dark.png'/>
            {/* For IE */}
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            {/* For Responsive Device */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            {/* For Window Tab Color */}
            {/* Chrome, Firefox OS and Opera */}
            <meta name="theme-color" content="#0D1A1C"/>
            {/* Windows Phone */}
            <meta name="msapplication-navbutton-color" content="#0D1A1C"/>
            {/* iOS Safari */}
            <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C"/>
            {/* Favicon */}
            <link id="dynamic-favicon" rel="icon" href="/images/icon-dark.png" sizes="any"/>
            {/* Default favicon */}
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap"/>
        </head>
        <body suppressHydrationWarning={true}>
        <GoogleAnalytics gaId="G-MNHKBP7E79"/>
        <div className="main-page-wrapper">
            {children}
        </div>
        </body>
        </html>
    )
}
