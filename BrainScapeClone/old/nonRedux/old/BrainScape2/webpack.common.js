const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public", "js"),
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
};
