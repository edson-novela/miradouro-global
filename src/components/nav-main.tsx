"use client";

import { Icon } from "@tabler/icons-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Este SidebarMenuMenuItem está vazio. Você pode removê-lo se não for usá-lo. */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2"></SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} className="gap-2 px-4 py-6 hover:bg-amber-300 transition-all">
                {item.icon && <item.icon />}
                
                {/* AQUI ESTÁ A CORREÇÃO:
                  Adicione a barra inicial (/) para tornar a URL absoluta.
                */}
                <Link href={`/minha-conta/${item.url}`} >
                  <span className="font-bold">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}