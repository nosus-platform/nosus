import { readFileSync, existsSync } from 'fs';

interface HtmlProps {
    path: string;
    themePlaceholder: 'dark' | 'light';
    localePlaceholder: 'en' | 'ru' | string;

    mountPathPlaceholer?: string;
}

const replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(find, 'g'), replace);

export const html = ({
    themePlaceholder = 'dark',
    localePlaceholder = 'en',
    path,
    mountPathPlaceholer = '',
}: HtmlProps) => {
    if (!existsSync(path)) throw new Error(`File ${path} does not exist`);

    let htmlString = readFileSync(path, 'utf-8');

    Object.entries({
        themePlaceholder,
        localePlaceholder,
        mountPathPlaceholer,
    }).forEach(([key, value]) => {
        htmlString = replaceAll(htmlString, key, value);
    });

    return htmlString;
};
