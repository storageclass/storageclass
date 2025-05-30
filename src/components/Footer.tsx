import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                        StorageClass.info - A comprehensive listing of CSI drivers for Kubernetes
                    </p>
                    <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0">
                        Sponsored by <a href="https://simplyblock.io" target="_blank" rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">simplyblock.io</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;