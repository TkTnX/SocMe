import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000'
			},
			{
				protocol: 'https',
				hostname:
					'lh3.googleusercontent.com'
			}
		]
	}
}

export default nextConfig
