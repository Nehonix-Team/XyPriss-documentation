export  interface DocT {
    title: string;
    items: ({
        title: string;
        href: string;
        items: {
            title: string;
            href: string;
        }[];
    } | {
        title: string;
        href: string;
        items?: undefined;
    })[];
}