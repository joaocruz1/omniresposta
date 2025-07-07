"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Users, MessageSquare, Clock, CheckCircle, Star, Activity, Zap, BarChart3, HelpCircle } from "lucide-react"
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
} from "recharts"
import { useState } from "react"

export function Analytics() {
  const [timeRange, setTimeRange] = useState("7d")

  const metrics = [
    {
      title: "Conversas Hoje",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Taxa de Resolução",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Tempo Médio",
      value: "1.2min",
      change: "-15%",
      trend: "down",
      icon: Clock,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Satisfação",
      value: "4.8/5",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  const conversationData = [
    { time: "00:00", conversas: 45, resolvidas: 42, transferidas: 3 },
    { time: "04:00", conversas: 23, resolvidas: 21, transferidas: 2 },
    { time: "08:00", conversas: 156, resolvidas: 148, transferidas: 8 },
    { time: "12:00", conversas: 234, resolvidas: 220, transferidas: 14 },
    { time: "16:00", conversas: 189, resolvidas: 178, transferidas: 11 },
    { time: "20:00", conversas: 98, resolvidas: 92, transferidas: 6 },
  ]

  const weeklyData = [
    { dia: "Seg", conversas: 1240, satisfacao: 4.6 },
    { dia: "Ter", conversas: 1456, satisfacao: 4.7 },
    { dia: "Qua", conversas: 1389, satisfacao: 4.8 },
    { dia: "Qui", conversas: 1678, satisfacao: 4.9 },
    { dia: "Sex", conversas: 1834, satisfacao: 4.8 },
    { dia: "Sab", conversas: 892, satisfacao: 4.7 },
    { dia: "Dom", conversas: 567, satisfacao: 4.6 },
  ]

  const categoryData = [
    { name: "Suporte Técnico", value: 35, color: "var(--chart-1)" },
    { name: "Vendas", value: 28, color: "var(--chart-2)" },
    { name: "Logística", value: 22, color: "var(--chart-3)" },
    { name: "Financeiro", value: 15, color: "var(--chart-4)" },
  ]

  const channelData = [
    { canal: "WhatsApp", conversas: 1247 },
    { canal: "Website", conversas: 856 },
    { canal: "Telegram", conversas: 432 },
    { canal: "Email", conversas: 234 },
    { canal: "Slack", conversas: 78 },
  ]

  const topQuestions = [
    { question: "Como rastrear meu pedido?", count: 342, category: "Logística" },
    { question: "Qual o prazo de entrega?", count: 298, category: "Logística" },
    { question: "Como cancelar um pedido?", count: 256, category: "Vendas" },
    { question: "Política de devolução", count: 189, category: "Suporte" },
    { question: "Formas de pagamento", count: 167, category: "Vendas" },
  ]

  const recentInteractions = [
    { id: 1, user: "Cliente #1247", query: "Problema com entrega", status: "Resolvido", time: "2 min atrás" },
    { id: 2, user: "Cliente #1248", query: "Dúvida sobre produto", status: "Em andamento", time: "5 min atrás" },
    { id: 3, user: "Cliente #1249", query: "Cancelamento", status: "Transferido", time: "8 min atrás" },
    { id: 4, user: "Cliente #1250", query: "Suporte técnico", status: "Resolvido", time: "12 min atrás" },
  ]
  
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
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Analytics & Insights</h2>
          <p className="text-purple-200">Acompanhe o desempenho do seu atendimento inteligente</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "24h" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("24h")}
            className={timeRange === '24h' ? 'bg-purple-600 text-white border-purple-500' : 'text-purple-200 border-purple-500/30 hover:bg-purple-500/10 hover:text-white'}
          >
            24h
          </Button>
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
            className={timeRange === '7d' ? 'bg-purple-600 text-white border-purple-500' : 'text-purple-200 border-purple-500/30 hover:bg-purple-500/10 hover:text-white'}
          >
            7 dias
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
            className={timeRange === '30d' ? 'bg-purple-600 text-white border-purple-500' : 'text-purple-200 border-purple-500/30 hover:bg-purple-500/10 hover:text-white'}
          >
            30 dias
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5`} />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-200">{metric.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{metric.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${metric.bgColor} glass-card`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Gráfico de Conversas em Tempo Real */}
      <Card className="glass-card-dark border-purple-500/20 glow-hover">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Conversas em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversationData}>
                <defs>
                  <linearGradient id="conversas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="resolvidas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="transferidas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", border: "1px solid #4a0e78", borderRadius: "12px", backdropFilter: "blur(10px)" }} />
                <Legend />
                <Area type="monotone" dataKey="conversas" stroke="var(--chart-1)" fill="url(#conversas)" name="Total" />
                <Area type="monotone" dataKey="resolvidas" stroke="var(--chart-2)" fill="url(#resolvidas)" name="Resolvidas" />
                <Area type="monotone" dataKey="transferidas" stroke="var(--chart-5)" fill="url(#transferidas)" name="Transferidas" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Semanal */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Performance Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="dia" stroke="#9ca3af" />
                  <YAxis yAxisId="left" stroke="#9ca3af" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", border: "1px solid #4a0e78", borderRadius: "12px", backdropFilter: "blur(10px)" }}/>
                  <Legend />
                  <Bar yAxisId="left" dataKey="conversas" fill="var(--chart-1)" name="Conversas" />
                  <Line yAxisId="right" type="monotone" dataKey="satisfacao" stroke="var(--chart-2)" strokeWidth={3} name="Satisfação" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por Categoria */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-400" />
                Distribuição por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                    stroke="#111827"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", border: "1px solid #4a0e78", borderRadius: "12px", backdropFilter: "blur(10px)" }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Canais de Atendimento */}
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
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0.6} />
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
                  <Bar dataKey="conversas" fill="url(#barGradient)" name="Conversas" radius={[4, 4, 0, 0]} />
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
                <HelpCircle className="w-5 h-5 text-purple-400"/>
                Perguntas Mais Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topQuestions.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs text-purple-300 border-purple-500/30">
                        {item.category}
                      </Badge>
                      <span className="text-sm text-purple-300">{item.count} vezes</span>
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
                <div key={interaction.id} className="flex items-center justify-between p-3 border-b border-purple-500/10 hover:bg-purple-500/10 transition-colors rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20">
                      <Users className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{interaction.user}</p>
                      <p className="text-sm text-purple-200">{interaction.query}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getInteractionStatusStyle(interaction.status)}>
                      {interaction.status}
                    </Badge>
                    <p className="text-xs text-purple-300 mt-1">{interaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}