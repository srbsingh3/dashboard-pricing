"use client";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
