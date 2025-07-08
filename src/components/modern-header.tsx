"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, User, Zap, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModernHeader() {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  return (
    <header className="glass-card-dark border-b border-purple-500/20 px-6 py-4 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-purple-900/10" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Painel de Controle</h2>
            <p className="text-purple-200 text-sm">
              {user?.company.name} • {user?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
            <Input
              placeholder="Buscar documentos, fluxos..."
              className="pl-10 w-80 glass-card border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-400"
            />
          </div>

          {/* Action Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="glass-card hover:bg-purple-500/20 text-purple-200 hover:text-white glow-hover"
          >
            <Zap className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="glass-card hover:bg-purple-500/20 text-purple-200 hover:text-white glow-hover relative"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full pulse-glow" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:bg-purple-500/20 text-purple-200 hover:text-white glow-hover"
              >
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card-dark border-purple-500/20">
              <DropdownMenuLabel className="text-white">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-purple-300">{user?.email}</p>
                  <p className="text-xs text-purple-400">{user?.company.name}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-purple-500/20" />
              <DropdownMenuItem className="text-purple-200 hover:bg-purple-500/10 hover:text-white">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
