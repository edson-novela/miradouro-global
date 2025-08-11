"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PrivacyPolicyPage() {
  const lastUpdated = "01 de agosto de 2025";

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="relative h-96">
        <div className="absolute inset-0 bg-amber-800/70"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          ></motion.h1>
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
      <main className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Política de Privacidade
            </h1>
            <p className="text-gray-600 mt-2">
              Miradouro Global — {lastUpdated}
            </p>
          </motion.header>

          <article className="prose prose-lg max-w-none text-gray-700">
            <section>
              <h2>Introdução</h2>
              <p>
                A Miradouro Global (doravante “Miradouro”, “nós”) respeita a sua
                privacidade e está comprometida em proteger os seus dados
                pessoais. Esta Política explica que informação recolhemos,
                porque a usamos, com quem a partilhamos e os seus direitos.
              </p>
            </section>

            <section>
              <h2>Dados que recolhemos</h2>
              <ul>
                <li>
                  <strong>Dados de contacto:</strong> nome, email, telefone,
                  morada quando necessários para reservas.
                </li>
                <li>
                  <strong>Dados de reservas e pagamentos:</strong> informação
                  sobre reservas, histórico de compras e dados de faturação.
                </li>
                <li>
                  <strong>Dados técnicos:</strong> endereço IP, cookies,
                  informações do navegador e comportamento no site.
                </li>
                <li>
                  <strong>Conteúdos facultados por si:</strong> mensagens ao
                  suporte, avaliações e imagens que nos envia.
                </li>
              </ul>
            </section>

            <section>
              <h2>Como usamos os seus dados</h2>
              <p>Utilizamos os seus dados para:</p>
              <ul>
                <li>Processar e gerir reservas e pagamentos;</li>
                <li>Comunicar atualizações, confirmações e notificações;</li>
                <li>Melhorar os nossos serviços e personalizar ofertas;</li>
                <li>Cumprir obrigações legais e de faturação;</li>
                <li>Prevenir fraudes e garantir segurança.</li>
              </ul>
            </section>

            <section>
              <h2>Base legal</h2>
              <p>
                Quando aplicável, processamos os seus dados com base no seu
                consentimento, para execução de um contrato (ex.: reserva), ou
                quando necessário para cumprir obrigações legais ou interesses
                legítimos da empresa.
              </p>
            </section>

            <section>
              <h2>Partilha de dados</h2>
              <p>
                Podemos partilhar dados com:
                <ul>
                  <li>
                    Fornecedores de pagamentos e plataformas de processamento;
                  </li>
                  <li>
                    Parceiros locais (hotéis, guias, operadores) para executar a
                    reserva;
                  </li>
                  <li>Autoridades quando exigido por lei;</li>
                  <li>
                    Provedores de serviços técnicos (hospedagem, análises).
                  </li>
                </ul>
              </p>
            </section>

            <section>
              <h2>Cookies e tecnologias semelhantes</h2>
              <p>
                Usamos cookies para funcionalidades do site, análises e
                personalização. Pode gerir preferências de cookies no seu
                navegador ou através do banner de cookies quando visita o site.
              </p>
            </section>

            <section>
              <h2>Segurança</h2>
              <p>
                Adoptamos medidas técnicas e organizacionais para proteger os
                seus dados. No entanto, nenhum sistema é 100% infalível — se
                tiver preocupações, contacte-nos.
              </p>
            </section>

            <section>
              <h2>Conservação de dados</h2>
              <p>
                Conservamos os seus dados pelo tempo necessário para cumprir as
                finalidades descritas (ex.: durações legais de faturação,
                resolução de litígios, melhorias de serviço).
              </p>
            </section>

            <section>
              <h2>Os seus direitos</h2>
              <p>
                Dependendo da jurisdição, pode ter o direito a: aceder, corrigir
                ou apagar os seus dados, limitar o processamento, solicitar a
                portabilidade, ou opor-se ao tratamento. Para exercer direitos,
                contacte-nos através de <Link href="/contacto">/contacto</Link>.
              </p>
            </section>

            <section>
              <h2>Contacto</h2>
              <p>
                Para questões relacionadas com privacidade, escreva para{" "}
                <a href="/contacto">/contacto</a> ou envie email para:
                <strong> privacy@miradouroglobal.example</strong> (substituir
                pelo email real).
              </p>
            </section>

            <section>
              <h2>Alterações a esta Política</h2>
              <p>
                Podemos actualizar esta Política ocasionalmente. Notificaremos
                as mudanças na página e actualizaremos a data de “Última
                actualização”.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
