export interface Driver {
    name: string;
    link: string;
    docsLink?: string;
    driverClass: string;
    description: string;
    deprecated?: boolean;
    lifecycleModes: {
        persistent?: boolean;
        ephemeral?: boolean;
    };
    accessModes: {
        readOnlyMany?: boolean;
        readWriteOnce?: boolean;
        readWriteMany?: boolean;
        readWriteOncePod?: boolean;
    };
    capabilities: {
        dynamic?: boolean;
        snapshot?: boolean;
        raw?: boolean;
        expansion?: boolean;
        clone?: boolean;
        topology?: boolean;
        tracking?: boolean;
        file?: boolean;
        object?: boolean;
        block?: boolean;
        qos?: boolean;
        nvmeof?: boolean;
        iscsi?: boolean;
    };
}

export interface FilterState {
    search: string;
    storageTypes: {
        block: boolean;
        file: boolean;
        object: boolean;
    };
    lifecycleModes: {
        persistent: boolean;
        ephemeral: boolean;
    };
    accessModes: {
        readOnlyMany: boolean;
        readWriteOnce: boolean;
        readWriteMany: boolean;
        readWriteOncePod: boolean;
    };
    capabilities: {
        dynamic: boolean;
        snapshot: boolean;
        raw: boolean;
        expansion: boolean;
        clone: boolean;
        topology: boolean;
        tracking: boolean;
        qos: boolean;
        nvmeof: boolean;
        iscsi: boolean;
    };
    showDeprecated: boolean;
}