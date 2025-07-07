"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Users, MessageSquare, Clock, CheckCircle, Star } from "lucide-react"
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
    },
    {
      title: "Taxa de Resolução",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle,
    },
    {
      title: "Tempo Médio",
      value: "1.2min",
      change: "-15%",
      trend: "down",
      icon: Clock,
    },
    {
      title: "Satisfação",
      value: "4.8/5",
      change: "+0.3",
      trend: "up",
      icon: Star,
    },
  ]

  // Dados para gráfico de conversas ao longo do tempo
  const conversationData = [
    { time: "00:00", conversas: 45, resolvidas: 42, transferidas: 3 },
    { time: "04:00", conversas: 23, resolvidas: 21, transferidas: 2 },
    { time: "08:00", conversas: 156, resolvidas: 148, transferidas: 8 },
    { time: "12:00", conversas: 234, resolvidas: 220, transferidas: 14 },
    { time: "16:00", conversas: 189, resolvidas: 178, transferidas: 11 },
    { time: "20:00", conversas: 98, resolvidas: 92, transferidas: 6 },
  ]

  // Dados para gráfico de performance semanal
  const weeklyData = [
    { dia: "Seg", conversas: 1240, satisfacao: 4.6, tempo_medio: 1.8 },
    { dia: "Ter", conversas: 1456, satisfacao: 4.7, tempo_medio: 1.5 },
    { dia: "Qua", conversas: 1389, satisfacao: 4.8, tempo_medio: 1.3 },
    { dia: "Qui", conversas: 1678, satisfacao: 4.9, tempo_medio: 1.2 },
    { dia: "Sex", conversas: 1834, satisfacao: 4.8, tempo_medio: 1.4 },
    { dia: "Sab", conversas: 892, satisfacao: 4.7, tempo_medio: 1.6 },
    { dia: "Dom", conversas: 567, satisfacao: 4.6, tempo_medio: 1.9 },
  ]

  // Dados para gráfico de categorias
  const categoryData = [
    { name: "Suporte Técnico", value: 35, color: "#662d91" },
    { name: "Vendas", value: 28, color: "#8b5fbf" },
    { name: "Logística", value: 22, color: "#a785d1" },
    { name: "Financeiro", value: 15, color: "#c3abe3" },
  ]

  // Dados para gráfico de canais
  const channelData = [
    { canal: "WhatsApp", conversas: 1247, crescimento: 12 },
    { canal: "Website", conversas: 856, crescimento: 8 },
    { canal: "Telegram", conversas: 432, crescimento: -3 },
    { canal: "Email", conversas: 234, crescimento: 15 },
    { canal: "Slack", conversas: 78, crescimento: 22 },
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
          <p className="text-gray-600">Acompanhe o desempenho do seu atendimento inteligente</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "24h" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("24h")}
            className={timeRange === "24h" ? "bg-[#662d91] hover:bg-[#552470]" : ""}
          >
            24h
          </Button>
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
            className={timeRange === "7d" ? "bg-[#662d91] hover:bg-[#552470]" : ""}
          >
            7 dias
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
            className={timeRange === "30d" ? "bg-[#662d91] hover:bg-[#552470]" : ""}
          >
            30 dias
          </Button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-3xl font-bold text-[#662d91]">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-green-600" />
                      )}
                      <span className="text-sm text-green-600">{metric.change}</span>
                    </div>
                  </div>
                  <Icon className="w-8 h-8 text-[#662d91]" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Conversas em Tempo Real */}
      <Card>
        <CardHeader>
          <CardTitle>Conversas em Tempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="conversas"
                  stackId="1"
                  stroke="#662d91"
                  fill="#662d91"
                  fillOpacity={0.6}
                  name="Total de Conversas"
                />
                <Area
                  type="monotone"
                  dataKey="resolvidas"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Resolvidas"
                />
                <Area
                  type="monotone"
                  dataKey="transferidas"
                  stackId="3"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                  name="Transferidas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Semanal */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="conversas" fill="#662d91" name="Conversas" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="satisfacao"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Satisfação"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
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
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Canais de Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="canal" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversas" fill="#662d91" name="Conversas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Questions */}
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Mais Frequentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topQuestions.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{item.count} vezes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Interactions */}
        <Card>
          <CardHeader>
            <CardTitle>Interações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInteractions.map((interaction) => (
                <div key={interaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#662d91] bg-opacity-10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#662d91]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{interaction.user}</p>
                      <p className="text-sm text-gray-600">{interaction.query}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        interaction.status === "Resolvido"
                          ? "bg-green-100 text-green-800"
                          : interaction.status === "Em andamento"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {interaction.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{interaction.time}</p>
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