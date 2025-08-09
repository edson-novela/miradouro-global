import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ['localhost'], // <-- REMOVA ESTA LINHA (ou comente)
    remotePatterns: [
      {
        protocol: "http", // Use 'http' for localhost
        hostname: "localhost",
        port: "3000", // Certifique-se de que esta porta corresponde à porta do seu servidor de desenvolvimento Next.js
        pathname: "/images/logo/**", // Permite qualquer caminho dentro de /images/logo/
      },
      {
        protocol: "http", // Use 'http' for localhost
        hostname: "localhost",
        port: "3000", // Certifique-se de que esta porta corresponde à porta do seu servidor de desenvolvimento Next.js
        pathname: "/images/destinos/**", // Permite qualquer caminho dentro de /images/destinos/
      },
      {
        protocol: "http", // Use 'http' for localhost
        hostname: "localhost",
        port: "3000", // Certifique-se de que esta porta corresponde à porta do seu servidor de desenvolvimento Next.js
        pathname: "/images/**", // Permite qualquer caminho dentro de /images/
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // Se você tiver outras URLs de imagens (por exemplo, de um CDN em produção), adicione-as aqui também.
      // Exemplo para um site em produção:
      // {
      //   protocol: 'https',
      //   hostname: 'minhalojaartesanal.com', // Seu domínio de produção
      //   port: '', // Deixe vazio para portas padrão (80/443)
      //   pathname: '/images/products/**',
      // },
      // Exemplo para Cloudinary:
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      //   port: '',
      //   pathname: '/your-cloud-name/**',
      // },
    ],
  },
};

export default nextConfig;
