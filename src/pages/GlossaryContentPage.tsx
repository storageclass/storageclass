import React, {ReactNode, useEffect, useState} from "react";
import {marked} from "marked";
import parse from "html-react-parser";
import {useParams} from "react-router-dom";
import fm from "front-matter";
import {setPageMetadata} from "../utils/metadataUtils.js";

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

            setPageMetadata({
                title: parsed.attributes.title,
                description: parsed.attributes.description,
                keywords: parsed.attributes.keywords,
            });
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