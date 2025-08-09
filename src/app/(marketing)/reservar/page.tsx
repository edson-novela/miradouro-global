// app/reservar/page.tsx
"use client";

import { useBookingStore } from "@/stores/bookingStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "./../../../../server/checkout";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const router = useRouter();
  const {
    destinationId,
    checkIn,
    checkOut,
    guests,
    nights,
    destination: storeDestination,
  } = useBookingStore();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState<"now" | "later">("now");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Portugal",
    specialRequests: "",
  });

  // Verifica se há dados de reserva
  useEffect(() => {
    if (
      !destinationId ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !storeDestination
    ) {
      toast.warning("Dados de reserva incompletos");
      //router.push("/");
    }
  }, [destinationId, checkIn, checkOut, guests, storeDestination, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    if (!destinationId || !storeDestination) return 0;
    return storeDestination.pricePerNight * guests * nights;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação básica
      if (!formData.fullName || !formData.email || !formData.phone) {
        throw new Error("Por favor, preencha todos os campos obrigatórios");
      }

      // Criar payload da reserva
      const bookingData = {
        destinationId: destinationId!,
        destinationTitle: storeDestination?.name || "Destino não especificado",
        checkIn: checkIn!,
        checkOut: checkOut!,
        guests,
        totalPrice: calculateTotal(),
        customerInfo: formData,
        paymentOption,
      };

      console.log("Booking Data:", bookingData);

      if (paymentOption === "now") {
        // Processar pagamento via Stripe
        console.log("Booking Data:", bookingData);
        const stripe = await stripePromise;
        const session = await createCheckoutSession({
          bookingData,
          successUrl: `${window.location.origin}/reservar/sucesso?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/reservar`,
        });

        await stripe?.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        // Pagamento posterior (criar reserva sem cobrança imediata)
        // await createPendingBooking(bookingData);
        toast.success(
          "Reserva criada com sucesso! Enviaremos as instruções de pagamento 3 dias antes do check-in."
        );

        router.push("/reservar/sucesso");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao processar sua reserva"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!destinationId || !checkIn || !checkOut || !guests || !storeDestination) {
    return (
      <div>
        <Header />
        <div className="bg-gradient-to-r from-amber-800 to-amber-500 py-12"></div>
        <div className="mx-auto container py-12 text-center">
          <h1 className="text-2xl font-bold">Dados de reserva incompletos</h1>
          <p className="mt-4">
            Por favor, volte e selecione as datas e número de hóspedes.
          </p>
          <Button className="mt-6" onClick={() => router.push("/")}>
            <FiArrowLeft className="mr-2" /> Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-gradient-to-r from-amber-800 to-amber-500 py-12"></div>

      <div className="mx-auto max-w-7xl py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <FiArrowLeft className="mr-2" /> Voltar
        </Button>

        <h1 className="text-3xl font-bold mb-2">Finalizar Reserva</h1>
        <p className="text-gray-600 mb-8">
          Confira os detalhes e preencha seus dados
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2 p-4 lg:p-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiUser className="text-amber-500" /> Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium mb-1"
                      >
                        Nome Completo <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-1"
                      >
                        Telefone <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium mb-1"
                      >
                        País
                      </label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleSelectChange("country", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Portugal">Portugal</SelectItem>
                          <SelectItem value="Brasil">Brasil</SelectItem>
                          <SelectItem value="Espanha">Espanha</SelectItem>
                          <SelectItem value="França">França</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-1"
                    >
                      Endereço
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium mb-1"
                      >
                        Cidade
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="specialRequests"
                      className="block text-sm font-medium mb-1"
                    >
                      Pedidos Especiais
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={3}
                      className="w-full border rounded-lg p-2 text-sm"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="font-medium">Opções de Pagamento</h3>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-amber-50">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentOption === "now"}
                          onChange={() => setPaymentOption("now")}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <div>
                          <p className="font-medium">Pagar agora</p>
                          <p className="text-sm text-gray-500">
                            Pagamento seguro via Stripe (cartão de
                            crédito/débito, etc.)
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-amber-50">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentOption === "later"}
                          onChange={() => setPaymentOption("later")}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <div>
                          <p className="font-medium">Pagar mais tarde</p>
                          <p className="text-sm text-gray-500">
                            Você será cobrado 3 dias antes da data de check-in
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processando..."
                      : paymentOption === "now"
                      ? "Pagar Agora"
                      : "Reservar Agora (Pagar Depois)"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumo da Reserva */}
          <div className="lg:col-span-1 p-4 lg:p-0">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiMapPin className="text-amber-500" /> Resumo da Reserva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={storeDestination.mainImage}
                        alt={storeDestination.name}
                        className="w-full h-full object-cover"
                        width={200}
                        height={150}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{storeDestination.name}</h3>
                      <p className="text-sm text-gray-500">
                        {nights} noite(s) para {guests}{" "}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium flex items-center">
                        <FiCalendar className="mr-2 text-amber-500" />
                        {format(checkIn, "dd MMM yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium flex items-center">
                        <FiCalendar className="mr-2 text-amber-500" />
                        {format(checkOut, "dd MMM yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hóspedes:</span>
                      <span className="font-medium flex items-center">
                        <FiUsers className="mr-2 text-amber-500" />
                        {guests} {guests > 1 ? "pessoas" : "pessoa"}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preço por noite:</span>
                      <span>€ {storeDestination.pricePerNight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Noites:</span>
                      <span>
                        {Math.ceil(
                          (checkOut.getTime() - checkIn.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hóspedes:</span>
                      <span>x{guests}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>€ {calculateTotal().toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Ao finalizar, você concorda com nossos Termos de Serviço e
                    Política de Privacidade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
