"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiAward, FiGlobe, FiHeart, FiUsers } from "react-icons/fi";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Carlos Mendes",
      role: "Fundador & CEO",
      bio: "Com mais de 20 anos de experiência no setor, Carlos transformou sua paixão por viagens em uma agência premiada.",
      image: "/images/equipe/carlos.jpg",
    },
    {
      id: 2,
      name: "Ana Silva",
      role: "Diretora de Operações",
      bio: "Especialista em logística de viagens, Ana garante que cada detalhe da sua experiência seja perfeito.",
      image: "/images/equipe/ana.jpg",
    },
    {
      id: 3,
      name: "Sofia Pereira",
      role: "Atendimento ao Cliente",
      bio: "Nosso anjo da guarda, Sofia está sempre disponível para tornar sua viagem inesquecível.",
      image: "/images/equipe/sofia.jpg",
    },
  ];

  const stats = [
    { icon: <FiGlobe className="h-8 w-8" />, value: "50+", label: "Destinos" },
    {
      icon: <FiUsers className="h-8 w-8" />,
      label: "10.000+",
      value: "Clientes",
    },
    { icon: <FiAward className="h-8 w-8" />, label: "15", value: "Prêmios" },
    {
      icon: <FiHeart className="h-8 w-8" />,
      label: "98%",
      value: "Satisfação",
    },
  ];

  return (
    <div>
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-[url('/images/sobre/hero-about.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-amber-800/70"></div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Nossa História
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white max-w-2xl"
            >
              Conectando pessoas a experiências extraordinárias desde 2010
            </motion.p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Our Story */}
          <section className="mb-20">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <Image
                  src="/images/equipe/office.jpg"
                  alt="Nossa agência"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Miradouro Global
                </h2>
                <p className="text-gray-600 mb-4">
                  Fundada em 2010 por Carlos Mendes, a Miradouro Global nasceu
                  da paixão por explorar o mundo e compartilhar experiências
                  autênticas. Começamos como uma pequena agência em Lisboa e
                  hoje ajudamos milhares de viajantes a descobrir os destinos
                  mais incríveis do planeta.
                </p>
                <p className="text-gray-600 mb-6">
                  Nosso nome Miradouro reflete nossa missão: proporcionar
                  vistas únicas e perspectivas diferentes sobre cada destino,
                  muito além dos roteiros tradicionais.
                </p>
                <Link
                  href="/destinos"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                >
                  Conheça nossos destinos
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-gray-50 rounded-xl p-8 mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto h-12 w-12 text-amber-500 mb-4 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Values */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nossos Valores
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Princípios que guiam cada decisão e cada viagem que planejamos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Autenticidade
                </h3>
                <p className="text-gray-600">
                  Buscamos experiências genuínas que conectem nossos clientes
                  com a essência de cada destino, longe dos roteiros turísticos
                  convencionais.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Excelência
                </h3>
                <p className="text-gray-600">
                  Cada detalhe é cuidadosamente planejado para superar
                  expectativas, desde a seleção de hotéis até a escolha de guias
                  locais especializados.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Sustentabilidade
                </h3>
                <p className="text-gray-600">
                  Promovemos o turismo responsável que valoriza comunidades
                  locais e preserva o meio ambiente, garantindo que os destinos
                  permaneçam vibrantes para futuras gerações.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Team */}
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Conheça Nossa Equipe
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Profissionais apaixonados por viagens e dedicados a criar
                experiências memoráveis
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-amber-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl p-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Pronto para sua próxima aventura?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Nossa equipe está pronta para criar a viagem dos seus sonhos
              </p>
              <Link
                href="/contacto"
                className="inline-block bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium shadow-md transition-colors"
              >
                Fale conosco
              </Link>
            </motion.div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
