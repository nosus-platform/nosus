import { readFileSync, existsSync } from 'fs';

interface HtmlProps {
    path: string;
    themePlaceholder: 'dark' | 'light';
}

const replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(find, 'g'), replace);

export const html = ({ themePlaceholder = 'dark', path }: HtmlProps) => {
    if (!existsSync(path)) throw new Error(`File ${path} does not exist`);

    return replaceAll(readFileSync(path, 'utf-8'), 'themePlaceholder', themePlaceholder);
};
