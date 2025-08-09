"use client";

import { FiCalendar, FiStar, FiUsers, FiMapPin } from "react-icons/fi";
import Link from "next/link";
import { Destination } from "@/types/Destination";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useBookingStore } from "@/stores/bookingStore";
import { useEffect } from "react";

interface BookingCardProps {
  destination: Destination;
}

export default function BookingCard({ destination }: BookingCardProps) {
  const groupSize = 4;

  const {
    checkIn,
    checkOut,
    guests,
    nights,
    setDates,
    setGuests,
    setDestination
  } = useBookingStore();

  useEffect(() => {
    setDestination(destination);
  }, [destination, setDestination]);

  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range?.from) return;
    setDates(range.from, range.to ?? null);
  };

  const handleGuestsChange = (change: number) => {
    const newGuests = guests + change;
    if (newGuests >= 1 && newGuests <= groupSize) {
      setGuests(newGuests);
    }
  };

  const isBookable = checkIn && checkOut && guests > 0;

  // cálculo do preço total
  const totalPrice =
    nights > 0
      ? destination.pricePerNight * guests * nights
      : destination.pricePerNight * guests;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 sticky top-6"
    >
      {/* Cabeçalho */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Reserve sua viagem</h2>
        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Até {groupSize} pessoas
        </span>
      </div>

      {/* Local */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <FiMapPin className="mr-2 text-amber-500" />
        {destination.location}
      </div>

      {/* Seletor de Datas */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Datas da viagem</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !checkIn && "text-muted-foreground"
              )}
            >
              <FiCalendar className="mr-2 h-4 w-4 text-amber-500" />
              {checkIn ? (
                checkOut ? (
                  <>
                    {format(checkIn, "dd MMM yyyy", { locale: ptBR })} -{" "}
                    {format(checkOut, "dd MMM yyyy", { locale: ptBR })}
                  </>
                ) : (
                  format(checkIn, "dd MMM yyyy", { locale: ptBR })
                )
              ) : (
                <span>Selecione as datas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{
                from: checkIn || undefined,
                to: checkOut || undefined
              }}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              locale={ptBR}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Seletor de Hóspedes */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Número de viajantes</h3>
        <div className="flex items-center justify-between border rounded-lg p-3">
          <div className="flex items-center">
            <FiUsers className="mr-2 h-4 w-4 text-amber-500" />
            <span className="text-sm">Viajantes</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGuestsChange(-1)}
              disabled={guests <= 1}
              className="h-8 w-8 p-0"
            >
              -
            </Button>
            <span className="w-8 text-center">{guests}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGuestsChange(1)}
              disabled={guests >= groupSize}
              className="h-8 w-8 p-0"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {/* Informações */}
      <div className="space-y-4 mb-6">
        {nights > 0 && (
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Duração:</span>
            <span className="font-medium text-gray-900">{nights} noite(s)</span>
          </div>
        )}

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Avaliação:</span>
          <span className="font-medium text-gray-900 flex items-center">
            <FiStar className="mr-1 text-amber-500" />
            {destination.rating}/5
          </span>
        </div>
      </div>

      {/* Preço */}
      <div className="bg-amber-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Preço total:</span>
          <span className="text-2xl font-bold text-amber-600">
            € {totalPrice}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {nights > 0
            ? `${guests} viajante(s) × ${nights} noite(s)`
            : "Selecione as datas para calcular o total"}
        </p>
      </div>

      {/* Botão de reserva */}
      <Link
        href="/reservar"
        className={cn(
          "block w-full text-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300",
          !isBookable && "opacity-50 cursor-not-allowed",
          isBookable && "transform hover:scale-[1.02]"
        )}
        aria-disabled={!isBookable}
      >
        {isBookable ? "Reservar Agora" : "Selecione datas e viajantes"}
      </Link>

      {/* Info extra */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p className="flex items-center justify-center">
          <svg
            className="h-4 w-4 mr-1 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Cancelamento gratuito até 30 dias antes
        </p>
      </div>
    </motion.div>
  );
}
