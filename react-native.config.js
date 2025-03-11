const path = require('path');

module.exports = {
  project: {
    android: {
      packageName: "com.mukesh63.Plantify",
    },
  },
  // Explicitly specify the project root so that when the CLI runs commands from a subfolder,
  // it still finds package.json and the config file.
  projectRoot: path.resolve(__dirname),
};
