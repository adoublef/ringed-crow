import { Component } from "@kitajs/html";

const api =
    "https://assets.adoublef.dev";

export const Base: Component<{ head: HeadProps; }> = ({
    head: { title },
    children
}) => (
    <html lang="en">

        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
            {/* @ts-expect-error as is valid */}
            <link rel="preload" as="font" href={`${api}/fonts/v/space_grotesk.woff2`} type="font/woff2" />
            {/* @ts-expect-error as is valid */}
            <link rel="preload" as="font" href={`${api}/fonts/v/lexend.woff2`} type="font/woff2" />
            {/* @ts-expect-error as is valid */}
            <link rel="preload" as="script" href={`${api}/scripts/htmx.min.js`} />
            {/* @ts-expect-error as is valid */}
            <link rel="preload" as="script" href={`${api}/scripts/hyperscript.min.js`} />
            <link rel="stylesheet" href={`${api}/stylesheets/index.css`} />
            <script src={`${api}/scripts/htmx.min.js`} defer></script>
            <script src={`${api}/scripts/hyperscript.min.js`} defer></script>
        </head>

        <body hx-boost="true">{children}</body>

    </html>
);

export type HeadProps = {
    /**
     * 
     * The <title> HTML element defines the document's title that is 
     * shown in a browser's title bar or a page's tab. It only contains 
     * text; tags within the element are ignored.
     * 
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)
     */
    title: string;
};
