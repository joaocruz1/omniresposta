"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Pause, Edit, Copy, Trash2, GitBranch, MessageSquare, Bot, Users } from "lucide-react"
import { useApi } from "@/hooks/use-api" // Você usaria seu hook real aqui
import { JsonValue } from "@prisma/client/runtime/library" // Exemplo, ajuste conforme seu projeto
import { useState } from "react"

// Definição de tipo para o AIFlow. Corresponde aos erros encontrados.
// Verifique se está igual ao seu arquivo de tipos real (ex: /lib/types.ts)
export interface AIFlow {
  id: string; // ✅ Corrigido para string
  name: string;
  description: string | null;
  status: "Ativo" | "Pausado" | "Rascunho";
  interactions: number;
  successRate: number; // ✅ Corrigido para camelCase
  flowConfig: JsonValue;
  createdAt: Date;
  updatedAt: Date; // ✅ Corrigido para camelCase
  companyId: string;
}

// Mock do hook useApi para o exemplo funcionar
const useApiMock = <T,>(url: string): { data: T | null; loading: boolean; error: Error | null; refetch: () => void } => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const refetch = () => {
        setLoading(true);
        setTimeout(() => {
            setData([
                { id: "clx123abc", name: "Fluxo de Boas-Vindas", description: "Recepciona novos clientes no WhatsApp.", status: "Ativo", interactions: 12543, successRate: 98, flowConfig: {}, createdAt: new Date(), updatedAt: new Date(Date.now() - 86400000), companyId: "comp_1" },
                { id: "clx456def", name: "Recuperação de Carrinho", description: "Lembra clientes sobre itens deixados.", status: "Pausado", interactions: 8765, successRate: 76, flowConfig: {}, createdAt: new Date(), updatedAt: new Date(Date.now() - 86400000 * 3), companyId: "comp_1" },
                { id: "clx789ghi", name: "Fluxo de Suporte Nível 1", description: "Resolve dúvidas comuns antes de transferir.", status: "Ativo", interactions: 23456, successRate: 92, flowConfig: {}, createdAt: new Date(), updatedAt: new Date(Date.now() - 86400000 * 2), companyId: "comp_1" },
            ] as any);
            setLoading(false);
        }, 1000);
    };
    useState(() => { refetch() });
    return { data, loading, error, refetch };
};

export function FlowBuilder() {
  const { data: flows, loading, error, refetch } = useApiMock<AIFlow[]>("/api/ai-flows")

  // ✅ CORREÇÃO: flowId agora é 'string'
  const handleToggleFlow = async (flowId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Ativo" ? "Pausado" : "Ativo"

    try {
      await fetch(`/api/ai-flows/${flowId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      refetch()
    } catch (error) {
      console.error("Erro ao atualizar fluxo:", error)
    }
  }

  // ✅ CORREÇÃO: flowId agora é 'string'
  const handleDeleteFlow = async (flowId: string) => {
    if (confirm("Tem certeza que deseja excluir este fluxo?")) {
      try {
        await fetch(`/api/ai-flows/${flowId}`, { method: "DELETE" })
        refetch()
      } catch (error) {
        console.error("Erro ao deletar fluxo:", error)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-500/10 text-green-400 border border-green-500/20"
      case "Pausado":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
      case "Rascunho":
        return "bg-gray-500/10 text-gray-400 border border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border border-gray-500/20"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Carregando fluxos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Erro ao carregar fluxos: {error.message}</div>
      </div>
    )
  }

  // Calcular estatísticas
  const activeFlows = flows?.filter((flow) => flow.status === "Ativo").length || 0
  const totalInteractions = flows?.reduce((sum, flow) => sum + flow.interactions, 0) || 0
  // ✅ CORREÇÃO: Usando 'successRate'
  const averageSuccessRate = flows?.length ? flows.reduce((sum, flow) => sum + flow.successRate, 0) / flows.length : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Construtor de Fluxos IA</h2>
          <p className="text-purple-200">Crie e gerencie fluxos de atendimento inteligentes</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white glow-purple">
          <Plus className="w-4 h-4 mr-2" />
          Novo Fluxo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card Fluxos Ativos */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Fluxos Ativos</p>
                <p className="text-3xl font-bold text-white mt-1">{activeFlows}</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10">
                <GitBranch className="w-8 h-8 text-purple-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Interações Total */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Interações Total</p>
                <p className="text-3xl font-bold text-white mt-1">{totalInteractions.toLocaleString("pt-BR")}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10">
                <MessageSquare className="w-8 h-8 text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Taxa de Sucesso */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Taxa de Sucesso</p>
                <p className="text-3xl font-bold text-white mt-1">{averageSuccessRate.toFixed(0)}%</p>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10">
                <Bot className="w-8 h-8 text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Total de Fluxos */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Total de Fluxos</p>
                <p className="text-3xl font-bold text-white mt-1">{flows?.length || 0}</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-500/10">
                <Users className="w-8 h-8 text-orange-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flows List */}
      <Card className="glass-card-dark border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Seus Fluxos de Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flows?.map((flow) => (
              <div
                key={flow.id}
                className="glass-card-dark border-purple-500/10 hover:border-purple-500/30 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10">
                      <GitBranch className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{flow.name}</h3>
                      <p className="text-purple-300 text-sm">{flow.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(flow.status)} font-semibold`}>{flow.status}</Badge>
                    <div className="flex items-center gap-1">
                      {flow.status === "Ativo" ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Pausar"
                          className="text-purple-200 hover:text-white hover:bg-purple-500/10"
                          onClick={() => handleToggleFlow(flow.id, flow.status)}
                        >
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Ativar"
                          className="text-purple-200 hover:text-white hover:bg-purple-500/10"
                          onClick={() => handleToggleFlow(flow.id, flow.status)}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" title="Editar" className="text-purple-200 hover:text-white hover:bg-purple-500/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Duplicar" className="text-purple-200 hover:text-white hover:bg-purple-500/10">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Excluir"
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => handleDeleteFlow(flow.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-sm border-t border-purple-500/20 pt-4">
                  <div>
                    <p className="text-purple-300">Interações</p>
                    <p className="font-semibold text-white">{flow.interactions.toLocaleString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-purple-300">Taxa de Sucesso</p>
                    {/* ✅ CORREÇÃO: Usando 'successRate' */}
                    <p className="font-semibold text-green-400">{flow.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-purple-300">Última Atualização</p>
                    {/* ✅ CORREÇÃO: Usando 'updatedAt' */}
                    <p className="font-semibold text-white">{new Date(flow.updatedAt).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}