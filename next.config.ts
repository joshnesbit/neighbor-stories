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

    // Exclude Supabase functions from the build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/supabase/functions/**']
    };
    
    return config;
  },
  // Exclude supabase functions directory from being processed
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./supabase/functions/**/*'],
    },
  },
};

export default nextConfig;