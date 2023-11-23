import path from "path";
import rspack from "@rspack/core";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_PATH = path.resolve(__dirname, "../");
const CLIENT_PATH = path.resolve(__dirname, "../", "src");

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  entry: path.join(CLIENT_PATH, "index.tsx"),
  target: "web",
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  watchOptions: {
    ignored: /node_modules/,
  },
  experiments: {
    rspackFuture: {
      disableTransformByDefault: true,
    },
  },
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        include: [CLIENT_PATH],
        use: {
          loader: "swc-loader",
          options: {
            env: {
              targets: "> 1%, not dead",
              mode: "usage",
              coreJs: "2.6.11",
            },
            sourceMap: true,
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
                decorators: true,
                dynamicImport: true,
              },
              transform: {
                react: {
                  development: true,
                  refresh: true,
                },
              },
              loose: true,
            },
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|pdf)$/,
        include: [CLIENT_PATH, path.join(ROOT_PATH, "node_modules")],
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [CLIENT_PATH, path.join(ROOT_PATH, "node_modules")],
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-plugin-px2rem",
                    {
                      rootValue: 100,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: [CLIENT_PATH, path.join(ROOT_PATH, "node_modules")],
        use: [
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {},
              },
            },
          },
        ],
        type: "css",
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    // fallback: { url: require.resolve("url/") },
    extensions: [
      ".tsx",
      ".ts",
      ".js",
      ".jsx",
      ".json",
      ".png",
      ".svg",
      ".jpg",
      ".jpeg",
      ".woff",
      ".woff2",
      ".ttf",
      // '.eot',
      // '.otf',
      ".pdf",
      ".docx",
    ],
    alias: {
      "@src": CLIENT_PATH,
    },
  },
  plugins: [
    new rspack.DefinePlugin({
      "process.env.NODE_ENV": process.env.NODE_ENV,
    }),
    new HtmlWebpackPlugin({
      title: "test title",
      inject: "body",
      filename: "index.html",
      template: path.join(CLIENT_PATH, "index.html"),
    }),
    new rspack.ProvidePlugin({
      // process: [require.resolve("process/browser")],
    }),
    new ReactRefreshPlugin({
      library: "bo",
    }),
    new rspack.ProgressPlugin(),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: "/",
      rewrites: [{ from: /./, to: "/index.html" }],
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    client: {
      overlay: false,
    },
  },
};

export default config;
