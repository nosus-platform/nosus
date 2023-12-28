import React, { useContext, useEffect, useMemo } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';

import { PageContextProps, pageContext } from '../../context/page';

import './ThemeResolver.module.pcss';

const Theme: React.FC<React.PropsWithChildren> = ({ children }) => {
    const currentPageContext = useContext(pageContext);
    const { resolvedTheme, systemTheme, setTheme } = useTheme();
    const syncTheme = (currentPageContext?.user?.theme || resolvedTheme || 'dark') as 'light' | 'dark';
    const context = useMemo<PageContextProps>(
        () => ({
            ...currentPageContext,
            theme: syncTheme,
        }),
        [currentPageContext],
    );

    if (currentPageContext?.user?.theme && currentPageContext?.user?.theme !== systemTheme) {
        // TODO: add popup message with action buttons
        console.log(
            `Your theme(${currentPageContext?.user?.theme}) and system appereance are different(${systemTheme}). Do you want to Nosus follow it?`,
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

    return <pageContext.Provider value={context}>{children}</pageContext.Provider>;
};

export const ThemeResolver: React.FC<React.PropsWithChildren> = ({ children }) => (
    <ThemeProvider defaultTheme="dark">
        <Theme>{children}</Theme>
    </ThemeProvider>
);
