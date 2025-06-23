import React, {useState, useEffect} from 'react';
import {Driver, FilterState} from '../types';
import {loadDrivers} from '../data/drivers';
import SearchBar from '../components/SearchBar';
import FiltersSidebar from '../components/FiltersSidebar';
import DriverGrid from '../components/DriverGrid';
import DriverDetailModal from '../components/DriverDetailModal';
import EmptyState from '../components/EmptyState';
import ResultsSummary from '../components/ResultsSummary';
import {filterDrivers} from "../utils/filterUtils.ts";
import {setPageMetadata} from "../utils/metadataUtils.js";

const DriversPage: React.FC = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const initialFilterState: FilterState = {
        search: '',
        storageTypes: {
            block: false,
            file: false,
            object: false,
        },
        lifecycleModes: {
            persistent: false,
            ephemeral: false,
        },
        accessModes: {
            readOnlyMany: false,
            readWriteOnce: false,
            readWriteMany: false,
            readWriteOncePod: false,
        },
        capabilities: {
            dynamic: false,
            snapshot: false,
            raw: false,
            expansion: false,
            clone: false,
            topology: false,
            tracking: false,
            qos: false,
            nvmeof: false,
            iscsi: false,
        },
        showDeprecated: false,
    };

    const [filters, setFilters] = useState<FilterState>(initialFilterState);

    useEffect(() => {
        const fetchDrivers = async () => {
            const data = await loadDrivers();
            setDrivers(data);
            setFilteredDrivers(data);
        };

        fetchDrivers();

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setFilteredDrivers(filterDrivers(drivers, filters));
    }, [filters, drivers]);

    const resetFilters = () => {
        setFilters(initialFilterState);
    };

    const handleDriverSelect = (driver: Driver) => {
        setSelectedDriver(driver);
        setIsModalOpen(true);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    setPageMetadata({
        title: "CSI Driver List | Detailed Feature Overview for 150+ Plugins",
        description: "Full index of CSI Drivers by technical spec. Use filters to match storage type, lifecycle support, and orchestration requirements."
    });

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                CSI Drivers Directory
            </h1>
            <SearchBar
                searchQuery={filters.search}
                setSearchQuery={(query) => setFilters({...filters, search: query})}
            />

            <div className="flex flex-col md:flex-row gap-6">
                <FiltersSidebar
                    filters={filters}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                    isMobile={isMobile}
                    isVisible={isSidebarVisible}
                    toggleFilters={toggleSidebar}
                />

                <div className="flex-1">
                    <ResultsSummary
                        totalDrivers={drivers.length}
                        filteredDriversCount={filteredDrivers.length}
                    />

                    {filteredDrivers.length > 0 ? (
                        <DriverGrid
                            drivers={filteredDrivers}
                            onDriverSelect={handleDriverSelect}
                        />
                    ) : (
                        <EmptyState onResetFilters={resetFilters}/>
                    )}
                </div>
            </div>

            <DriverDetailModal
                driver={selectedDriver}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default DriversPage;