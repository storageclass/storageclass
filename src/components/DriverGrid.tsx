import React from 'react';
import {Driver} from '../types';
import DriverCard from './DriverCard';

interface DriverGridProps {
    drivers: Driver[];
    onDriverSelect: (driver: Driver) => void;
}

const driverKey = (driver: Driver): string => {
    const name = driver.name.toLocaleLowerCase();
    return name.replace(/[^a-zA-Z0-9]/g, "_");
}

const DriverGrid: React.FC<DriverGridProps> = ({drivers, onDriverSelect}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((driver) => (
                <DriverCard
                    key={driverKey(driver)}
                    driver={driver}
                    onClick={() => onDriverSelect(driver)}
                />
            ))}
        </div>
    );
};

export default DriverGrid;