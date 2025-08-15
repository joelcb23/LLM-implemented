const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add `.gguf` to the list of asset extensions
config.resolver.assetExts.push("gguf");

module.exports = config;
