import Header from "@/components/common/Header";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="bg-amber-800 h-18"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-100 py-14 md:py-36">
          <div className="hidden md:flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md">
            <Link href="/" className="mb-4">
              <Image
                src={"/images/logo/Miradouro Global-2.svg"}
                alt="Miradouro Global"
                className="w-64"
                width={420}
                height={420}
              />
            </Link>
            <p className="text-gray-600 mb-6 w-3/4 text-center">
              Faça login para acessar sua conta e aproveitar todos os recursos
              do Miradouro Global.
            </p>
          </div>
          <div className="w-full max-w-sm mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }

  return redirect("/");
}
