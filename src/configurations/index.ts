import nconf from 'nconf';
import * as path from 'path';

export interface IServerConfigurations {
    clusterName?: string;
    port: number;
    path?: string;
    proxyHeader?: string;
    build?: string;
    mocks?: boolean;
}

const ENV_OVERRIDES = {
    CLUSTER_NAME: 'clusterName',
    BUILD_DISPLAY_NAME: 'build',
    APP_PORT: 'port',
    APP_PATH: 'path',
    APP_MOCKS: 'mocks'
};

class ConfigHelper {
    provider = new nconf.Provider();

    constructor() {
        this.provider.env({
            whitelist: Object.values(ENV_OVERRIDES),
            transform: (obj: any) => {
                if (ENV_OVERRIDES[obj.key]) {
                    obj.key = ENV_OVERRIDES[obj.key];
                }
                return obj;
            }
        });

        this.provider.file('server', path.join(__dirname, `./config.${process.env.CLUSTER_NAME || 'default'}.json`));
        this.provider.file('default', path.join(__dirname, `./config.default.json`));
    }

    config() {
        return this.provider;
    }
}

export const Config = new ConfigHelper();
