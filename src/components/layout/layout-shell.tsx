"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { MainContent } from "@/components/layout/main-content";

const FULLSCREEN_ROUTES = ["/design-system"];

interface LayoutShellProps {
  children: React.ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const isFullscreen = FULLSCREEN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isFullscreen) {
    return (
      <div className="h-screen overflow-auto bg-neutral-50">{children}</div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <MainContent>{children}</MainContent>
    </div>
  );
}
