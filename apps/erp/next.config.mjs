/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  // Redirect a nível de edge — evita o bug de cache do Vercel em redirect()
  // de Server Component sob RSC, que retorna 307 sem header Location.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
