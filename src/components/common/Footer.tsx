"use client";

import { motion } from "framer-motion";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Links Rápidos",
      items: [
        { name: "Início", href: "/" },
        { name: "Destinos", href: "/destinos" },
        { name: "Pacotes", href: "/pacotes" },
        { name: "Sobre Nós", href: "/sobre" },
      ],
    },
    {
      title: "Informações Legais",
      items: [
        { name: "Política de Privacidade", href: "/politica-de-privacidade" },
        { name: "Termos e Condições", href: "/termos" },
        { name: "Ajuda e Suporte", href: "/ajuda" },
        { name: "Trabalhe Conosco", href: "/contacto" },
      ],
    },
  ];

  return (
    <div className="bg-amber-900">
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo e introdução */}
          <div>
            <div className="mb-6">
              <Image
                src="/images/logo/Miradouro Global-3.svg"
                alt="Miradouro Global"
                width={220}
                height={80}
                className="w-auto h-auto"
              />
            </div>
            <p className="text-white/90 mb-6 text-sm">
              Transformando sonhos em experiências inesquecíveis desde 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-amber-400">
                <FiFacebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-amber-400">
                <FiInstagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-amber-400">
                <FiTwitter size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-amber-400">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Seções de links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3 text-sm">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/90 hover:text-amber-400 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <FiMapPin className="text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <span>
                  Av. das Viagens, 1234<br />
                  Lisboa, Portugal
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-amber-400 mr-3" />
                <span>+351 123 456 789</span>
              </li>
              <li className="flex items-center">
                <FiMail className="text-amber-400 mr-3" />
                <span>suporte@miradouroglobal.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-white/70">
          <p>
            &copy; {currentYear} Miradouro Global. Todos os direitos reservados.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
