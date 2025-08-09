// app/reserva/sucesso/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { FiCheckCircle, FiHome, FiPrinter } from "react-icons/fi";
import { useBookingStore } from "@/stores/bookingStore";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useEffect } from "react";

export default function BookingSuccessPage() {
  const { reset } = useBookingStore();

  useEffect(() => {
    // Limpa o estado da reserva ao montar a página
    reset();
  }, [reset]);

  // Em uma aplicação real, você buscaria os detalhes da reserva
  // usando o sessionId ou outro identificador

  return (
    <div>
      <Header />
      <div className="bg-amber-800 h-20"></div>
      <div className="mx-auto container py-12 flex flex-col items-center text-center">
        <div className="bg-green-100 p-4 rounded-full mb-6">
          <FiCheckCircle className="text-green-500 text-5xl" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Reserva Confirmada!</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">
          Sua reserva foi confirmada com sucesso. Enviamos todos os detalhes
          para o seu email.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button asChild>
            <Link href="/">
              <FiHome className="mr-2" /> Voltar para a página inicial
            </Link>
          </Button>
          <Button variant="outline">
            <FiPrinter className="mr-2" /> Imprimir comprovante
          </Button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg w-full max-w-lg text-left">
          <h2 className="font-bold mb-4">O que fazer agora?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-amber-100 text-amber-800 rounded-full p-1">
                1
              </span>
              <span>
                Verifique seu email com os detalhes da reserva (incluindo a
                pasta de spam)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-amber-100 text-amber-800 rounded-full p-1">
                2
              </span>
              <span>Adicione as datas à sua agenda</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-amber-100 text-amber-800 rounded-full p-1">
                3
              </span>
              <span>Entre em contato conosco se tiver alguma dúvida</span>
            </li>
          </ul>
        </div>
      </div>

      <Footer />

    </div>
  );
}
