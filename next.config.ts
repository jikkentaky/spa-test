import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: ['./src/assets']
    }
};

export default withNextIntl(nextConfig);
