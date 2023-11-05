/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: 'http://homologacao3.azapfy.com.br/api/ps/metahumans'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
                port: '',
                pathname: '/gh/akabab/superhero-api@0.3.0/api/images/lg/**',
            },
        ],
    },
}

module.exports = nextConfig
