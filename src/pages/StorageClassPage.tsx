import React from 'react';
import {FileText, Settings, Database} from 'lucide-react';

const StorageClassPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                What is a StorageClass?
            </h1>

            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    A StorageClass in Kubernetes provides a way to describe the "classes" of storage offered by cluster
                    administrators. Different classes might map to quality-of-service levels, backup policies, or
                    arbitrary policies determined by the cluster administrators.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Dynamic
                            Provisioning</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            StorageClasses enable dynamic volume provisioning, allowing storage volumes to be created
                            on-demand.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Storage
                            Configuration</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Define parameters for storage like performance, replication, encryption, and more.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <Database className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Storage Management</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Simplify storage management by abstracting underlying storage provider details.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Concepts</h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Provisioner</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        The provisioner field determines what CSI volume plugin is used for provisioning PVs. This field
                        must be specified.
                    </p>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code className="text-gray-800 dark:text-gray-200">
              {`apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2`}
            </code>
          </pre>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Parameters</h2>
                <ul className="list-disc pl-6 mb-8 text-gray-600 dark:text-gray-300">
                    <li className="mb-2">
                        <strong className="text-gray-900 dark:text-white">type:</strong> Specifies the type of storage
                        (e.g., gp2, io1 for AWS EBS)
                    </li>
                    <li className="mb-2">
                        <strong className="text-gray-900 dark:text-white">reclaimPolicy:</strong> What happens to PVs
                        when released (Delete/Retain)
                    </li>
                    <li className="mb-2">
                        <strong className="text-gray-900 dark:text-white">volumeBindingMode:</strong> When volume
                        binding and dynamic provisioning should occur
                    </li>
                    <li className="mb-2">
                        <strong className="text-gray-900 dark:text-white">allowVolumeExpansion:</strong> Whether PVCs
                        can be expanded
                    </li>
                </ul>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Practices</h2>
                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                        <li className="mb-2">Define multiple storage classes for different use cases</li>
                        <li className="mb-2">Set appropriate default storage class</li>
                        <li className="mb-2">Consider cost implications of storage parameters</li>
                        <li className="mb-2">Document storage class capabilities and use cases</li>
                        <li>Regularly review and update storage classes based on needs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StorageClassPage;