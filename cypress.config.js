const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'sv4wew',
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    "chromeWebSecurity": false,
    "experimentalModifyObstructiveThirdPartyCode": true,
  },
});