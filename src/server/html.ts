import { readFileSync, existsSync } from 'fs';

interface HtmlProps {
    path: string;
    themePlaceholder: 'dark' | 'light';
    localePlaceholder: 'en' | 'ru' | string;
}

const replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(find, 'g'), replace);

export const html = ({ themePlaceholder = 'dark', localePlaceholder = 'en', path }: HtmlProps) => {
    if (!existsSync(path)) throw new Error(`File ${path} does not exist`);
    let htmlString = readFileSync(path, 'utf-8');

    htmlString = replaceAll(htmlString, 'themePlaceholder', themePlaceholder);
    htmlString = replaceAll(htmlString, 'localePlaceholder', localePlaceholder);

    return htmlString;
};
