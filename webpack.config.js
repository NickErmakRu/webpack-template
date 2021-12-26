/* eslint-disable no-undef */
const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

console.log(
  `mode: ${isDev ? "development" : isProd ? "production" : "undefined"}`
);

const getStyleLoaders = () => {
  return [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"];
};

const getPlugins = () => {
  const plugins = [
    new HTMLWebpackPlugin({
      title: "Template",
      buildTime: isDev ? `Build at ${new Date().toISOString()}` : undefined,
      template: "./public/index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public/clapperboard.ico"),
          to: path.resolve(__dirname, "dist/images"),
        },
      ],
    }),
  ];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "main-[contenthash:8].css",
      }),
      new BundleAnalyzerPlugin()
    );
  }

  if (isDev) {
    plugins.push(
      new ESLintPlugin({
        extensions: ["js", "jsx"],
      })
    );
  }

  return plugins;
};

// are you sure we need this
const optimization = () => {
  const config = {};

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
};

module.exports = {
  mode: isDev ? "development" : isProd && "production",
  entry: "./src/index.js",
  output: {
    filename: isProd ? "main-[contenthash:8].js" : undefined,
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: optimization(),
  devtool: isDev ? "source-map" : undefined,
  devServer: {
    port: 4200,
    open: true,
    hot: isDev,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // ======  IMAGES ======
      {
        test: /\.(png|jpg|jpeg|ico|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name]-[sha1:contenthash:7].[ext]",
            },
          },
        ],
      },
      // ====== STYLES / CSS ======
      {
        test: /\.(css)$/,
        use: getStyleLoaders(),
      },
      // ====== STYLES / SASS / SCSS ======
      {
        test: /\.(s[ca]ss)$/,
        use: [...getStyleLoaders(), "sass-loader"],
      },
    ],
  },
  plugins: getPlugins(),
};
