import {Driver, FilterState} from '../types';

// Check if a driver matches the current filter state
export const driverMatchesFilters = (driver: Driver, filters: FilterState): boolean => {
    // Check search query
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
            driver.name.toLowerCase().includes(searchLower) ||
            driver.description.toLowerCase().includes(searchLower) ||
            driver.driverClass.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
    }

    // Filter by storage types
    const storageTypesActive = Object.values(filters.storageTypes).some(Boolean);
    if (storageTypesActive) {
        if (!driver.capabilities) {
            return false;
        }
        if (
            !(filters.storageTypes.block && driver.capabilities.block) &&
            !(filters.storageTypes.file && driver.capabilities.file) &&
            !(filters.storageTypes.object && driver.capabilities.object)
        ) {
            return false;
        }
    }

    // Check deprecated
    if (!filters.showDeprecated && driver.deprecated) {
        return false;
    }

    // Check lifecycle modes
    const lifecycleFiltersActive = Object.values(filters.lifecycleModes).some(Boolean);
    if (lifecycleFiltersActive) {
        const matchesLifecycle = Object.entries(filters.lifecycleModes).some(
            ([mode, isActive]) => isActive && driver.lifecycleModes && driver.lifecycleModes[mode as keyof typeof driver.lifecycleModes]
        );

        if (!matchesLifecycle) return false;
    }

    // Check access modes (and)
    const accessFiltersActive = Object.values(filters.accessModes).some(Boolean);
    if (accessFiltersActive) {
        const requiredAccessModes = Object.entries(filters.accessModes)
            .filter(accessMode => accessMode[1])
            .map(accessMode => accessMode[0] as keyof typeof driver.accessModes);

        if (requiredAccessModes.find(
            accessMode => driver.accessModes && !driver.accessModes[accessMode])) {
            return false;
        }
    }

    // Check capabilities (and)
    const capabilitiesFiltersActive = Object.values(filters.capabilities).some(Boolean);
    if (capabilitiesFiltersActive) {
        const requiredCapabilities = Object.entries(filters.capabilities)
            .filter(capability => capability[1])
            .map(capability => capability[0] as keyof typeof driver.capabilities);

        if (requiredCapabilities.find(
            capability => driver.capabilities && !driver.capabilities[capability])) {
            return false;
        }
    }

    return true;
};

// Filter an array of drivers based on the current filter state
export const filterDrivers = (drivers: Driver[], filters: FilterState): Driver[] => {
    return drivers.filter(driver => driverMatchesFilters(driver, filters));
};