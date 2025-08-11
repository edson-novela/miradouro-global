"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function TermsPage() {
  const lastUpdated = "02 de agosto de 2025";

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
              Termos e Condições
            </h1>
            <p className="text-gray-600 mt-2">
              Miradouro Global — {lastUpdated}
            </p>
          </motion.header>

          <article className="prose prose-lg max-w-none text-gray-700">
            <section>
              <h2>1. Aceitação</h2>
              <p>
                Ao usar o site e os serviços da Miradouro Global, concorda com
                estes Termos e Condições. Leia-os com atenção antes de efetuar
                qualquer reserva.
              </p>
            </section>

            <section>
              <h2>2. Serviços e reservas</h2>
              <p>
                A Miradouro oferece serviços de agência de viagens: pacotes,
                excursões, e reservas. Cada serviço tem condições próprias
                (preço, políticas de cancelamento) exibidas durante o processo
                de reserva.
              </p>
            </section>

            <section>
              <h2>3. Pagamentos</h2>
              <p>
                Os pagamentos podem ser processados por terceiros parceiros.
                Deve fornecer dados precisos e assegurar que tem autorização
                para usar o método de pagamento. Taxas aplicáveis são indicadas
                na hora da compra.
              </p>
            </section>

            <section>
              <h2>4. Cancelamentos e reembolsos</h2>
              <p>
                Políticas de cancelamento variam por produto/fornecedor. Quando
                aplicável, informaremos as condições antes de concluir a
                reserva. Em caso de reembolso, os prazos e montantes obedecem às
                condições do fornecedor e às regras do método de pagamento.
              </p>
            </section>

            <section>
              <h2>5. Responsabilidades</h2>
              <p>
                A Miradouro age como intermediária entre o cliente e
                fornecedores locais. Não nos responsabilizamos por atos,
                omissões ou incumprimentos por parte desses terceiros. É da
                responsabilidade do viajante possuir documentação válida
                (passaporte, vistos), seguros, e cumprir recomendações de saúde
                e segurança.
              </p>
            </section>

            <section>
              <h2>6. Alterações ao serviço</h2>
              <p>
                Reservamo-nos o direito de alterar o site, conteúdo e termos a
                qualquer momento. Mudanças significativas serão comunicadas.
              </p>
            </section>

            <section>
              <h2>7. Propriedade intelectual</h2>
              <p>
                Todo o conteúdo do site (textos, imagens, marcas) é propriedade
                da Miradouro ou dos respetivos licenciadores. Não é permitido
                reproduzir sem autorização.
              </p>
            </section>

            <section>
              <h2>8. Lei aplicável</h2>
              <p>
                Estes Termos são regidos pela legislação aplicável em Portugal
                (ou outra jurisdição que a empresa declarar). Qualquer disputa
                será tratada nos tribunais competentes conforme lei aplicável.
              </p>
            </section>

            <section>
              <h2>9. Contacto</h2>
              <p>
                Para questões relativas aos Termos, contacte-nos via{" "}
                <Link href="/contacto">/contacto</Link> ou para:
                <strong> legal@miradouroglobal.example</strong> (substituir pelo
                email real).
              </p>
            </section>

            <section>
              <h2>10. Cláusulas finais</h2>
              <p>
                Se alguma cláusula for considerada inválida, as restantes
                permanecerão em vigor. A aceitação destes Termos é condição para
                utilização dos nossos serviços.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
