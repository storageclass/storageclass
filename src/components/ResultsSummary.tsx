import React from 'react';

interface ResultsSummaryProps {
    totalDrivers: number;
    filteredDriversCount: number;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({totalDrivers, filteredDriversCount}) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
                Showing <span className="font-semibold">{filteredDriversCount}</span>{' '}
                of <span className="font-semibold">{totalDrivers}</span> CSI drivers
            </p>
        </div>
    );
};

export default ResultsSummary;