"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Settings,
  ChevronDown,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, REGIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const pathname = usePathname();
  const currentRegion = "Germany";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center px-6">
        {/* Logo */}
        <Link href="/dashboard" className="mr-8 flex items-center gap-2 transition-opacity hover:opacity-80">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <circle cx="8" cy="16" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="16" cy="8" r="4" fill="currentColor" opacity="0.6" />
            <circle cx="24" cy="16" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="16" cy="24" r="4" fill="currentColor" />
          </svg>
          <span className="text-heading-2 text-default-font">Dynamic Pricing</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-0 -bottom-[13px] h-0.5 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Region selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <Globe className="size-4" />
                <span className="hidden sm:inline">{currentRegion}</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {REGIONS.filter(r => r.value !== "all").map((region) => (
                <DropdownMenuItem key={region.value}>
                  {region.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Entity selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Image
                  src="/foodpanda.jpg"
                  alt="Foodpanda"
                  width={20}
                  height={20}
                  className="size-5 rounded-full object-cover"
                />
                <span className="font-medium">FP_DE</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="gap-2">
                <Image
                  src="/foodpanda.jpg"
                  alt="Foodpanda"
                  width={20}
                  height={20}
                  className="size-5 rounded-full object-cover"
                />
                FP_DE
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Image
                  src="/foodpanda.jpg"
                  alt="Foodpanda"
                  width={20}
                  height={20}
                  className="size-5 rounded-full object-cover"
                />
                FP_SG
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Image
                  src="/foodpanda.jpg"
                  alt="Foodpanda"
                  width={20}
                  height={20}
                  className="size-5 rounded-full object-cover"
                />
                FP_AR
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Image
                  src="/foodpanda.jpg"
                  alt="Foodpanda"
                  width={20}
                  height={20}
                  className="size-5 rounded-full object-cover"
                />
                FP_UK
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="size-8">
            <Settings className="size-4 text-muted-foreground" />
          </Button>

          {/* User avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 rounded-full">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary text-xs font-medium text-primary-foreground">
                    UN
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
