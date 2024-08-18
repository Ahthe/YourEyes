/** @type {import('next').NextConfig} */
import CopyPlugin from "copy-webpack-plugin";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, {}) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new NodePolyfillPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm.wasm",
            to: "static/chunks/pages",
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm",
            to: "static/chunks/pages",
          },
          {
            from: "./models",
            to: "static/chunks/pages",
          },
        ],
      })
    );

    return config;
  },
};

export default nextConfig;
