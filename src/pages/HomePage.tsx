import React from 'react';
import {Link} from 'react-router-dom';
import {HardDrive, Database, Users, ExternalLink} from 'lucide-react';
import {setPageMetadata} from "../utils/metadataUtils.js";

const HomePage: React.FC = () => {
    setPageMetadata({
        title: "Find the Right CSI Driver | Compare Features and Support",
        description: "A central directory of CSI Drivers built for Kubernetes. Find drivers by feature, storage type, vendor, and compatibility with orchestration tools."
    })

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome to StorageClass.info
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                    Your comprehensive resource for Kubernetes Container Storage Interface (CSI) drivers
                </p>
                <Link
                    to="/drivers"
                    className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Browse CSI Drivers
                </Link>
            </div>

            <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Understanding CSI Drivers
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Container Storage Interface (CSI) is the standard for exposing arbitrary block and file storage
                        systems to containerized workloads on Container Orchestration Systems like Kubernetes.
                    </p>
                    <a
                        href="https://www.simplyblock.io/blog/kubernetes-csi-container-attached-storage-and-container-storage-interface/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Learn more about CSI and Container Attached Storage
                        <ExternalLink className="w-4 h-4 ml-1"/>
                    </a>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Link
                    to="/storage-class"
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <Database className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4"/>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        What is a StorageClass?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Learn about StorageClass and how it manages storage in Kubernetes
                    </p>
                </Link>

                <Link
                    to="/drivers"
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-blue-500"
                >
                    <HardDrive className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4"/>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        CSI Drivers Directory
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Browse our comprehensive list of CSI drivers for various storage solutions
                    </p>
                </Link>

                <Link
                    to="/sponsors"
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4"/>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Our Sponsors
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Meet the companies supporting StorageClass.info
                    </p>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        For Developers
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Find the right CSI driver for your storage needs with our comprehensive database and detailed
                        documentation.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        For Operations
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Compare features, capabilities, and compatibility across different CSI drivers to make informed
                        decisions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;