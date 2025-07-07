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

export function Monitoring() {
  const [realTimeData, setRealTimeData] = useState([
    { time: "14:00", cpu: 45, memoria: 67, rede: 23 },
    { time: "14:05", cpu: 52, memoria: 71, rede: 28 },
    { time: "14:10", cpu: 48, memoria: 69, rede: 31 },
    { time: "14:15", cpu: 67, memoria: 73, rede: 25 },
    { time: "14:20", cpu: 71, memoria: 76, rede: 29 },
    { time: "14:25", cpu: 63, memoria: 74, rede: 33 },
  ])

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

  const alerts = [
    { id: 1, type: "warning", message: "Alto uso de CPU no servidor de IA", time: "5 min atrás" },
    { id: 2, type: "info", message: "Backup automático concluído", time: "1 hora atrás" },
    { id: 3, type: "error", message: "Falha temporária na conexão WebSocket", time: "2 horas atrás" },
    { id: 4, type: "success", message: "Atualização do sistema aplicada", time: "4 horas atrás" },
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
        return <div className="p-2 rounded-full bg-red-500/10"><AlertTriangle className="w-5 h-5 text-red-400" /></div>
      case "warning":
        return <div className="p-2 rounded-full bg-yellow-500/10"><AlertTriangle className="w-5 h-5 text-yellow-400" /></div>
      case "success":
        return <div className="p-2 rounded-full bg-green-500/10"><CheckCircle className="w-5 h-5 text-green-400" /></div>
      default:
        return <div className="p-2 rounded-full bg-blue-500/10"><Activity className="w-5 h-5 text-blue-400" /></div>
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Monitoramento do Sistema</h2>
          <p className="text-purple-200">Status em tempo real dos serviços OmniResposta</p>
        </div>
        <Button variant="outline" className="text-purple-200 border-purple-500/30 hover:bg-purple-500/10 hover:text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* Visão Geral do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <p className="text-2xl font-bold text-yellow-400">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance em Tempo Real */}
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
                <Tooltip contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", border: "1px solid #4a0e78", borderRadius: "12px", backdropFilter: "blur(10px)" }} />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="var(--chart-1)" strokeWidth={2} name="CPU (%)" />
                <Line type="monotone" dataKey="memoria" stroke="var(--chart-2)" strokeWidth={2} name="Memória (%)" />
                <Line type="monotone" dataKey="rede" stroke="var(--chart-3)" strokeWidth={2} name="Rede (MB/s)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tempo de Resposta */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover">
          <CardHeader>
            <CardTitle className="text-white">Tempo de Resposta por Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="service" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", border: "1px solid #4a0e78", borderRadius: "12px", backdropFilter: "blur(10px)" }} />
                  <Bar dataKey="tempo" fill="url(#barGradient)" name="Tempo (ms)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Uptime Semanal */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover">
          <CardHeader>
            <CardTitle className="text-white">Uptime Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="dia" stroke="#9ca3af" />
                  <YAxis domain={[98, 100]} stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(17, 24, 39, 0.8)", border: "1px solid #4a0e78", borderRadius: "12px", backdropFilter: "blur(10px)" }} />
                  <Area type="monotone" dataKey="uptime" stroke="var(--chart-2)" fill="url(#resolvidas)" name="Uptime (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status dos Serviços */}
      <Card className="glass-card-dark border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Status dos Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg hover:bg-purple-500/10 transition-colors">
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
                    <p className="text-xs text-purple-300">Tempo de resposta</p>
                  </div>
                  <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      <Card className="glass-card-dark border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Alertas e Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="font-medium text-white">{alert.message}</p>
                  <p className="text-sm text-purple-300">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Uso de Recursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Uso de Recursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2 text-purple-200">
                  <span>CPU</span>
                  <span className="text-white font-semibold">67%</span>
                </div>
                <div className="w-full bg-purple-500/10 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full" style={{ width: "67%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-purple-200">
                  <span>Memória</span>
                  <span className="text-white font-semibold">45%</span>
                </div>
                <div className="w-full bg-purple-500/10 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-purple-200">
                  <span>Armazenamento</span>
                  <span className="text-white font-semibold">89%</span>
                </div>
                <div className="w-full bg-purple-500/10 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2.5 rounded-full" style={{ width: "89%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Conexões Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-purple-200">
                  <Wifi className="w-5 h-5" />
                  <span>WebSocket</span>
                </div>
                <span className="font-semibold text-white">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-purple-200">
                  <Database className="w-5 h-5" />
                  <span>Banco de Dados</span>
                </div>
                <span className="font-semibold text-white">23</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-purple-200">
                  <Server className="w-5 h-5" />
                  <span>API Requests</span>
                </div>
                <span className="font-semibold text-white">856/min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}