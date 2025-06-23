import React from 'react';
import {setPageMetadata} from "../utils/metadataUtils.js";

const SponsorsPage: React.FC = () => {
    setPageMetadata({
        title: "Storageclass.info Sponsors",
        description: "Thank you to Simplyblock for sponsoring the domain and webspace for storageclass.info."
    })

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Our Sponsors
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
                StorageClass.info is made possible thanks to our generous sponsors who support the Kubernetes storage
                community.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Gold Sponsor
                    </h2>
                    <a
                        href="https://simplyblock.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <img
                            src="simplyblock-logo-blue.svg"
                            alt="simplyblock.io logo"
                            className="h-16 mx-auto mb-4"
                        />
                    </a>
                    <p className="text-gray-600 dark:text-gray-300">
                        Simplyblock provides disaggregated high-performance block storage for Kubernetes utilizing NVMe
                        over TCP
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Become a Sponsor
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                    Support the Kubernetes storage community and gain visibility among developers and operations teams.
                </p>
                <div className="text-center">
                    <a
                        href="mailto:sponsor@storageclass.info"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Contact Us About Sponsorship
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SponsorsPage;