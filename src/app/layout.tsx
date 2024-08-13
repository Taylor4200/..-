'use client'
import React, { useEffect } from 'react'; // Import React and useEffect
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/Bim4Theme";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    const isDev = process.env.NODE_ENV === 'development';

    // Function to set favicon based on color scheme
    function setFavicon() {
        const faviconLight = '/images/icon-light.png'; // Used for dark mode
        const faviconDark = '/images/icon-dark.png';  // Used for light mode
        const favicon = document.getElementById('dynamic-favicon') as HTMLLinkElement;

        if (!favicon) return;

        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        favicon.href = isDarkMode ? `${faviconLight}?v=${new Date().getTime()}` : `${faviconDark}?v=${new Date().getTime()}`;
    }

    // Set favicon on load and listen for changes
    useEffect(() => {
        setFavicon();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', setFavicon);
        return () => mediaQuery.removeEventListener('change', setFavicon);
    }, []);

    return (
        <html lang="en" suppressHydrationWarning={isDev}>
        <head>
            <meta name="keywords" content="Truck Serivce near me, Truck Directory, Semi Truck wash, Mobile truck service, Semi Truck Station, Truck Shop" />
            <meta name="description" content="Truck Support is a nationwide truck service directory helping truckers find service with ease" />
            <meta property="og:site_name" content="Truck Support" />
            <meta property="og:url" content="https://trucksupport.com" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Truck Support" />
            <meta name='og:image' content='/images/icon-dark.png' />
            {/* For IE */}
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            {/* For Responsive Device */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* For Window Tab Color */}
            {/* Chrome, Firefox OS and Opera */}
            <meta name="theme-color" content="#0D1A1C" />
            {/* Windows Phone */}
            <meta name="msapplication-navbutton-color" content="#0D1A1C" />
            {/* iOS Safari */}
            <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
            {/* Favicon */}
            <link id="dynamic-favicon" rel="icon" href="/images/icon-dark.png" sizes="any" /> {/* Default favicon */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" />
        </head>
        <body suppressHydrationWarning={true}>
        <div className="main-page-wrapper">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                    {children}
                </Provider>
            </ThemeProvider>
        </div>
        </body>
        </html>
    )
}
