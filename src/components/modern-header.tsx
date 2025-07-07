"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, User, Zap, Settings } from "lucide-react"

export function ModernHeader() {
  return (
    <header className="glass-card-dark border-b border-purple-500/20 px-6 py-4 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-purple-900/10" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Painel de Controle</h2>
            <p className="text-purple-200 text-sm">Gerencie seu atendimento inteligente</p>
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

          <Button
            variant="ghost"
            size="icon"
            className="glass-card hover:bg-purple-500/20 text-purple-200 hover:text-white glow-hover"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="glass-card hover:bg-purple-500/20 text-purple-200 hover:text-white glow-hover"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
