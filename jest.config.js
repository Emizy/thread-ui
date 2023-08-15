// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        '^axios$': require.resolve('axios'),

    },
    transformIgnorePatterns: ['/node_modules/(?!(axios|antd)/)'],
    moduleDirectories: ["node_modules", "src"],
    verbose: true,
    transform: {
        "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest"
    },
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts', "js", "jsx", "ts", "tsx"],
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
}