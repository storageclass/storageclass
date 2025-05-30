import React from 'react';
import {Search, X} from 'lucide-react';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({searchQuery, setSearchQuery}) => {
    return (
        <div className="relative w-full mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400"/>
            </div>

            <input
                type="text"
                className="block w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder-gray-400"
                placeholder="Search drivers by name, provider, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
                <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                >
                    <X className="h-5 w-5"/>
                </button>
            )}
        </div>
    );
};

export default SearchBar;