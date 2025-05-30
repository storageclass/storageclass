import React from 'react';
import {Driver} from '../types';
import {X, ExternalLink, Info, Check, AlertTriangle} from 'lucide-react';

interface DriverDetailModalProps {
    driver: Driver | null;
    onClose: () => void;
    isOpen: boolean;
}

const DriverDetailModal: React.FC<DriverDetailModalProps> = ({driver, onClose, isOpen}) => {
    if (!isOpen || !driver) return null;

    const renderBoolean = (value: boolean | undefined, label: string) => {
        return (
            <div className="flex items-center space-x-2">
                {value ? (
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400"/>
                ) : (
                    <X className="h-5 w-5 text-red-600 dark:text-red-400"/>
                )}
                <span className="text-gray-700 dark:text-gray-300">{label}</span>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div
                    className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{driver.name}</h2>
                        {driver.deprecated && (
                            <span
                                className="ml-3 inline-flex items-center bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-amber-900 dark:text-amber-300">
                <AlertTriangle className="h-3 w-3 mr-1"/>
                Deprecated
              </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X className="h-6 w-6"/>
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{driver.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <a
                                href={driver.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Source <ExternalLink className="h-4 w-4 ml-1.5"/>
                            </a>

                            {driver.docsLink && (
                                <a
                                    href={driver.docsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                >
                                    Documentation <Info className="h-4 w-4 ml-1.5"/>
                                </a>
                            )}
                        </div>

                        <div
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md font-mono text-sm text-gray-800 dark:text-gray-200 mb-6">
                            {driver.driverClass}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Lifecycle Modes</h3>
                            <div className="space-y-2">
                                {renderBoolean(driver.lifecycleModes.persistent, "Persistent")}
                                {renderBoolean(driver.lifecycleModes.ephemeral, "Ephemeral")}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Access Modes</h3>
                            <div className="space-y-2">
                                {renderBoolean(driver.accessModes.readOnlyMany, "ReadOnlyMany")}
                                {renderBoolean(driver.accessModes.readWriteOnce, "ReadWriteOnce")}
                                {renderBoolean(driver.accessModes.readWriteMany, "ReadWriteMany")}
                                {renderBoolean(driver.accessModes.readWriteOncePod, "ReadWriteOncePod")}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Capabilities</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(driver.capabilities).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    {value ? (
                                        <Check className="h-5 w-5 text-green-600 dark:text-green-400"/>
                                    ) : (
                                        <X className="h-5 w-5 text-red-600 dark:text-red-400"/>
                                    )}
                                    <span className="text-gray-700 dark:text-gray-300 capitalize">{key}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDetailModal;