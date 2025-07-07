"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, MessageSquare, Clock, CheckCircle, Bot, Zap, Activity, Star } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function ModernDashboard() {
  const todayData = [
    { hour: "00", conversas: 12, resolvidas: 11, satisfacao: 4.2 },
    { hour: "02", conversas: 8, resolvidas: 7, satisfacao: 4.1 },
    { hour: "04", conversas: 5, resolvidas: 5, satisfacao: 4.8 },
    { hour: "06", conversas: 15, resolvidas: 14, satisfacao: 4.5 },
    { hour: "08", conversas: 45, resolvidas: 42, satisfacao: 4.6 },
    { hour: "10", conversas: 78, resolvidas: 74, satisfacao: 4.7 },
    { hour: "12", conversas: 95, resolvidas: 89, satisfacao: 4.8 },
    { hour: "14", conversas: 87, resolvidas: 82, satisfacao: 4.9 },
    { hour: "16", conversas: 92, resolvidas: 88, satisfacao: 4.8 },
    { hour: "18", conversas: 65, resolvidas: 61, satisfacao: 4.7 },
    { hour: "20", conversas: 43, resolvidas: 40, satisfacao: 4.6 },
    { hour: "22", conversas: 28, resolvidas: 26, satisfacao: 4.5 },
  ]

  const channelData = [
    { canal: "WhatsApp", conversas: 1247, crescimento: 12 },
    { canal: "Website", conversas: 856, crescimento: 8 },
    { canal: "Telegram", conversas: 432, crescimento: -3 },
    { canal: "Email", conversas: 234, crescimento: 15 },
  ]

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

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="glass-card-dark rounded-2xl p-8 border border-purple-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Bem-vindo ao <span className="gradient-purple bg-clip-text  text-purple-400">OmniResposta</span>
                </h1>
                <p className="text-purple-200 text-lg">
                  Seu sistema de atendimento inteligente está funcionando perfeitamente
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="glass-card rounded-xl p-4 float">
                  <Bot className="w-12 h-12 text-purple-400" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">99.8%</p>
                  <p className="text-purple-200 text-sm">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
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
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">{metric.change}</span>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversas em Tempo Real */}
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
                <AreaChart data={todayData}>
                  <defs>
                    <linearGradient id="conversas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#662d91" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#662d91" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="resolvidas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      border: "1px solid rgba(102, 45, 145, 0.3)",
                      borderRadius: "12px",
                      backdropFilter: "blur(20px)",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="conversas"
                    stroke="#662d91"
                    fillOpacity={1}
                    fill="url(#conversas)"
                    name="Total"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolvidas"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#resolvidas)"
                    name="Resolvidas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance por Canal */}
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
                      <stop offset="5%" stopColor="#662d91" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5fbf" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="canal" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      border: "1px solid rgba(102, 45, 145, 0.3)",
                      borderRadius: "12px",
                      backdropFilter: "blur(20px)",
                    }}
                  />
                  <Bar dataKey="conversas" fill="url(#barGradient)" name="Conversas" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card-dark border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 glass-card border-purple-500/30 hover:bg-purple-500/20 text-white flex-col gap-2 glow-hover">
              <Bot className="w-6 h-6" />
              Novo Fluxo IA
            </Button>
            <Button className="h-20 glass-card border-purple-500/30 hover:bg-purple-500/20 text-white flex-col gap-2 glow-hover">
              <MessageSquare className="w-6 h-6" />
              Ver Conversas
            </Button>
            <Button className="h-20 glass-card border-purple-500/30 hover:bg-purple-500/20 text-white flex-col gap-2 glow-hover">
              <TrendingUp className="w-6 h-6" />
              Relatórios
            </Button>
            <Button className="h-20 glass-card border-purple-500/30 hover:bg-purple-500/20 text-white flex-col gap-2 glow-hover">
              <Users className="w-6 h-6" />
              Gerenciar Equipe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}