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
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "Degradado":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "Offline":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-800"
      case "Degradado":
        return "bg-yellow-100 text-yellow-800"
      case "Offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Activity className="w-5 h-5 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monitoramento do Sistema</h2>
          <p className="text-gray-600">Status em tempo real dos serviços OmniResposta</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status Geral</p>
                <p className="text-2xl font-bold text-green-600">Operacional</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-[#662d91]">99.8%</p>
              </div>
              <Activity className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resp. Média</p>
                <p className="text-2xl font-bold text-[#662d91]">76ms</p>
              </div>
              <Server className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alertas Ativos</p>
                <p className="text-2xl font-bold text-yellow-600">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance em Tempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#662d91" strokeWidth={2} name="CPU (%)" />
                <Line type="monotone" dataKey="memoria" stroke="#10b981" strokeWidth={2} name="Memória (%)" />
                <Line type="monotone" dataKey="rede" stroke="#f59e0b" strokeWidth={2} name="Rede (MB/s)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time */}
        <Card>
          <CardHeader>
            <CardTitle>Tempo de Resposta por Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tempo" fill="#662d91" name="Tempo (ms)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Uptime Semanal */}
        <Card>
          <CardHeader>
            <CardTitle>Uptime Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis domain={[99, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uptime"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Uptime (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status dos Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(service.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{service.service}</h4>
                    <p className="text-sm text-gray-500">Uptime: {service.uptime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{service.response}</p>
                    <p className="text-xs text-gray-500">Tempo de resposta</p>
                  </div>
                  <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-4 p-4 border rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Uso de Recursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>CPU</span>
                  <span>67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#662d91] h-2 rounded-full" style={{ width: "67%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Memória</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#662d91] h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Armazenamento</span>
                  <span>89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conexões Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-[#662d91]" />
                  <span>WebSocket</span>
                </div>
                <span className="font-bold">1,247</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#662d91]" />
                  <span>Banco de Dados</span>
                </div>
                <span className="font-bold">23</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-[#662d91]" />
                  <span>API Requests</span>
                </div>
                <span className="font-bold">856/min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
