import React from 'react';
import {Driver} from '../types';
import {ExternalLink, ChevronRight, AlertTriangle} from 'lucide-react';

interface DriverCardProps {
    driver: Driver;
    onClick: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({driver, onClick}) => {
    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {driver.name}
                </h3>
                {driver.deprecated && (
                    <span
                        className="inline-flex items-center bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-amber-900 dark:text-amber-300">
            <AlertTriangle className="h-3 w-3 mr-1"/>
            Deprecated
          </span>
                )}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {driver.description}
            </p>

            <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-mono">
                {driver.driverClass}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
                {Object.entries(driver.capabilities).map(([key, value]) =>
                        value && (
                            <span
                                key={key}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                            >
              {key}
            </span>
                        )
                )}
            </div>

            <div className="flex justify-between items-center text-sm">
                <a
                    href={driver.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    Source <ExternalLink className="h-3 w-3 ml-1"/>
                </a>

                <button
                    className="text-gray-600 hover:text-gray-900 inline-flex items-center dark:text-gray-400 dark:hover:text-gray-200">
                    Details <ChevronRight className="h-4 w-4 ml-1"/>
                </button>
            </div>
        </div>
    );
};

export default DriverCard;