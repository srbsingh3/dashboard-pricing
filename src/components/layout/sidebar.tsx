"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarWithSections } from "@/subframe/components/SidebarWithSections";
import { Avatar } from "@/subframe/components/Avatar";
import { IconButton } from "@/subframe/components/IconButton";
import {
  FeatherLayoutDashboard,
  FeatherLayers,
  FeatherTag,
  FeatherMegaphone,
  FeatherFlaskConical,
  FeatherRepeat,
  FeatherStore,
  FeatherSettings,
  FeatherMoreVertical,
  FeatherGlobe,
  FeatherChevronDown,
} from "@subframe/core";
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
      className="sticky top-0 h-screen shrink-0"
      header={
        <div className="flex items-center gap-2">
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
          <span className="text-heading-2 tracking-tight text-default-font">
            dps
          </span>
        </div>
      }
      footer={
        <>
          <div className="flex shrink-0 grow basis-0 items-center gap-3">
            <Avatar
              variant="brand"
              size="medium"
              image="/bob-the-builder.jpg"
              square={false}
            >
              SS
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-body-bold text-default-font">
                Saurabh Singh
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                size="small"
                icon={<FeatherMoreVertical />}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
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

      {/* Divider */}
      <div className="my-2 w-full border-t border-neutral-border" />

      {/* Region, Entity & Settings */}
      <div className="flex w-full flex-col gap-1">
        {/* Region selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between text-neutral-600 hover:bg-neutral-50"
            >
              <span className="flex items-center gap-2">
                <FeatherGlobe className="size-4" />
                {currentRegion}
              </span>
              <FeatherChevronDown className="size-3" />
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
              className="w-full justify-between text-neutral-600 hover:bg-neutral-50"
            >
              <span className="font-medium">FP_DE</span>
              <FeatherChevronDown className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>FP_DE (Germany)</DropdownMenuItem>
            <DropdownMenuItem>FP_SG (Singapore)</DropdownMenuItem>
            <DropdownMenuItem>FP_AR (Argentina)</DropdownMenuItem>
            <DropdownMenuItem>FP_UK (United Kingdom)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <SidebarWithSections.NavItem icon={<FeatherSettings />}>
          Settings
        </SidebarWithSections.NavItem>
      </div>
    </SidebarWithSections>
  );
}
