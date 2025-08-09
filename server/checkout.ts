// actions/checkout.ts
'use server';

import { stripe } from '@/lib/stripe';
import { format } from 'date-fns';

export async function createCheckoutSession({
  bookingData,
  successUrl,
  cancelUrl
}: {
  bookingData: any;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: bookingData.destinationTitle,
            description: `Reserva de ${format(bookingData.checkIn, 'dd/MM/yyyy')} a ${format(bookingData.checkOut, 'dd/MM/yyyy')} para ${bookingData.guests} hóspedes`,
          },
          unit_amount: bookingData.totalPrice * 100, // em centavos
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      bookingId: bookingData.destinationId,
      customerEmail: bookingData.customerInfo.email,
    },
  });

  return session;
}