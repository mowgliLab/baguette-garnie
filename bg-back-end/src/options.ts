import fs = require('fs');

export class StorageConfig {

    private static readonly configPath = './src/config.json';
    public static parsed = JSON.parse(fs.readFileSync(StorageConfig.configPath, 'UTF-8'));

}
