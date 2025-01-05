import { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    output: 'standalone',
    webpack: (config) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            bufferutil: 'commonjs bufferutil'
        });

        return config;
    },
    env: {
        NEXT_PUBLIC_SOCKET_PORT: process.env.SOCKET_PORT
    },
    sassOptions: {
        includePaths: ['./src/assets']
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.exegate.ru',
                port: '',
                pathname: '/images/catalog/**'
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                port: '',
                pathname: '/free-photo/**'
            }
        ]
    },
    webSocketServerOptions: {
        transports: ['websocket', 'polling']
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb'
        }
    }
};

export default withNextIntl(nextConfig);
