"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SidebarWithSections } from "@/subframe/components/SidebarWithSections";
import {
  FeatherLayoutDashboard,
  FeatherLayers,
  FeatherTag,
  FeatherMegaphone,
  FeatherFlaskConical,
  FeatherRepeat,
  FeatherStore,
  FeatherSettings,
  FeatherGlobe,
} from "@subframe/core";
import { ChevronDown } from "lucide-react";
import { NAV_ITEMS, REGIONS } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Map nav item IDs to icons
const NAV_ICONS: Record<string, React.ReactNode> = {
  dashboard: <FeatherLayoutDashboard />,
  components: <FeatherLayers />,
  "price-rules": <FeatherTag />,
  campaigns: <FeatherMegaphone />,
  experiments: <FeatherFlaskConical />,
  subscriptions: <FeatherRepeat />,
  vendors: <FeatherStore />,
};

export function Sidebar() {
  const pathname = usePathname();
  const currentRegion = "Germany";

  return (
    <SidebarWithSections
      className="sticky top-0 h-screen shrink-0 border-r-0! bg-neutral-100!"
      header={
        <Link href="/" className="mt-2.5 flex items-center gap-2 transition-opacity hover:opacity-80">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-brand-600"
          >
            <circle cx="8" cy="16" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="16" cy="8" r="4" fill="currentColor" opacity="0.6" />
            <circle cx="24" cy="16" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="16" cy="24" r="4" fill="currentColor" />
          </svg>
          <span className="text-heading-2 text-default-font">
            Dynamic Pricing
          </span>
        </Link>
      }
      footer={
        <div className="flex w-full flex-col gap-1">
          {/* Region selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="group w-full justify-between text-neutral-600 hover:bg-neutral-50 hover:text-neutral-600 active:bg-neutral-100"
              >
                <span className="flex items-center gap-2">
                  <FeatherGlobe className="size-4" />
                  {currentRegion}
                </span>
                <ChevronDown className="size-3 origin-center transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {REGIONS.filter((r) => r.value !== "all").map((region) => (
                <DropdownMenuItem key={region.value}>
                  {region.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Entity selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="group w-full justify-between text-neutral-600 hover:bg-neutral-50 hover:text-neutral-600 active:bg-neutral-100"
              >
                <span className="flex items-center gap-2">
                  <Image
                    src="/foodpanda.jpg"
                    alt="Foodpanda"
                    width={16}
                    height={16}
                    className="size-4 rounded-full object-cover"
                  />
                  <span className="font-medium">FP_DE</span>
                </span>
                <ChevronDown className="size-3 origin-center transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
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
          <SidebarWithSections.NavItem icon={<FeatherSettings />}>
            Settings
          </SidebarWithSections.NavItem>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="group w-full justify-between text-neutral-600 hover:bg-neutral-50 hover:text-neutral-600 active:bg-neutral-100"
              >
                <span className="flex items-center gap-2">
                  <Image
                    src="/bob-the-builder.jpg"
                    alt="Saurabh Singh"
                    width={16}
                    height={16}
                    className="size-4 rounded-full object-cover"
                  />
                  <span className="font-medium">Saurabh Singh</span>
                </span>
                <ChevronDown className="size-3 origin-center transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Account settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      {/* Main Navigation */}
      <div className="flex w-full flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link key={item.id} href={item.href} className="w-full">
              <SidebarWithSections.NavItem
                icon={NAV_ICONS[item.id]}
                selected={isActive}
              >
                {item.label}
              </SidebarWithSections.NavItem>
            </Link>
          );
        })}
      </div>

    </SidebarWithSections>
  );
}
