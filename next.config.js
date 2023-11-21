/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mks-sistemas.nyc3.digitaloceanspaces.com',
            },
        ],
    },
};

module.exports = nextConfig;
