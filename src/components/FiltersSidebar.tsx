import React from 'react';
import {FilterState} from '../types';
import {ChevronDown, Filter} from 'lucide-react';

interface FiltersSidebarProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    resetFilters: () => void;
    isMobile: boolean;
    isVisible: boolean;
    toggleFilters: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
                                                           filters,
                                                           setFilters,
                                                           resetFilters,
                                                           isMobile,
                                                           isVisible,
                                                           toggleFilters
                                                       }) => {
    const [expandedSections, setExpandedSections] = React.useState({
        storageTypes: true,
        capabilities: true,
        accessModes: true,
        lifecycleModes: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    const updateStorageType = (type: keyof FilterState['storageTypes']) => {
        setFilters({
            ...filters,
            storageTypes: {
                ...filters.storageTypes,
                [type]: !filters.storageTypes[type],
            },
        });
    };

    const updateLifecycleMode = (mode: keyof FilterState['lifecycleModes']) => {
        setFilters({
            ...filters,
            lifecycleModes: {
                ...filters.lifecycleModes,
                [mode]: !filters.lifecycleModes[mode],
            },
        });
    };

    const updateAccessMode = (mode: keyof FilterState['accessModes']) => {
        setFilters({
            ...filters,
            accessModes: {
                ...filters.accessModes,
                [mode]: !filters.accessModes[mode],
            },
        });
    };

    const updateCapability = (capability: keyof FilterState['capabilities']) => {
        setFilters({
            ...filters,
            capabilities: {
                ...filters.capabilities,
                [capability]: !filters.capabilities[capability],
            },
        });
    };

    const updateShowDeprecated = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            showDeprecated: e.target.checked,
        });
    };

    // Format labels for display
    const formatLabel = (key: string): string => {
        // Special cases
        if (key === 'readWriteOncePod') return 'ReadWriteOncePod';
        if (key === 'nvmeof') return 'NVMe-oF';
        if (key === 'qos') return 'QoS';
        if (key === 'iscsi') return 'iSCSI';

        // Convert camelCase to Title Case with spaces
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <>
            {isMobile && (
                <div className="w-full py-2 px-4 mb-4">
                    <button
                        onClick={toggleFilters}
                        className="flex items-center justify-between w-full p-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm"
                    >
                        <div className="flex items-center">
                            <Filter className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400"/>
                            <span className="text-gray-700 dark:text-gray-300">Filters</span>
                        </div>
                        <ChevronDown
                            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${isVisible ? 'transform rotate-180' : ''}`}/>
                    </button>
                </div>
            )}

            <div
                className={`${
                    isMobile
                        ? isVisible
                            ? 'block p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md mb-4'
                            : 'hidden'
                        : 'sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto w-64 p-4 bg-white dark:bg-gray-800 border-r dark:border-gray-700'
                } transition-all duration-200`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filters</h2>
                    <button
                        onClick={resetFilters}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                        Reset
                    </button>
                </div>

                {/* Storage Types */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('storageTypes')}
                        className="flex items-center justify-between w-full text-left mb-2"
                    >
                        <h3 className="font-medium text-gray-800 dark:text-white">Storage Types</h3>
                        <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform ${expandedSections.storageTypes ? 'transform rotate-180' : ''}`}/>
                    </button>

                    {expandedSections.storageTypes && (
                        <div className="space-y-2 pl-1">
                            {Object.keys(filters.storageTypes).map((type) => (
                                <label key={type}
                                       className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={filters.storageTypes[type as keyof FilterState['storageTypes']]}
                                        onChange={() => updateStorageType(type as keyof FilterState['storageTypes'])}
                                        className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                    />
                                    <span>{formatLabel(type)}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Capabilities */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('capabilities')}
                        className="flex items-center justify-between w-full text-left mb-2"
                    >
                        <h3 className="font-medium text-gray-800 dark:text-white">Capabilities</h3>
                        <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform ${expandedSections.capabilities ? 'transform rotate-180' : ''}`}/>
                    </button>

                    {expandedSections.capabilities && (
                        <div className="space-y-2 pl-1">
                            {Object.keys(filters.capabilities).map((capability) => (
                                <label key={capability}
                                       className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={filters.capabilities[capability as keyof FilterState['capabilities']]}
                                        onChange={() => updateCapability(capability as keyof FilterState['capabilities'])}
                                        className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                    />
                                    <span>{formatLabel(capability)}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Access Modes */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('accessModes')}
                        className="flex items-center justify-between w-full text-left mb-2"
                    >
                        <h3 className="font-medium text-gray-800 dark:text-white">Access Modes</h3>
                        <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform ${expandedSections.accessModes ? 'transform rotate-180' : ''}`}/>
                    </button>

                    {expandedSections.accessModes && (
                        <div className="space-y-2 pl-1">
                            {Object.keys(filters.accessModes).map((mode) => (
                                <label key={mode}
                                       className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={filters.accessModes[mode as keyof FilterState['accessModes']]}
                                        onChange={() => updateAccessMode(mode as keyof FilterState['accessModes'])}
                                        className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                    />
                                    <span>{formatLabel(mode)}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Lifecycle Modes */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('lifecycleModes')}
                        className="flex items-center justify-between w-full text-left mb-2"
                    >
                        <h3 className="font-medium text-gray-800 dark:text-white">Lifecycle Modes</h3>
                        <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform ${expandedSections.lifecycleModes ? 'transform rotate-180' : ''}`}/>
                    </button>

                    {expandedSections.lifecycleModes && (
                        <div className="space-y-2 pl-1">
                            {Object.keys(filters.lifecycleModes).map((mode) => (
                                <label key={mode}
                                       className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={filters.lifecycleModes[mode as keyof FilterState['lifecycleModes']]}
                                        onChange={() => updateLifecycleMode(mode as keyof FilterState['lifecycleModes'])}
                                        className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                    />
                                    <span>{formatLabel(mode)}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Deprecated Filter */}
                <div>
                    <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <input
                            type="checkbox"
                            checked={filters.showDeprecated}
                            onChange={updateShowDeprecated}
                            className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                        <span>Show deprecated drivers</span>
                    </label>
                </div>
            </div>
        </>
    );
};

export default FiltersSidebar;