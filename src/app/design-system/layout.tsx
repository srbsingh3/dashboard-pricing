import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storybook • Component Library",
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
