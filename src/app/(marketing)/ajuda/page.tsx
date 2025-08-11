"use client";

import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";

export default function HelpPage() {
  const faqs = [
    {
      q: "Como faço uma reserva?",
      a: "Procure o destino ou tour desejado, selecione datas e número de participantes, preencha os dados necessários e conclua o pagamento. Receberá um email de confirmação com os detalhes.",
    },
    {
      q: "Posso alterar ou cancelar a minha reserva?",
      a: "Depende das condições do produto. Durante o processo de reserva verá a política de cancelamento. Para alterações contacte-nos através de /contacto o mais cedo possível.",
    },
    {
      q: "Que métodos de pagamento aceitam?",
      a: "Aceitamos cartões bancários (Visa, MasterCard) e pagamentos através de parceiros locais. As opções disponíveis aparecem no checkout.",
    },
    {
      q: "Preciso de seguro de viagem?",
      a: "Recomendamos sempre contratar seguro de viagem. Alguns países podem exigir cobertura específica; verifique antes de viajar.",
    },
    {
      q: "Como recebo os vouchers/confirmações?",
      a: "Após confirmação e pagamento, enviamos automaticamente por email os vouchers e instruções. Caso não receba, verifique a pasta de spam ou contacte-nos.",
    },
    {
      q: "Como contacto o suporte durante a viagem?",
      a: "Verifique o email de confirmação — lá constam contactos locais e instruções de emergência. Também pode usar /contacto para suporte.",
    },
  ];

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
              Ajuda & Perguntas Frequentes
            </h1>
            <p className="text-gray-600 mt-2">
              Se não encontrar resposta, entre em contacto connosco.
            </p>
            <Link
              href="/contacto"
              className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md"
            >
              Contacte o suporte
            </Link>
          </motion.header>

          <section className="grid gap-6">
            {faqs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-gray-700">{item.a}</p>
              </motion.div>
            ))}
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ainda precisa de ajuda?
            </h2>
            <p className="text-gray-700 mb-4">
              Envie-nos uma mensagem através da página de contacto ou consulte
              as secções de Política de Privacidade e Termos e Condições.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-white border border-amber-500 text-amber-600 px-6 py-3 rounded-lg shadow-sm"
            >
              /contacto
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
