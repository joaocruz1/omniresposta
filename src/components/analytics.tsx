"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
  Star,
  Activity,
  Zap,
  BarChart3,
  HelpCircle,
  PieChart as PieChartIcon, // Renomeado para evitar conflito
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useApi } from "@/hooks/use-api"; // Importando seu hook
import type { AnalyticsData } from "@/lib/types"; // Importando o tipo

export function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  // Chamada à API para buscar os dados de analytics
  const {
    data: analyticsData,
    loading,
    error,
  } = useApi<AnalyticsData>(`/api/analytics?timeRange=${timeRange}`);

  const getInteractionStatusStyle = (status: string) => {
    switch (status) {
      case "Resolvido":
        return "bg-green-500/10 text-green-400 border border-green-500/20";
      case "Em andamento":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      case "Transferido":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  // Exibição de loading e erro
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Carregando dados de analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">
          Erro ao carregar dados: {error}
        </div>
      </div>
    );
  }

  // Dados para os gráficos e cartões virão de `analyticsData`
  // Você precisará ajustar os gráficos para usar os dados da API.
  // Exemplo para `channelData` e `topQuestions`:
  const channelData = analyticsData?.channelData || [];
  const topQuestions = analyticsData?.topQuestions || [];
  const recentInteractions = analyticsData?.recentInteractions || [];

  return (
    <div className="space-y-8">
      {/* Cabeçalho com filtros */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Analytics & Insights
          </h2>
          <p className="text-purple-200">
            Acompanhe o desempenho do seu atendimento inteligente
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["24h", "7d", "30d"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={
                timeRange === range
                  ? "bg-purple-600 text-white border-purple-500"
                  : "text-purple-200 border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
              }
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Gráfico de Canais de Atendimento */}
      <Card className="glass-card-dark border-purple-500/20 glow-hover">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Performance por Canal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <defs>
                  <linearGradient
                    id="barGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--chart-1)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-4)"
                      stopOpacity={0.6}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="canal" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.8)",
                    border: "1px solid #4a0e78",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Bar
                  dataKey="conversas"
                  fill="url(#barGradient)"
                  name="Conversas"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Perguntas Mais Frequentes */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              Perguntas Mais Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topQuestions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-xs text-purple-300 border-purple-500/30"
                      >
                        {item.category}
                      </Badge>
                      <span className="text-sm text-purple-300">
                        {item.count} vezes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interações Recentes */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Interações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInteractions.map((interaction) => (
                <div
                  key={interaction.id}
                  className="flex items-center justify-between p-3 border-b border-purple-500/10 hover:bg-purple-500/10 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20">
                      <Users className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {interaction.user}
                      </p>
                      <p className="text-sm text-purple-200">
                        {interaction.query}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={getInteractionStatusStyle(interaction.status)}
                    >
                      {interaction.status}
                    </Badge>
                    <p className="text-xs text-purple-300 mt-1">
                      {interaction.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}