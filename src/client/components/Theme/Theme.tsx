import { ThemeProvider, useTheme } from 'next-themes';
import React, { useContext, useEffect } from 'react';

import { pageContext } from '../../context/page';

import './Theme.module.css';

const ThemeSync: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { user } = useContext(pageContext);
    const { resolvedTheme, systemTheme, setTheme } = useTheme();
    const syncTheme = user?.theme || resolvedTheme || 'dark';

    if (user?.theme && user?.theme !== systemTheme) {
        // TODO: add popup message with action buttons
        console.log(
            `Your theme(${user?.theme}) and system appereance are different(${systemTheme}). Do you want to Nosus follow it?`,
        );
    }

    useEffect(() => {
        // save css variables pass
        const currentHref = document?.getElementById?.('themeVariables')?.getAttribute('href')?.split('/');
        currentHref?.pop?.();
        currentHref?.push(`${syncTheme}.css`);
        const newHref = currentHref?.join('/');

        if (newHref) {
            document?.getElementById?.('themeVariables')?.setAttribute?.('href', newHref);
        }

        setTheme(syncTheme);
    }, [syncTheme]);

    return children;
};

export const Theme: React.FC<React.PropsWithChildren> = ({ children }) => (
    <ThemeProvider defaultTheme="dark">
        <ThemeSync>{children}</ThemeSync>
    </ThemeProvider>
);
