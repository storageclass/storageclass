import React, {ReactNode, useEffect, useState} from "react";
import {marked} from "marked";
import parse from "html-react-parser";
import {useParams} from "react-router-dom";
import fm from "front-matter";

interface MarkdownFrontmatterProps {
    title?: string;
    description?: string;
    keywords?: string[];
}

const GlossaryIndexPage: React.FC = () => {

    const params = useParams();
    const [pageContent, setPageContent] = useState<ReactNode[]>();

    useEffect(() => {
        const loadPage = async (): Promise<void> => {
            const file = params.file as string;
            const response = await fetch(`/glossary/${file}.md`);
            const content = await response.text();
            const parsed = fm<MarkdownFrontmatterProps>(content);
            const markdown = await marked(parsed.body);
            const elements = parse(markdown) as never as ReactNode[];
            setPageContent(elements);

            const metaTitle = parsed.attributes.title;
            if (metaTitle) {
                let titleTag = document.querySelector("title");
                if (!titleTag) {
                    titleTag = document.createElement("title");
                    document.head.appendChild(titleTag);
                }
                titleTag.innerText = metaTitle;
            }

            const metaDescription = parsed.attributes.description;
            if (metaDescription) {
                let metaTag = document.querySelector("meta[name='description']");
                if (!metaTag) {
                    metaTag = document.createElement("meta");
                    metaTag.setAttribute("name", "description");
                    metaTag.setAttribute("content", metaDescription);
                    document.head.appendChild(metaTag);
                }
            }

            const metaKeywords = parsed.attributes.keywords;
            if (metaKeywords) {
                let metaTag = document.querySelector("meta[name='keywords']");
                if (!metaTag) {
                    metaTag = document.createElement("meta");
                    metaTag.setAttribute("name", "keywords");
                    metaTag.setAttribute("content", metaKeywords.join(", "));
                }
            }
        }
        loadPage();
    }, [params.file]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
                <div
                    className="markdown-body bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 text-gray-600 dark:text-gray-300">
                    {pageContent}
                </div>
            </div>
        </div>
    );
}

export default GlossaryIndexPage;