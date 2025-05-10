import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {

  webpack(config: Configuration): Configuration {
    config.module?.rules?.push({
      test: /\.mp3$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/sounds/',
            outputPath: 'static/sounds/',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
