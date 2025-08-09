"use client";

import Header from "./../common/Header";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <section className="relative h-screen w-full bg-[url(/images/mira-4.jpg)] bg-cover bg-center bg-no-repeat">
      {/* Overlay escuro para melhor contraste do texto */}
      <div className="absolute inset-0 bg-black/40"></div>

      <Header />

      <div className="relative max-h-screen h-full z-10 max-w-7xl mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12"
        >
          {/* Hero Text */}
          <div className="flex flex-col justify-center text-center sm:text-left">
            <div className="max-w-2xl mx-auto sm:mx-0">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Desbloqueie seus{" "}
                <span className="text-amber-300">sonhos</span> de viagem
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-white/90 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Bem-vindo à Miradouro Global, onde transformamos suas viagens em
                experiências memoráveis. Descubra destinos únicos com roteiros
                personalizados e atendimento exclusivo.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/destinos"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Explorar destinos
                  <FiArrowRight className="ml-2" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
