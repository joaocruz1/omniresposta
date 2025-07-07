"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Pause, Edit, Copy, Trash2, GitBranch, MessageSquare, Bot, Users } from "lucide-react"

export function FlowBuilder() {
  const flows = [
    {
      id: 1,
      name: "Atendimento Inicial",
      description: "Fluxo principal para primeiros contatos",
      status: "Ativo",
      interactions: 1247,
      success_rate: 94,
      last_updated: "2 horas atrás",
    },
    {
      id: 2,
      name: "Suporte Técnico",
      description: "Resolução de problemas técnicos",
      status: "Ativo",
      interactions: 856,
      success_rate: 87,
      last_updated: "1 dia atrás",
    },
    {
      id: 3,
      name: "Vendas - Produtos",
      description: "Fluxo para consultas sobre produtos",
      status: "Pausado",
      interactions: 432,
      success_rate: 91,
      last_updated: "3 dias atrás",
    },
    {
      id: 4,
      name: "Pós-Venda",
      description: "Acompanhamento após compra",
      status: "Rascunho",
      interactions: 0,
      success_rate: 0,
      last_updated: "5 dias atrás",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800"
      case "Pausado":
        return "bg-yellow-100 text-yellow-800"
      case "Rascunho":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Construtor de Fluxos IA</h2>
          <p className="text-gray-600">Crie e gerencie fluxos de atendimento inteligentes</p>
        </div>
        <Button className="bg-[#662d91] hover:bg-[#552470]">
          <Plus className="w-4 h-4 mr-2" />
          Novo Fluxo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card Fluxos Ativos */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-5" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Fluxos Ativos</p>
                <p className="text-3xl font-bold text-white mt-1">12</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 glass-card">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Interações Hoje */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-5" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Interações Hoje</p>
                <p className="text-3xl font-bold text-white mt-1">2,847</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 glass-card">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Taxa de Sucesso */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-5" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Taxa de Sucesso</p>
                <p className="text-3xl font-bold text-white mt-1">91%</p>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10 glass-card">
                <Bot className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Usuários Ativos */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-5" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Usuários Ativos</p>
                <p className="text-3xl font-bold text-white mt-1">1,456</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-500/10 glass-card">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flows List */}
      <Card>
        <CardHeader>
          <CardTitle>Fluxos de Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flows.map((flow) => (
              <div key={flow.id} className="glass-card-dark border-purple-500/20 glow-hover rounded-2xl p-6 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  {/* Lado Esquerdo: Ícone e Detalhes */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 glass-card">
                      <GitBranch className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{flow.name}</h3>
                      <p className="text-purple-200">{flow.description}</p>
                    </div>
                  </div>

                  {/* Lado Direito: Status e Ações */}
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(flow.status)}>{flow.status}</Badge>
                    <div className="flex items-center gap-1">
                      {flow.status === "Ativo" ? (
                        <Button variant="ghost" size="icon" title="Pausar" className="text-purple-200 hover:text-white hover:bg-purple-500/10">
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" title="Ativar" className="text-purple-200 hover:text-white hover:bg-purple-500/10">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" title="Editar" className="text-purple-200 hover:text-white hover:bg-purple-500/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Duplicar" className="text-purple-200 hover:text-white hover:bg-purple-500/10">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Excluir" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Estatísticas do Fluxo */}
                <div className="grid grid-cols-3 gap-6 text-sm border-t border-purple-500/10 pt-4">
                  <div>
                    <p className="text-muted-foreground">Interações</p>
                    <p className="font-semibold text-white">{flow.interactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Taxa de Sucesso</p>
                    <p className="font-semibold text-green-400">{flow.success_rate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Última Atualização</p>
                    <p className="font-semibold text-white">{flow.last_updated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Plus className="w-6 h-6" />
              Criar Fluxo do Zero
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Copy className="w-6 h-6" />
              Usar Template
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <GitBranch className="w-6 h-6" />
              Importar Fluxo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
