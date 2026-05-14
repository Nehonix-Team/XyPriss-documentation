export interface DocItem {
    title: string;
    href: string;
    items?: DocItem[];
}

export interface DocT {
    title: string;
    items: DocItem[];
}