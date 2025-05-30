import React from 'react';
import {SearchX} from 'lucide-react';

interface EmptyStateProps {
    onResetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({onResetFilters}) => {
    return (
        <div
            className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <SearchX className="h-16 w-16 text-gray-400 mb-4"/>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No CSI drivers found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                No drivers match your current filters. Try adjusting your search criteria.
            </p>
            <button
                onClick={onResetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default EmptyState;