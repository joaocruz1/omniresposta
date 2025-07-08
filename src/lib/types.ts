import type { Document, Conversation, AIFlow, SystemMetric, SystemAlert, SystemSetting } from "@prisma/client"

export type { Document, Conversation, AIFlow, SystemMetric, SystemAlert, SystemSetting }

export interface DashboardStats {
  totalConversations: number
  resolutionRate: number
  averageTime: string
  satisfaction: number
  conversationsToday: number
  activeFlows: number
  totalDocuments: number
  vectorsGenerated: number
}

export interface AnalyticsData {
  conversationsData: Conversation[]
  channelData: Array<{
    canal: string
    conversas: number
    crescimento: number
  }>
  topQuestions: Array<{
    question: string
    count: number
    category: string
  }>
  recentInteractions: Array<{
    id: string
    user: string
    query: string
    status: string
    time: string
  }>
}

export interface SystemStatus {
  service: string
  status: "Online" | "Degradado" | "Offline"
  uptime: string
  response: string
  lastCheck: string
}

export interface SystemStatusResponse {
  services: SystemStatus[]
  systemStats: {
    totalServices: number
    onlineServices: number
    degradedServices: number
    offlineServices: number
    averageResponseTime: number
    overallUptime: number
  }
  recentMetrics: SystemMetric[]
  lastUpdated: string
}

export interface RealTimeMetrics {
  cpu: number
  memory: number
  network: number
  storage: number
}

export interface MonitoringHookReturn {
  systemStatus: SystemStatusResponse | null
  alerts: SystemAlert[] | null
  realTimeMetrics: RealTimeMetrics
  loading: boolean
  error: string | null
  actions: {
    refetchStatus: () => Promise<void>
    refetchAlerts: () => Promise<void>
    createAlert: (type: string, message: string) => Promise<boolean>
    dismissAlert: (alertId: string) => Promise<boolean>
    recordMetric: (metricName: string, metricValue: number, metricUnit?: string) => Promise<boolean>
  }
}
