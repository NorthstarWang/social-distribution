"use client";
import React, { useState, ReactNode, useEffect } from 'react';
import { AuthContext, AuthorContext } from '@/components/context/authContext';
import { Author } from '@/types/author';
import { axiosInstance } from '@/lib/axiosInstance';
import { AuthResponse } from '@/types/auth';
import { useRouter, usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress"
import path from 'path';
import { toast } from 'sonner';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const authValue = { isAuthenticated, setIsAuthenticated };
  const authorValue = { author, setAuthor };

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setProgress(33);
    axiosInstance
      .get("/auth/check-login/", { withCredentials: true })
      .then((response: AuthResponse) => {
        setProgress(66);
        if (response.data.logged_in) {
          setIsAuthenticated(true);
          setAuthor(response.data.user as Author);
          if (pathname === "/authentication/") {
            router.push("/");
          }
        } else {
          setIsAuthenticated(false);
          setAuthor(null);
        }
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      })
      .catch((error) => {
        toast.error("Error checking login status", error);
      });
  }, [isAuthenticated, setIsAuthenticated, setAuthor, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      <AuthorContext.Provider value={authorValue}>
        {children}
      </AuthorContext.Provider>
    </AuthContext.Provider>
  );
};
