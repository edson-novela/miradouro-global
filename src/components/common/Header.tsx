"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiMenu,
  FiX,
  FiUser,
  FiChevronRight,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Destinos", href: "/destinos" },
    { name: "Sobre Nós", href: "/sobre" },
    { name: "Contato", href: "/contacto" },
  ];

  return (
    <>
      {/* Header Principal */}
      <header
        className={`fixed w-full z-50 transition-colors duration-500 ${
          hasScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm text-gray-900"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <Image
                src={
                  hasScrolled
                    ? "/images/logo/Miradouro Global-2.svg"
                    : "/images/logo/Miradouro Global-3.svg"
                }
                alt="Miradouro Global"
                width={180}
                height={40}
                className="h-6 md:h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors duration-300 rounded-lg ${
                    hasScrolled
                      ? "hover:text-amber-600"
                      : "hover:text-amber-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className={`flex items-center space-x-1 px-4 py-2.5 text-sm font-medium transition-colors duration-300 rounded-lg ${
                      hasScrolled
                        ? "hover:text-amber-600"
                        : "hover:text-amber-300"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt="User avatar"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <FiUser className="h-4 w-4" />
                      )}
                    </div>
                    <span className="hidden md:inline">
                      {session.user?.name?.split(" ")[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                        onMouseLeave={() => setIsUserDropdownOpen(false)}
                      >
                        <Link
                          href="/minha-conta"
                          className="px-4 py-2 rounded-2xl text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <FiSettings className="mr-2" />
                          Minha Conta
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <FiLogOut className="mr-2" />
                          Sair
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`hidden md:flex items-center space-x-1 px-4 py-2.5 text-sm font-medium transition-colors duration-300 rounded-lg ${
                    hasScrolled
                      ? "hover:text-amber-600"
                      : "hover:text-amber-300"
                  }`}
                >
                  <FiUser className="h-4 w-4" />
                  <span>Iniciar sessão</span>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                className={`md:hidden focus:outline-none ${
                  hasScrolled ? "text-gray-900" : "text-white"
                }`}
                onClick={() => setIsMenuOpen(true)}
                aria-label="Abrir menu"
              >
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-xl"
            >
              <div className="h-full flex flex-col">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Image
                      src="/images/logo/Miradouro Global-2.svg"
                      alt="Miradouro Global"
                      width={160}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    aria-label="Fechar menu"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-amber-600 transition-colors"
                        >
                          <span>{item.name}</span>
                          <FiChevronRight className="text-gray-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Footer/Auth */}
                <div className="p-4 border-t">
                  {session ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                          {session.user?.image ? (
                            <Image
                              src={session.user.image}
                              alt="User avatar"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            <FiUser className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {session.user?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/minha-conta"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors flex items-center"
                      >
                        <FiSettings className="mr-3" />
                        Minha Conta
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors flex items-center"
                      >
                        <FiLogOut className="mr-3" />
                        Sair
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                    >
                      <FiUser className="h-5 w-5" />
                      <span>Iniciar sessão</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}