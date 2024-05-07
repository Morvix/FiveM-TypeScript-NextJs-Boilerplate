/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Export a function from your configuration file that receives the current phase
export default (phase) => {
    const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER;

    const nextConfig = {
        reactStrictMode: false,
        swcMinify: true,
        output: 'export', // Assuming you want to use static HTML export in all phases
        typescript: {},
        eslint: {
            ignoreDuringBuilds: true,
        },
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        webpack: (config) => {
            config.resolve.alias = {
                ...config.resolve.alias,
                "@": path.join(__dirname, "src"),
                "@public": path.join(__dirname, "public"),
            };
            return config;
        },
    };

    // Conditionally modify nextConfig based on the phase
    // Example: Change the assetPrefix in production
    if (!isDevelopment) {
        nextConfig.assetPrefix = '.';
        nextConfig.typescript.ignoreBuildErrors = true;
        nextConfig.distDir = 'build';
    } else {
        nextConfig.typescript.ignoreBuildErrors = true;
    }

    return nextConfig;
};
