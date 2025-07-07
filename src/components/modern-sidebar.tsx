"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Database, GitBranch, BarChart3, Monitor, SettingsIcon, Bot, Sparkles, Home } from "lucide-react"

interface ModernSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function ModernSidebar({ activeTab, setActiveTab }: ModernSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: Home },
    { id: "database", label: "Banco Vetorial", icon: Database },
    { id: "flows", label: "Fluxos IA", icon: GitBranch },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "monitoring", label: "Monitoramento", icon: Monitor },
    { id: "settings", label: "Configurações", icon: SettingsIcon },
  ]

  return (
    <div className="w-72 glass-card-dark border-r border-purple-500/20 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-purple-900/10" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/10 to-transparent" />

      {/* Header */}
      <div className="relative p-6 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 gradient-purple rounded-xl flex items-center justify-center glow-purple">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full pulse-glow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">OmniResposta</h1>
            <p className="text-sm text-purple-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              NextLayer Dev
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 relative">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-12 rounded-xl transition-all duration-300 relative group",
                  isActive
                    ? "bg-gradient-to-r from-purple-600/30 to-purple-500/20 text-white border border-purple-500/30 glow-purple"
                    : "text-purple-100 hover:bg-purple-500/10 hover:text-white",
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Icon className={cn("w-5 h-5", isActive && "text-purple-300")} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && <div className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full pulse-glow" />}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-500/20 relative">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">Sistema v2.0</p>
              <p className="text-purple-200 text-xs">Atendimento Sem Limites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
