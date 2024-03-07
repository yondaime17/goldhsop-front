// webpack.config.js
const path = require("path");

module.exports = {
  // ... other webpack configurations
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
