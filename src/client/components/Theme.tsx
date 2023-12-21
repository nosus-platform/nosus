import { ThemeProvider, useTheme } from 'next-themes';
import React, { useContext, useEffect } from 'react';

import { pageContext } from '../context/page';

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
        setTheme(syncTheme);
    }, [syncTheme]);

    return children;
};

export const Theme: React.FC<React.PropsWithChildren> = ({ children }) => (
    <ThemeProvider defaultTheme="dark">
        <ThemeSync>{children}</ThemeSync>
    </ThemeProvider>
);
