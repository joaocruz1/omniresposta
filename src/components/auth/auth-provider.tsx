// src/components/auth/auth-provider.tsx
"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Importe o useRouter
import type { AuthUser } from "@/lib/auth"; // Mude a importação para o tipo

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  signOut: () => Promise<void>; // ✅ Adicione a função signOut ao tipo
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refetchUser: async () => {},
  signOut: async () => {}, // ✅ Adicione o valor padrão
});

// A rota /api/auth/me que você criou na etapa anterior
// é essencial para esta parte funcionar.

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Instancie o router

  const refetchUser = useCallback(async () => {
    // ... sua função refetchUser existente
    try {
      setLoading(true);
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  // ✅ Crie a função de signOut aqui
  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      setUser(null); // Limpa o usuário do estado
      router.push('/login'); // Redireciona para a página de login
      router.refresh(); // Garante que o estado do servidor seja atualizado
    } catch (error) {
      console.error("Falha ao fazer logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refetchUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};