const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.js?version=[hash:8]',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.module\.s([ac])ss$/,
          use: [
            {
              loader: isDevelopment
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module.(s([ac])ss)$/,
          use: [
            {
              loader: isDevelopment
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.s([ac])ss$/,
          exclude: /\.module.(s([ac])ss)$/,
          use: [
            {
              loader: isDevelopment
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: 'file-loader',
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true,
        }),
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
      alias: {
        components: path.resolve(__dirname, 'src/components'),
      },
    },
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000,
    },
    devServer: {
      hot: true,
      publicPath: '/',
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].css?version=[hash:8]',
        chunkFilename: isDevelopment ? '[id].css' : '[id].css?version=[hash:8]',
      }),
      new CopyPlugin({
        patterns: [{ from: './public' }],
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
