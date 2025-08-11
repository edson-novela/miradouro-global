"use client";

import { authClient } from "@/lib/auth-client";
import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();

  // Estado de loading
  if (isPending) {
    return (
      <Sidebar {...props}>
        <SidebarHeader>
          <div className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2 px-2">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded" />
            ))}
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }

  // Usuário não autenticado
  if (!session) {
    return (
      <Sidebar {...props}>
        <SidebarContent className="flex items-center justify-center">
          <div className="p-6 text-center text-sm text-muted-foreground">
            <p>Por favor, faça login para acessar o painel</p>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  const data = {
    user: {
      name: session.user?.name || "Usuário",
      email: session.user?.email || "",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Minhas reservas",
        url: "booking",
        icon: IconDashboard,
        description: "Visualize seus pedidos recentes",
      },
      {
        title: "Meu Perfil",
        url: "perfil",
        icon: IconListDetails,
        description: "Gerencie suas informações pessoais",
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-accent/50 transition-colors"
            >
              <Link href="/minha-conta" className="group">
                <div className="flex items-center gap-2">
                  <IconInnerShadowTop className="!size-5 text-primary group-hover:text-primary/80 transition-colors" />
                  <span className="text-base font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                    Miradouro Global
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}