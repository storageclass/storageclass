import {load} from 'js-yaml';
import {Driver} from '../types';

export const loadDrivers = async (): Promise<Driver[]> => {
    try {
        const response = await fetch('/drivers.yaml');
        const yamlText = await response.text();
        const content = load(yamlText) as { drivers: Driver[] };
        const drivers = content.drivers;

        // Ensure drivers is an array before proceeding
        if (!Array.isArray(drivers)) {
            console.warn('Loaded drivers data is not an array, returning empty array');
            return [];
        }

        for (const driver of drivers) {
            if (!driver.capabilities.block &&
                !driver.capabilities.file &&
                !driver.capabilities.object) {
                driver.capabilities.block = true;
            }
        }

        return drivers;
    } catch (error) {
        console.error('Error loading drivers:', error);
        return [];
    }
};