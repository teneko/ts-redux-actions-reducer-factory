const path = require('path');
const DtsBundlePlugin = require("dts-bundle-webpack");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const PackageFile = require("./package.json");
const nodeExternals = require("webpack-node-externals");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = {
  mode: "development",
  entry: PackageFile.module,
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: ["babel-loader", "ts-loader"]
    },
    {
      test: /\.js$/,
      use: ["source-map-loader"],
      enforce: "pre"
    }
    ]
  },
  output: {
    filename: path.basename(PackageFile.main),
    path: path.resolve(__dirname, path.dirname(PackageFile.main)),
    library: ["ReduxActions", "ReducerFactory"],
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: [nodeExternals()],
  // externals: [nodeExternals({
  //   whitelist: /\.(?!(?:(d\.)?tsx?|json)$).{1,5}$/i
  // })],
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      "node_modules",
    ],
    extensions: ["js", ".ts", ".tsx", "d.ts"],
    // plugins: [new TsConfigPathsPlugin()]
  },
  plugins: [
    new DtsBundlePlugin({
      name: PackageFile.name,
      main: PackageFile.source,
      // prevents deleting <baseDir>/**/*.d.ts outside of <baseDir>
      baseDir: path.dirname(PackageFile.source),
      // absolute path to prevent the join of <baseDir> and <out>
      out: path.resolve(__dirname, PackageFile.types),
      removeSource: true,
      outputAsModuleFolder: true,
      emitOnNoIncludedFileNotFound: true,
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ]
};