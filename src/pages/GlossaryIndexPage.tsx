import React, {useEffect, useState} from "react";
import {load} from "js-yaml";
import {NavLink} from "react-router-dom";
import {setPageMetadata} from "../utils/metadataUtils.js";

interface Page {
    file: string
    title: string
}

const GlossaryIndexPage: React.FC = () => {
    const [pages, setPages] = useState<Page[]>([])

    const loadPages = async (): Promise<void> => {
        const response = await fetch("/glossary/index.yaml");
        const yamlText = await response.text();
        const content = load(yamlText) as { pages: Page[] };
        content.pages = content.pages.sort((a: Page, b: Page) => a.title.localeCompare(b.title));
        setPages(content.pages);
    }

    useEffect(() => {
        loadPages();
    }, []);

    setPageMetadata({
        title: "StorageClass.info Glossary",
        description: "Find explanations and guides around the most important terms for Kubernetes storage and the CSI (Container Storage Interface)."
    });

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Glossary Index
            </h1>
            <div className="prose dark:prose-invert max-w-none">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Topics</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Find all topics around the Kubernetes Container Storage Interface (CSI) in the glossary.
                    </p>
                    <ul className="text-gray-600 dark:text-gray-300 mb-4">
                        {pages.map((page) => (
                            <li key={page.file}>→&nbsp;
                                <NavLink to={'/glossary/' + page.file.replace(".md", "")}>
                                    {page.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default GlossaryIndexPage;