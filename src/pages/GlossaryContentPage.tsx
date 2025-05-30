import React, {ReactNode, useEffect, useState} from "react";
import {marked} from "marked";
import parse from "html-react-parser";
import {useParams} from "react-router-dom";

const GlossaryIndexPage: React.FC = () => {

    const params = useParams();
    const [pageContent, setPageContent] = useState<ReactNode[]>();

    const loadPage = async (): Promise<void> => {
        const file = params.file as string;
        const response = await fetch(`/glossary/${file}.md`);
        const markdownText = await response.text();
        const content = await marked(markdownText);
        const elements = parse(content) as never as ReactNode[];
        setPageContent(elements);
    }

    useEffect(() => {
        loadPage();
    }, [loadPage]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
                <div className="markdown-body bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 text-gray-600 dark:text-gray-300">
                    {pageContent}
                </div>
            </div>
        </div>
    );
}

export default GlossaryIndexPage;