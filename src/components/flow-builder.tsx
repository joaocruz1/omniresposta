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
          <h2 className="text-2xl font-bold text-gray-900">Construtor de Fluxos IA</h2>
          <p className="text-gray-600">Crie e gerencie fluxos de atendimento inteligentes</p>
        </div>
        <Button className="bg-[#662d91] hover:bg-[#552470]">
          <Plus className="w-4 h-4 mr-2" />
          Novo Fluxo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fluxos Ativos</p>
                <p className="text-3xl font-bold text-[#662d91]">12</p>
              </div>
              <GitBranch className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interações Hoje</p>
                <p className="text-3xl font-bold text-[#662d91]">2,847</p>
              </div>
              <MessageSquare className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
                <p className="text-3xl font-bold text-green-600">91%</p>
              </div>
              <Bot className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-3xl font-bold text-[#662d91]">1,456</p>
              </div>
              <Users className="w-8 h-8 text-[#662d91]" />
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
              <div key={flow.id} className="border rounded-lg p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#662d91] bg-opacity-10 rounded-lg">
                      <GitBranch className="w-6 h-6 text-[#662d91]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{flow.name}</h3>
                      <p className="text-gray-600">{flow.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(flow.status)}>{flow.status}</Badge>

                    <div className="flex items-center gap-1">
                      {flow.status === "Ativo" ? (
                        <Button variant="ghost" size="icon" title="Pausar">
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" title="Ativar">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" title="Editar">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Duplicar">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Excluir" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-gray-500">Interações</p>
                    <p className="font-semibold text-gray-900">{flow.interactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Taxa de Sucesso</p>
                    <p className="font-semibold text-green-600">{flow.success_rate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Última Atualização</p>
                    <p className="font-semibold text-gray-900">{flow.last_updated}</p>
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
