// jest.config.js
module.exports = {
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        '^axios$': require.resolve('axios'),

    },
    transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
    "allowJs": true,
}