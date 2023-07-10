const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '729iem',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://datamarket-test-public-lb-445418822.us-east-2.elb.amazonaws.com/'
  },
});
