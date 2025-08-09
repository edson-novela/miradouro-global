// src/app/dashboard/page.tsx
import { auth } from "@/lib/auth"
import { redirect } from 'next/navigation';
import { headers } from "next/headers";

export default async function DashboardPage() {
  "use server";
  const session = await auth.api.getSession({
        headers: await headers()
    })

  if (!session) {
    redirect('/login');
  }

  // A partir daqui, o utilizador está autenticado
  return (
    <h1>Bem-vindo ao Dashboard!</h1>
  );
}