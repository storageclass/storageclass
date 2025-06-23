export interface PageMetadata {
    title?: string
    description?: string
    keywords?: string[]
}

export function setPageMetadata(metadata: PageMetadata) {
    if (metadata.title) {
        let titleTag = document.querySelector("title");
        if (!titleTag) {
            titleTag = document.createElement("title");
            document.head.appendChild(titleTag);
        }
        titleTag.innerText = metadata.title;
    }

    if (metadata.description) {
        let metaTag = document.querySelector("meta[name='description']");
        if (!metaTag) {
            metaTag = document.createElement("meta");
            metaTag.setAttribute("name", "description");
            metaTag.setAttribute("content", metadata.description);
            document.head.appendChild(metaTag);
        }
    }

    if (metadata.keywords) {
        let metaTag = document.querySelector("meta[name='keywords']");
        if (!metaTag) {
            metaTag = document.createElement("meta");
            metaTag.setAttribute("name", "keywords");
            metaTag.setAttribute("content", metadata.keywords.join(", "));
            document.head.appendChild(metaTag);
        }
    }
}