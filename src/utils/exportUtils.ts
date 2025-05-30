import {Driver} from '../types';

// Export filtered drivers as CSV
export const exportToCSV = (drivers: Driver[]): void => {
    // Create CSV headers
    const headers = [
        'Name',
        'Driver Class',
        'Description',
        'Persistent',
        'Ephemeral',
        'ReadOnlyMany',
        'ReadWriteOnce',
        'ReadWriteMany',
        'ReadWriteOncePod',
        'Dynamic',
        'Snapshot',
        'Raw',
        'Expansion',
        'Clone',
        'Topology',
        'Tracking',
        'File',
        'Object',
        'Block',
        'Deprecated',
        'Link',
        'Documentation'
    ].join(',');

    // Convert each driver to a CSV row
    const csvRows = drivers.map(driver => {
        const values = [
            `"${driver.name.replace(/"/g, '""')}"`,
            `"${driver.driverClass.replace(/"/g, '""')}"`,
            `"${driver.description.replace(/"/g, '""')}"`,
            driver.lifecycleModes.persistent ? 'Yes' : 'No',
            driver.lifecycleModes.ephemeral ? 'Yes' : 'No',
            driver.accessModes.readOnlyMany ? 'Yes' : 'No',
            driver.accessModes.readWriteOnce ? 'Yes' : 'No',
            driver.accessModes.readWriteMany ? 'Yes' : 'No',
            driver.accessModes.readWriteOncePod ? 'Yes' : 'No',
            driver.capabilities.dynamic ? 'Yes' : 'No',
            driver.capabilities.snapshot ? 'Yes' : 'No',
            driver.capabilities.raw ? 'Yes' : 'No',
            driver.capabilities.expansion ? 'Yes' : 'No',
            driver.capabilities.clone ? 'Yes' : 'No',
            driver.capabilities.topology ? 'Yes' : 'No',
            driver.capabilities.tracking ? 'Yes' : 'No',
            driver.capabilities.file ? 'Yes' : 'No',
            driver.capabilities.object ? 'Yes' : 'No',
            driver.capabilities.block ? 'Yes' : 'No',
            driver.deprecated ? 'Yes' : 'No',
            `"${driver.link}"`,
            driver.docsLink ? `"${driver.docsLink}"` : ''
        ].join(',');

        return values;
    });

    // Combine headers and rows
    const csvContent = [headers, ...csvRows].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'csi-drivers.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Export filtered drivers as JSON
export const exportToJSON = (drivers: Driver[]): void => {
    const jsonContent = JSON.stringify(drivers, null, 2);
    const blob = new Blob([jsonContent], {type: 'application/json;charset=utf-8;'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'csi-drivers.json');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};