/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // Use 'http' for local development
                hostname: 'localhost', // Specify the hostname
                port: '8000', // Specify the port number
                pathname: '/images/**', // Specify the path for images
            },
        ],
    },
};

module.exports = nextConfig;
