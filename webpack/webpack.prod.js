const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: path.resolve(__dirname, './loaders/omitLines.js'),
                },
            },
        ],
    },
});
