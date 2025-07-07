"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, MessageSquare, Clock, CheckCircle } from "lucide-react"
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

export function DashboardOverview() {
  const todayData = [
    { hour: "00", conversas: 12, resolvidas: 11 },
    { hour: "02", conversas: 8, resolvidas: 7 },
    { hour: "04", conversas: 5, resolvidas: 5 },
    { hour: "06", conversas: 15, resolvidas: 14 },
    { hour: "08", conversas: 45, resolvidas: 42 },
    { hour: "10", conversas: 78, resolvidas: 74 },
    { hour: "12", conversas: 95, resolvidas: 89 },
    { hour: "14", conversas: 87, resolvidas: 82 },
    { hour: "16", conversas: 92, resolvidas: 88 },
    { hour: "18", conversas: 65, resolvidas: 61 },
    { hour: "20", conversas: 43, resolvidas: 40 },
    { hour: "22", conversas: 28, resolvidas: 26 },
  ]

  const channelData = [
    { canal: "WhatsApp", conversas: 1247 },
    { canal: "Website", conversas: 856 },
    { canal: "Telegram", conversas: 432 },
    { canal: "Email", conversas: 234 },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversas Hoje</p>
                <p className="text-3xl font-bold text-[#662d91]">573</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+12%</span>
                </div>
              </div>
              <MessageSquare className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Resolução</p>
                <p className="text-3xl font-bold text-[#662d91]">94.2%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+2.1%</span>
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
                <p className="text-3xl font-bold text-[#662d91]">1.2min</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">-15%</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Online</p>
                <p className="text-3xl font-bold text-[#662d91]">1,456</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+8%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversas por Hora */}
        <Card>
          <CardHeader>
            <CardTitle>Conversas por Hora (Hoje)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={todayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
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
                    name="Total"
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
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Conversas por Canal */}
        <Card>
          <CardHeader>
            <CardTitle>Conversas por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="canal" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversas" fill="#662d91" name="Conversas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
