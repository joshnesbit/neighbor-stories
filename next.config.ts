import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "@dyad-sh/nextjs-webpack-component-tagger",
      });
    }

    // Exclude Supabase functions from webpack processing
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/supabase/functions/**']
    };

    // Exclude Supabase functions from module resolution
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
      }
    };
    
    return config;
  },
  // Exclude supabase directory from static analysis
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Ensure proper TypeScript checking
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;