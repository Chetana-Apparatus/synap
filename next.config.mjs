import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.1.192'],
  output: 'standalone',
  turbopack: {
    root: resolve(__dirname),
  },
}

export default nextConfig
