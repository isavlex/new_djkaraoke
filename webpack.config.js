const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const fs = require('fs')
const CopyPlugin = require('copy-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`)


const PATHS = {
  root: path.join(__dirname, './'),
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ]
  // if (isDev) {
  //   loaders.push('eslint-loader')
  // }
  return loaders
}

const optimization = () => {
  const config = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith('.pug'))

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', `./src/static/js/main.js`],
  output: {
    filename: filename('js'),
    path: PATHS.dist,
  },
  optimization: optimization(),
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': PATHS.src,
      '@core': `${PATHS.src}/core`,
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: './dist',
  },

  plugins: [
    new CleanWebpackPlugin(),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        })
    ),
    new CopyPlugin({
      patterns: [
        { from: `${PATHS.src}/static/img`, to: `${PATHS.assets}img` },
        { from: `${PATHS.src}/icons/`, to: `${PATHS.assets}img/icons` },
        { from: `${PATHS.src}/static/seo/`, to: `` },
        { from: `${PATHS.root}/mail.php`, to: `` },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
}
