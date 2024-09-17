/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com'
            },
            {
                // protocol: 'http',
                hostname: 'localhost'
            },
            // {
            //     protocol: 'https',
            //     hostname: 'wembleypark.com'
            // },
        ]
    }
};

export default nextConfig;
