"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Database, GitBranch, BarChart3, Monitor, SettingsIcon, Bot, FileText } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "database", label: "Banco Vetorial", icon: Database },
    { id: "flows", label: "Fluxos IA", icon: GitBranch },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "monitoring", label: "Monitoramento", icon: Monitor },
    { id: "settings", label: "Configurações", icon: SettingsIcon },
  ]

  return (
    <div className="w-64 bg-[#662d91] text-white flex flex-col">
      <div className="p-6 border-b border-purple-600">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">OmniResposta</h1>
            <p className="text-sm text-purple-200">NextLayer Dev</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left hover:bg-purple-600",
                  activeTab === item.id && "bg-purple-600",
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-purple-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Sistema v2.0</p>
            <p className="text-purple-200">Atendimento Sem Limites</p>
          </div>
        </div>
      </div>
    </div>
  )
}
