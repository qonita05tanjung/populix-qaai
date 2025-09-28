export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
    
    specs: [
        'website/test/specs/**/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    maxInstances: 1,
    
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu'],
        }
    }],

   
    logLevel: 'error',
    
    bail: 0,
    
    waitforTimeout: 300000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec',['allure', {outputDir: 'allure-results'}]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 300000
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },


}
