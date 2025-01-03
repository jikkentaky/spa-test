import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: ['./src/assets']
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.exegate.ru',
                port: '',
                pathname: '/images/catalog/**',
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                port: '',
                pathname: '/free-photo/**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
