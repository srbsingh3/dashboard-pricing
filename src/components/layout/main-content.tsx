"use client";

interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 overflow-hidden p-2.5">
      {children}
    </main>
  );
}
