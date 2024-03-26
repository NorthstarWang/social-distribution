import { ReactNode } from "react";
import { Metadata } from "next"

interface AuthenticationLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication page built using the components.",
  }

export default function AuthenticationLayout({ children }: AuthenticationLayoutProps) {
  return (
    <>{children}</>
  );
}
