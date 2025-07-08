"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Server, Database, Wifi, AlertTriangle, CheckCircle, Clock, RefreshCw } from "lucide-react"
import {
  LineChart,
  Line,
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
import { useState, useEffect } from "react"
import { useApi } from "@/hooks/use-api" // Você usaria seu hook real aqui

// Mock do hook useApi para o exemplo funcionar
const useApiMock = <T,>(url: string): { data: T | null; loading: boolean; error: Error | null; refetch: () => void } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      if (url === "/api/system/alerts") {
        setData([
          { id: 1, type: "error", message: "Falha na conexão com o banco de dados vetorial.", createdAt: new Date().toISOString() },
          { id: 2, type: "warning", message: "Uso de CPU acima de 85% no serviço de IA.", createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString() },
          { id: 3, type: "success", message: "Backup do sistema concluído com sucesso.", createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
        ] as any);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};
// Fim do mock


export function Monitoring() {
  const [realTimeData, setRealTimeData] = useState([
    { time: "14:00", cpu: 45, memoria: 67, rede: 23 },
    { time: "14:05", cpu: 52, memoria: 71, rede: 28 },
    { time: "14:10", cpu: 48, memoria: 69, rede: 31 },
    { time: "14:15", cpu: 67, memoria: 73, rede: 25 },
    { time: "14:20", cpu: 71, memoria: 76, rede: 29 },
    { time: "14:25", cpu: 63, memoria: 74, rede: 33 },
  ])

  // Vamos manter a chamada do hook como ela é, pois o componente irá lidar com o estado nulo.
  const { data: alerts, loading, error, refetch } = useApiMock<any[]>("/api/system/alerts")

  // Simular dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => {
        const newTime = new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
        const newData = {
          time: newTime,
          cpu: Math.floor(Math.random() * 30) + 50,
          memoria: Math.floor(Math.random() * 20) + 60,
          rede: Math.floor(Math.random() * 20) + 20,
        }
        return [...prev.slice(-5), newData]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const systemStatus = [
    { service: "API Principal", status: "Online", uptime: "99.9%", response: "45ms" },
    { service: "Banco Vetorial", status: "Online", uptime: "99.8%", response: "12ms" },
    { service: "Processamento IA", status: "Online", uptime: "99.7%", response: "230ms" },
    { service: "WebSocket", status: "Degradado", uptime: "98.2%", response: "89ms" },
    { service: "Cache Redis", status: "Online", uptime: "100%", response: "3ms" },
  ]

  const responseTimeData = [
    { service: "API", tempo: 45 },
    { service: "Banco", tempo: 12 },
    { service: "IA", tempo: 230 },
    { service: "WebSocket", tempo: 89 },
    { service: "Cache", tempo: 3 },
  ]

  const uptimeData = [
    { dia: "Seg", uptime: 99.9 },
    { dia: "Ter", uptime: 99.8 },
    { dia: "Qua", uptime: 100 },
    { dia: "Qui", uptime: 99.7 },
    { dia: "Sex", uptime: 99.9 },
    { dia: "Sab", uptime: 99.8 },
    { dia: "Dom", uptime: 99.9 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Online":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "Degradado":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "Offline":
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-500/10 text-green-400 border border-green-500/20"
      case "Degradado":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
      case "Offline":
        return "bg-red-500/10 text-red-400 border border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border border-gray-500/20"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return (
          <div className="p-2 rounded-full bg-red-500/10">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
        )
      case "warning":
        return (
          <div className="p-2 rounded-full bg-yellow-500/10">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
        )
      case "success":
        return (
          <div className="p-2 rounded-full bg-green-500/10">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
        )
      default:
        return (
          <div className="p-2 rounded-full bg-blue-500/10">
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
        )
    }
  }

  const formatAlertTime = (createdAt: string) => {
    const now = new Date()
    const alertTime = new Date(createdAt)
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "agora mesmo"
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min atrás`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hora${hours > 1 ? "s" : ""} atrás`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} dia${days > 1 ? "s" : ""} atrás`
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Monitoramento do Sistema</h2>
          <p className="text-purple-200">Status em tempo real dos serviços OmniResposta</p>
        </div>
        <Button
          variant="outline"
          className="text-purple-200 border-purple-500/30 hover:bg-purple-500/10 hover:text-white bg-transparent"
          onClick={refetch}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Atualizando..." : "Atualizar"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Cards de Visão Geral */}
        <Card className="glass-card-dark border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Status Geral</p>
                <p className="text-2xl font-bold text-green-400">Operacional</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card-dark border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Uptime</p>
                <p className="text-2xl font-bold text-white">99.8%</p>
              </div>
              <Activity className="w-8 h-8 text-purple-300" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card-dark border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Resp. Média</p>
                <p className="text-2xl font-bold text-white">76ms</p>
              </div>
              <Server className="w-8 h-8 text-purple-300" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card-dark border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Alertas Ativos</p>
                {/* ✅ CORREÇÃO 1: `?.` antes de `length` e `|| 0` para o caso de ser nulo */}
                <p className="text-2xl font-bold text-yellow-400">{alerts?.length || 0}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <Card className="glass-card-dark border-purple-500/20 glow-hover">
        <CardHeader>
          <CardTitle className="text-white">Performance em Tempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.8)",
                    border: "1px solid #4a0e78",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#8b5cf6" strokeWidth={2} name="CPU (%)" dot={false} />
                <Line type="monotone" dataKey="memoria" stroke="#34d399" strokeWidth={2} name="Memória (%)" dot={false} />
                <Line type="monotone" dataKey="rede" stroke="#f472b6" strokeWidth={2} name="Rede (MB/s)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* (O resto do código dos gráficos permanece o mesmo...) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card-dark border-purple-500/20 glow-hover">
          <CardHeader>
            <CardTitle className="text-white">Tempo de Resposta por Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="service" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      border: "1px solid #4a0e78",
                      borderRadius: "12px",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Bar dataKey="tempo" fill="url(#barGradient)" name="Tempo (ms)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-dark border-purple-500/20 glow-hover">
          <CardHeader>
            <CardTitle className="text-white">Uptime Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <defs>
                    <linearGradient id="resolvidas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="dia" stroke="#9ca3af" />
                  <YAxis domain={[98, 100]} stroke="#9ca3af" unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      border: "1px solid #4a0e78",
                      borderRadius: "12px",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="uptime"
                    stroke="#34d399"
                    fill="url(#resolvidas)"
                    name="Uptime (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Status dos Serviços e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Status dos Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemStatus.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg hover:bg-purple-500/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <h4 className="font-medium text-white">{service.service}</h4>
                      <p className="text-sm text-purple-300">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{service.response}</p>
                      <p className="text-xs text-purple-300">Resp. time</p>
                    </div>
                    <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Alertas e Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-purple-200 py-10">Carregando alertas...</div>
            ) : error ? (
              <div className="text-center text-red-400 py-10">Erro ao carregar alertas.</div>
            ) : (
              <div className="space-y-3">
                {/* ✅ CORREÇÃO 2: `?.` antes de `map` para evitar o erro quando alerts for nulo */}
                {alerts?.map((alert: any) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg"
                  >
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{alert.message}</p>
                      <p className="text-xs text-purple-300">{formatAlertTime(alert.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  )
}